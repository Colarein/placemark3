import {db} from "../models/db.js";
import {PublicPlacemarkSpec} from "../models/joi-schemas.js";

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
};
