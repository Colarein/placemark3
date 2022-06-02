import { PublicPlacemark } from "./public-placemark.js";
import { reviewMongoStore } from "./review-mongo-store.js";

export const publicPlacemarkMongoStore = {
    async getAllPublicPlacemarks() {
        const publicPlacemarks = await PublicPlacemark.find().lean();
        return publicPlacemarks;
    },

    async getPublicPlacemarkById(id) {
        if (id) {
            const publicPlacemark = await PublicPlacemark.findOne({ _id: id }).lean();
            if (publicPlacemark) {
                publicPlacemark.reviews = await reviewMongoStore.getReviewsByPublicPlacemarkId(publicPlacemark._id);
            }
            return publicPlacemark;
        }
        return null;
    },

    async addPublicPlacemark(publicPlacemark) {
        const newPublicPlacemark = new PublicPlacemark(publicPlacemark);
        const publicPlacemarkObj = await newPublicPlacemark.save();
        return this.getPublicPlacemarkById(publicPlacemarkObj._id);
    },

    async getUserPublicPlacemarks(id) {
        const publicPlacemark = await PublicPlacemark.find({ userid: id }).lean();
        return publicPlacemark;
    },

    async deletePublicPlacemarkById(id) {
        try {
            await PublicPlacemark.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllPublicPlacemarks() {
        await PublicPlacemark.deleteMany({});
    },
 };
