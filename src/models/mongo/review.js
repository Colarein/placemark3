import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    name: String,
    description: String,
    // date etc
    publicplacemarkid: {
        type: Schema.Types.ObjectId,
        ref: "PublicPlacemark",
    },
});

export const Review = Mongoose.model("Review", reviewSchema);
