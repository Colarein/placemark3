import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, LandmarkSpec, LandmarkSpecPlus, LandmarkArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const landmarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const landmarks = await db.landmarkStore.getAllLandmarks();
        return landmarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: LandmarkArraySpec, failAction: validationError },
    description: "Get all landmarkApi",
    notes: "Returns all landmarkApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const landmark = await db.landmarkStore.getLandmarkById(request.params.id);
        if (!landmark) {
          return Boom.notFound("No landmark with this id");
        }
        return landmark;
      } catch (err) {
        return Boom.serverUnavailable("No track with this id");
      }
    },
    tags: ["api"],
    description: "Find a Landmark",
    notes: "Returns a landmark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: LandmarkSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Create a landmark",
    notes: "Returns the newly created track",
    validate: { payload: LandmarkSpec },
    response: { schema: LandmarkSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.landmarkStore.deleteAllLandmarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all landmarkApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const landmark = await db.landmarkStore.getLandmarkById(request.params.id);
        if (!landmark) {
          return Boom.notFound("No Landmark with this id");
        }
        await db.landmarkStore.deleteLandmark(landmark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Landmark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a landmark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
