import { Landmark } from "./landmark.js";

export const landmarkMongoStore = {
  async getAllLandmarks() {
    const landmarks = await Landmark.find().lean();
    return landmarks;
  },

  async addLandmark(placemarkId, landmark) {
    landmark.placemarkid = placemarkId;
    const newLandmark = new Landmark(landmark);
    const landmarkObj = await newLandmark.save();
    return this.getLandmarkById(landmarkObj._id);
  },

  async getLandmarksByPlacemarkId(id) {
    const landmarks = await Landmark.find({ placemarkid: id }).lean();
    return landmarks;
  },

  async getLandmarkById(id) {
    if (id) {
      const landmark = await Landmark.findOne({ _id: id }).lean();
      return landmark;
    }
    return null;
  },

  async deleteLandmark(id) {
    try {
      await Landmark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLandmarks() {
    await Landmark.deleteMany({});
  },

  async updateLandmark(landmark, updatedLandmark) {
    landmark.name = updatedLandmark.name;
    landmark.category = updatedLandmark.category;
    landmark.description = updatedLandmark.description;
    await landmark.save();
  },
};
