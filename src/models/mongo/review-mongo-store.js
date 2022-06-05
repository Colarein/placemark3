import { Review } from "./review.js";

export const reviewMongoStore = {
    async getAllReviews() {
        const reviews = await Review.find().lean();
        return reviews;
    },

    async addReview(publicPlacemarkId, review) {
        review.publicplacemarkid = publicPlacemarkId;
        const newReview = new Review(review);
        const reviewObj = await newReview.save();
        return this.getReviewById(reviewObj._id);
    },

    async getReviewsByPublicPlacemarkId(id) {
        const reviews = await Review.find({ publicplacemarkid: id }).lean();
        return reviews;
    },

    async getReviewById(id) {
        if (id) {
            const review = await Review.findOne({ _id: id }).lean();
            return review;
        }
        return null;
    },

    async deleteReview(id) {
        try {
            await Review.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllReviews() {
        await Review.deleteMany({});
    },

    async updateReview(review, updatedReview) {
        review.title = updatedReview.title;
        review.description = updatedReview.description;
        review.rating = updatedReview.rating;
        review.user = updatedReview.user;
        await review.save();
    },
};