// lib/db/user/user.model.ts
import mongoose, { Schema } from "mongoose";

export const VocaSchema = new Schema(
    {
        word: {
            type: String,
            required: false,
        },
        meaning: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Voca = mongoose.models.Voca || mongoose.model("Voca", VocaSchema);

export default Voca;
