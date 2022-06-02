import { db } from "../models/db.js";
import { PlacemarkSpec, PublicPlacemarkSpec } from "../models/joi-schemas.js";
import { publicPlacemarkController } from "./public-placemark-controller.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      // const placemarks = await db.placemarkStore.getAllPlacemarks();
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        placemarks: placemarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacemark = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.placemarkStore.addPlacemark(newPlacemark);
      return h.redirect("/dashboard");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.placemarkStore.deletePlacemarkById(placemark._id);
      return h.redirect("/dashboard");
    },
  },

  // addPublicPlacemark: {
  //   validate: {
  //     payload: PublicPlacemarkSpec,
  //     options: { abortEarly: false },
  //     failAction: function (request, h, error) {
  //       return h.view("dashboard-view", { title: "Add PublicPlacemark error", errors: error.details }).takeover().code(400);
  //     },
  //   },
  //   handler: async function (request, h) {
  //     const loggedInUser = request.auth.credentials;
  //     const newPublicPlacemark = {
  //       userid: loggedInUser._id,
  //       name: request.payload.name,
  //     };
  //     await db.publicPlacemarkStore.addPublicPlacemark(newPublicPlacemark);
  //     return h.redirect("/dashboard");
  //   },
  // },

};
