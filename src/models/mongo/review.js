import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    name: String,
    description: String,
    rating: Number,
    user: String,

    publicplacemarkid: {
        type: Schema.Types.ObjectId,
        ref: "PublicPlacemark",
    },
});

export const Review = Mongoose.model("Review", reviewSchema);
