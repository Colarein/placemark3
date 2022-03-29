import Mongoose from "mongoose";

const { Schema } = Mongoose;

const landmarkSchema = new Schema({
  name: String,
  description: String,
  latitude: String,
  longitude: String,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Landmark = Mongoose.model("Landmark", landmarkSchema);
