import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPublicPlacemarks, testReviews, corkPlacemark, dublinPlacemark, ucc, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => {
    let dublinPlacemarkList = null;

    setup(async () => {
        db.init("mongo");
        await db.publicPlacemarkStore.deleteAllPublicPlacemarks();
        await db.reviewStore.deleteAllReviews();
        dublinPlacemarkList = await db.publicPlacemarkStore.addPublicPlacemark(dublinPlacemark);
        for (let i = 0; i < testReviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testReviews[i] = await db.reviewStore.addReview(dublinPlacemarkList._id, testReviews[i]);
        }
    });

    test("create single review", async () => {
        const corkPlacemarkList = await db.publicPlacemarkStore.addPublicPlacemark(corkPlacemark);
        const review = await db.reviewStore.addReview(corkPlacemarkList._id, ucc);
        assert.isNotNull(review._id);
        assertSubset(ucc, review);
    });

    test("get multiple reviews", async () => {
        const reviews = await db.reviewStore.getReviewsByPublicPlacemarkId(dublinPlacemarkList._id);
        assert.equal(testReviews.length, testReviews.length);
    });

    test("delete all reviews", async () => {
        const reviews = await db.reviewStore.getAllReviews();
        assert.equal(testReviews.length, reviews.length);
        await db.reviewStore.deleteAllReviews();
        const newReviews = await db.reviewStore.getAllReviews();
        assert.equal(0, newReviews.length);
    });

    test("get a review - success", async () => {
        const corkPlacemarkList = await db.publicPlacemarkStore.addPublicPlacemark(corkPlacemark);
        const review = await db.reviewStore.addReview(corkPlacemarkList._id, ucc);
        const newReview = await db.reviewStore.getReviewById(review._id);
        assertSubset(ucc, newReview);
    });

    test("delete One Review - success", async () => {
        await db.reviewStore.deleteReview(testReviews[0]._id);
        const reviews = await db.reviewStore.getAllReviews();
        assert.equal(reviews.length, testPublicPlacemarks.length - 1);
        const deletedReview = await db.reviewStore.getReviewById(testReviews[0]._id);
        assert.isNull(deletedReview);
    });

    test("get a review - bad params", async () => {
        assert.isNull(await db.reviewStore.getReviewById(""));
        assert.isNull(await db.reviewStore.getReviewById());
    });

    test("delete one review - fail", async () => {
        await db.reviewStore.deleteReview("bad-id");
        const reviews = await db.reviewStore.getAllReviews();
        assert.equal(reviews.length, testPublicPlacemarks.length);
    });
});
