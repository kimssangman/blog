// lib/db/user/user.model.ts
import mongoose, { Schema } from "mongoose";

export const BoardSchema = new Schema(
    {
        index: {
            type: Number,
        },
        title: {
            type: String,
            required: true,
        },
        idea: {
            type: String,
            required: false,
        },
        input: {
            type: String,
            required: false,
        },
        output: {
            type: String,
            required: false,
        },
        contents: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);

export default Board;
