import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, ucc, testPlacemarks, testLandmarks, dublinPlacemark } from "../fixtures.js";

suite("Landmark API tests", () => {
  let user = null;
  let waterford = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllLandmarks();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    ucc.userid = user._id;
    waterford = await placemarkService.createPlacemark(ucc);
  });

  teardown(async () => {});

  test("create landmark", async () => {
    const returnedLandmark = await placemarkService.createLandmark(waterford._id, ucc);
    assertSubset(ucc, returnedLandmark);
  });

  test("create Multiple landmarks", async () => {
    for (let i = 0; i < testLandmarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createLandmark(waterford._id, testLandmarks[i]);
    }
    const returnedLandmarks = await placemarkService.getAllLandmarks();
    assert.equal(returnedLandmarks.length, testLandmarks.length);
    for (let i = 0; i < returnedLandmarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const landmark = await placemarkService.getLandmark(returnedLandmarks[i]._id);
      assertSubset(landmark, returnedLandmarks[i]);
    }
  });

  test("Delete LandmarkApi", async () => {
    for (let i = 0; i < testLandmarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createLandmark(waterford._id, testLandmarks[i]);
    }
    let returnedLandmarks = await placemarkService.getAllLandmarks();
    assert.equal(returnedLandmarks.length, testLandmarks.length);
    for (let i = 0; i < returnedLandmarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const landmark = await placemarkService.deleteLandmark(returnedLandmarks[i]._id);
    }
    returnedLandmarks = await placemarkService.getAllLandmarks();
    assert.equal(returnedLandmarks.length, 0);
  });

  test("denormalised placemark", async () => {
    for (let i = 0; i < testLandmarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createLandmark(waterford._id, testLandmarks[i]);
    }
    const returnedPlacemark = await placemarkService.getPlacemark(waterford._id);
    assert.equal(returnedPlacemark.landmarks.length, testLandmarks.length);
    for (let i = 0; i < testLandmarks.length; i += 1) {
      assertSubset(testLandmarks[i], returnedPlacemark.landmarks[i]);
    }
  });
});
