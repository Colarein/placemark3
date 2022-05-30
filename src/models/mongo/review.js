import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    title: String,
    description: String,
    placemarkid: {
        type: Schema.Types.ObjectId,
        ref: "Placemark",
    },
});

export const Review = Mongoose.model("Review", reviewSchema);
