// import { userMemStore } from "./mem/user-mem-store.js";
// import { placemarkMemStore } from "./mem/placemark-mem-store.js";
// import { landmarkMemStore } from "./mem/landmark-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { landmarkJsonStore } from "./json/landmark-json-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  landmarkStore: null,

  init() {
    this.userStore = userJsonStore;
    this.placemarkStore = placemarkJsonStore;
    this.landmarkStore = landmarkJsonStore;
  },
};
