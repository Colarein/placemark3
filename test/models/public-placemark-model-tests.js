import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPublicPlacemarks, euPlacemark } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Public Placemark Model tests", () => {
    setup(async () => {
        db.init("mongo");
        await db.publicPlacemarkStore.deleteAllPublicPlacemarks();
        for (let i = 0; i < testPublicPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPublicPlacemarks[i] = await db.publicPlacemarkStore.addPublicPlacemark(testPublicPlacemarks[i]);
        }
    });

    test("create a public placemark", async () => {
        const publicPlacemark = await db.publicPlacemarkStore.addPublicPlacemark(euPlacemark);
        assertSubset(euPlacemark, publicPlacemark);
        assert.isDefined(publicPlacemark._id);
    });

    test("delete all public placemarks", async () => {
        let returnedPublicPlacemarks = await db.publicPlacemarkStore.getAllPublicPlacemarks();
        assert.equal(returnedPublicPlacemarks.length, 3);
        await db.publicPlacemarkStore.deleteAllPublicPlacemarks();
        returnedPublicPlacemarks = await db.publicPlacemarkStore.getAllPublicPlacemarks();
        assert.equal(returnedPublicPlacemarks.length, 0);
    });

    test("get a public placemark - success", async () => {
        const publicPlacemark = await db.publicPlacemarkStore.addPublicPlacemark(euPlacemark);
        const returnedPublicPlacemark = await db.publicPlacemarkStore.getPublicPlacemarkById(publicPlacemark._id);
        assertSubset(euPlacemark, publicPlacemark);
    });

    test("delete One Public Placemark - success", async () => {
        const id = testPublicPlacemarks[0]._id;
        await db.publicPlacemarkStore.deletePublicPlacemarkById(id);
        const returnedPublicPlacemarks = await db.publicPlacemarkStore.getAllPublicPlacemarks();
        assert.equal(returnedPublicPlacemarks.length, testPublicPlacemarks.length - 1);
        const deletedPublicPlacemark = await db.publicPlacemarkStore.getPublicPlacemarkById(id);
        assert.isNull(deletedPublicPlacemark);
    });

    test("get a public placemark - bad params", async () => {
        assert.isNull(await db.publicPlacemarkStore.getPublicPlacemarkById(""));
        assert.isNull(await db.publicPlacemarkStore.getPublicPlacemarkById());
    });

    test("delete One Public Placemark - fail", async () => {
        await db.publicPlacemarkStore.deletePublicPlacemarkById("bad-id");
        const allPublicPlacemarks = await db.publicPlacemarkStore.getAllPublicPlacemarks();
        assert.equal(testPublicPlacemarks.length, allPublicPlacemarks.length);
    });
});