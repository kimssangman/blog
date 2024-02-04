// lib/db/user/user.model.ts
import mongoose, { Schema } from "mongoose";

export const ReviewSchema = new Schema(
    {
        region: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        },
        rating: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        images: {
            type: Array,
            required: false,
        },
        comment: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
