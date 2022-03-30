import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const landmarkApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const landmarks = await db.landmarkStore.getAllLandmarks();
        return landmarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const landmark = await db.landmarkStore.getLandmarkById(request.params.id);
        if (!landmark) {
          return Boom.notFound("No landmark with this id");
        }
        return landmark;
      } catch (err) {
        return Boom.serverUnavailable("No landmark with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const landmark = await db.landmarkStore.addLandmark(request.params.id, request.payload);
        if (landmark) {
          return h.response(landmark).code(201);
        }
        return Boom.badImplementation("error creating landmark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.landmarkStore.deleteAllLandmarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const landmark = await db.landmarkStore.getLandmarkById(request.params.id);
        if (!landmark) {
          return Boom.notFound("No landmark with this id");
        }
        await db.landmarkStore.deleteLandmark(landmark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Landmark with this id");
      }
    },
  },
};
