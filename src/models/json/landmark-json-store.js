import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/landmarks.json"));
db.data = { landmarks: [] };

export const landmarkJsonStore = {
  async getAllLandmark() {
    await db.read();
    return db.data.landmarks;
  },

  async addLandmark(placemarkId, landmark) {
    await db.read();
    landmark._id = v4();
    landmark.placemarkid = placemarkId;
    db.data.landmarks.push(landmark);
    await db.write();
    return landmark;
  },

  async getLandmarkByPlacemarkId(id) {
    await db.read();
    return db.data.landmarks.filter((landmark) => landmark.placemarkid === id);
  },

  async getLandmarkById(id) {
    await db.read();
    return db.data.landmark.find((landmark) => landmark._id === id);
  },

  async deleteLandmark(id) {
    await db.read();
    const index = db.data.landmarks.findIndex((landmark) => landmark._id === id);
    db.data.landmarks.splice(index, 1);
    await db.write();
  },

  async deleteAllLandmarks() {
    db.data.landmarks = [];
    await db.write();
  },

  async updateLandmark(landmark, updatedLandmark) {
    landmark.name = updatedLandmark.name;
    landmark.category = updatedLandmark.category;
    landmark.description = updatedLandmark.description;
    await db.write();
  },
};
