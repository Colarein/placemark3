import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { landmarkMemStore } from "./mem/landmark-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { landmarkJsonStore } from "./json/landmark-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { landmarkMongoStore } from "./mongo/landmark-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import {reviewMongoStore} from "./mongo/review-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  landmarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkJsonStore;
        this.landmarkStore = landmarkJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.landmarkStore = landmarkMongoStore;
        this.reviewStore = reviewMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.placemarkStore = placemarkMemStore;
        this.landmarkStore = landmarkMemStore;
    }
  },
};
