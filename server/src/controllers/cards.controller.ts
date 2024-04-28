import { Request, Response } from "express";

import { Card } from "../models/cards.model";
import { handleAsync, sendResponse } from "../utils";

export const createCard = handleAsync(async (req: Request, res: Response) => {
  const newCard = await Card.create({ ...req.body, userId: req.user._id });
  return sendResponse(res, 201, "Card is created successfully", newCard);
});

export const getAllCards = handleAsync(async (req: Request, res: Response) => {
  const cards = await Card.find({ userId: req.user._id });
  return sendResponse(res, 200, "All cards are retrieved", cards);
});

export const deleteCard = handleAsync(async (req: Request, res: Response) => {
  const deletedCard = await Card.findOneAndDelete({
    userId: req.user._id,
    _id: req.params.id,
  });
  if (!deletedCard) {
    return sendResponse(res, 404, "No Card found with this ID");
  }
  return sendResponse(res, 204, "Deleted successfully");
});

export const getCard = handleAsync(async (req: Request, res: Response) => {
  const card = await Card.findOne({ userId: req.user._id, _id: req.params.id });
  if (!card) {
    return sendResponse(res, 404, "No Card found with this ID");
  }
  return sendResponse(res, 200, "Card is retrieved successfully", card);
});

export const updateCard = handleAsync(async (req: Request, res: Response) => {
  const updatedCard = await Card.findOneAndUpdate(
    { userId: req.user._id, _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updatedCard) {
    return sendResponse(res, 404, "No Card found with this ID");
  }
  return sendResponse(res, 200, "Card is updated successfully", updatedCard);
});
