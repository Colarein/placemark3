import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarks, testLandmarks, corkPlacemark, dublinPlacemark, ucc, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Landmark Model tests", () => {
  let dublinPlacemarkList = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.landmarkStore.deleteAllLandmarks();
    dublinPlacemarkList = await db.placemarkStore.addPlacemark(dublinPlacemark);
    for (let i = 0; i < testLandmarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLandmarks[i] = await db.landmarkStore.addLandmark(dublinPlacemarkList._id, testLandmarks[i]);
    }
  });

  test("create single track", async () => {
    const corkPlacemarkList = await db.placemarkStore.addPlacemark(corkPlacemark);
    const landmark = await db.landmarkStore.addLandmark(corkPlacemarkList._id, ucc);
    assert.isNotNull(landmark._id);
    assertSubset(ucc, landmark);
  });

  test("get multiple landmarks", async () => {
    const landmarks = await db.landmarkStore.getLandmarksByPlacemarkId(dublinPlacemarkList._id);
    assert.equal(testLandmarks.length, testLandmarks.length);
  });

  test("delete all landmarks", async () => {
    const landmarks = await db.landmarkStore.getAllLandmarks();
    assert.equal(testLandmarks.length, landmarks.length);
    await db.landmarkStore.deleteAllLandmarks();
    const newLandmarks = await db.landmarkStore.getAllLandmarks();
    assert.equal(0, newLandmarks.length);
  });

  test("get a landmark - success", async () => {
    const corkPlacemarkList = await db.placemarkStore.addPlacemark(corkPlacemark);
    const landmark = await db.landmarkStore.addLandmark(corkPlacemarkList._id, ucc);
    const newLandmark = await db.landmarkStore.getLandmarkById(landmark._id);
    assertSubset(ucc, newLandmark);
  });

  test("delete One Landmark - success", async () => {
    await db.landmarkStore.deleteLandmark(testLandmarks[0]._id);
    const landmarks = await db.landmarkStore.getAllLandmarks();
    assert.equal(landmarks.length, testPlacemarks.length - 1);
    const deletedLandmark = await db.landmarkStore.getLandmarkById(testLandmarks[0]._id);
    assert.isNull(deletedLandmark);
  });

  test("get a landmark - bad params", async () => {
    assert.isNull(await db.landmarkStore.getLandmarkById(""));
    assert.isNull(await db.landmarkStore.getLandmarkById());
  });

  test("delete one landmark - fail", async () => {
    await db.landmarkStore.deleteLandmark("bad-id");
    const landmarks = await db.landmarkStore.getAllLandmarks();
    assert.equal(landmarks.length, testPlacemarks.length);
  });
});
