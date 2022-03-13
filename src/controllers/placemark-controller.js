import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  addLandmark: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newLandmark = {
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
      };
      await db.landmarkStore.addLandmark(placemark._id, newLandmark);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
  deleteLandmark: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.landmarkStore.deleteLandmark(request.params.landmarkid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
