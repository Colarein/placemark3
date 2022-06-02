import Mongoose from "mongoose";

const { Schema } = Mongoose;

const publicPlacemarkSchema = new Schema({
    name: String,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const PublicPlacemark = Mongoose.model("PublicPlacemark", publicPlacemarkSchema);
