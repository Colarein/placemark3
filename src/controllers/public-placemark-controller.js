import {db} from "../models/db.js";
import {ReviewSpec, PublicPlacemarkSpec} from "../models/joi-schemas.js";

export const publicPlacemarkController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            // const publicPlacemark = await db.placemarkStore.getUserPublicPlacemarks(loggedInUser._id);
            const publicPlacemark = await db.publicPlacemarkStore.getAllPublicPlacemarks();
            const viewData = {
                title: "Public Placemark Dashboard",
                user: loggedInUser,
                publicPlacemark: publicPlacemark,
            };
            return h.view("public-placemark-view", viewData);
        },
    },

    addPublicPlacemark: {
        validate: {
            payload: PublicPlacemarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("public-placemark-view", { title: "Add PublicPlacemark error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newPublicPlacemark = {
                userid: loggedInUser._id,
                name: request.payload.name,
            };
            await db.publicPlacemarkStore.addPublicPlacemark(newPublicPlacemark);
            return h.redirect("/public");
        },
    },

    deletePublicPlacemark: {
        handler: async function (request, h) {
            const publicPlacemark = await db.publicPlacemarkStore.getPublicPlacemarkById(request.params.id);
            await db.publicPlacemarkStore.deletePublicPlacemarkById(publicPlacemark._id);
            return h.redirect("/public");
        },
    },

    showReviews: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const users = await db.userStore.getAllUsers();
            const publicPlacemark = await db.publicPlacemarkStore.getPublicPlacemarkById(request.params.id);
            const review = await db.reviewStore.getAllReviews();
            const viewData = {
                title: "Review Dashboard",
                user: loggedInUser,
                users: users,
                review: review,
                publicPlacemark: publicPlacemark,
            };
            return h.view("review-view", viewData);
        },
    },

    addReview: {
        validate: {
            payload: ReviewSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("review-view", { name: "Add review error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const publicPlacemark = await db.publicPlacemarkStore.getPublicPlacemarkById(request.params.id);
            const newReview = {
                name: request.payload.name,
                description: request.payload.description,
                rating: request.payload.rating,
                user: request.payload.user,
            };
            await db.reviewStore.addReview(publicPlacemark._id, newReview);
            return h.redirect(`/review/${publicPlacemark._id}`);
        },
    },

    deleteReview: {
        handler: async function (request, h) {
            const publicPlacemark = await db.publicPlacemarkStore.getPublicPlacemarkById(request.params.id);
            await db.reviewStore.deleteReview(request.params.reviewid);
            return h.redirect(`/review/${publicPlacemark._id}`);
        },
    },

    averageReviewRating: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const users = await db.userStore.getAllUsers();
            const publicPlacemark = await db.publicPlacemarkStore.getPublicPlacemarkById(request.params.id);
            const review = await db.reviewStore.getAllReviews();
            const viewData = {
                title: "Review Dashboard",
                user: loggedInUser,
                users: users,
                review: review,
                publicPlacemark: publicPlacemark,
            };
            return h.view("review-view", viewData);
        },
    },
};
