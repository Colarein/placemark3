import Mongoose from "mongoose";

const { Schema } = Mongoose;

const landmarkSchema = new Schema({
  name: String,
  category: String,
  description: String,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Landmark = Mongoose.model("Landmark", landmarkSchema);
