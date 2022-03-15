import { v4 } from "uuid";

let landmarks = [];

export const landmarkMemStore = {
  async getAllLandmarks() {
    return landmarks;
  },

  async addLandmark(placemarkId, landmark) {
    landmark._id = v4();
    landmark.placemarkid = placemarkId;
    landmarks.push(landmark);
    return landmark;
  },

  async getLandmarksByPlacemarkId(id) {
    return landmarks.filter((landmark) => landmark.placemarkid === id);
  },

  async getLandmarkById(id) {
    return landmarks.find((landmark) => landmark._id === id);
  },

  async getPlacemarkLandmarks(placemarkId) {
    return landmarks.filter((landmark) => landmark.placemarkid === placemarkId);
  },

  async deleteLandmark(id) {
    const index = landmarks.findIndex((landmark) => landmark._id === id);
    landmarks.splice(index, 1);
  },

  async deleteAllLandmarks() {
    landmarks = [];
  },

  async updateLandmark(landmark, updatedLandmark) {
    landmark.name = updatedLandmark.name;
    landmark.category = updatedLandmark.category;
    landmark.description = updatedLandmark.description;
  },
};
