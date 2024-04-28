import mongoose, { Schema, model } from "mongoose";

const cardSchema = new Schema({
  cardName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cvv: { type: String, required: true },
  expiryDate: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

export const Card = model("Card", cardSchema);
