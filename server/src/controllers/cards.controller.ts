import { Request, Response } from "express";

import { Card } from "../models/cards.model";

export const createCard = async (req: Request, res: Response) => {
  const newCard = await Card.create({ ...req.body, userId: req.user._id });
  return res.json({
    status: 201,
    data: newCard,
  });
};

export const getAllCards = async (req: Request, res: Response) => {
  const cards = await Card.find({ userId: req.user._id });
  return res.json({
    status: 200,
    data: cards,
  });
};

export const deleteCard = async (req: Request, res: Response) => {
  const deletedCard = await Card.findOneAndDelete({
    userId: req.user._id,
    _id: req.params.id,
  });
  if (!deletedCard) {
    return res.json({
      status: 404,
      message: "No Card found with this ID",
    });
  }
  return res.json({
    status: 204,
    message: "Deleted successfully",
  });
};

export const getCard = async (req: Request, res: Response) => {
  const card = await Card.findOne({ userId: req.user._id, _id: req.params.id });
  if (!card) {
    return res.json({
      status: 404,
      message: "No Card found with this ID",
    });
  }
  return res.json({
    status: 200,
    data: card,
  });
};

export const updateCard = async (req: Request, res: Response) => {
  const updatedCard = await Card.findOneAndUpdate(
    { userId: req.user._id, _id: req.params.id },
    req.body
  );
  if (!updatedCard) {
    return res.json({
      status: 404,
      message: "No Card found with this ID",
    });
  }
  return res.json({
    status: 200,
    data: updatedCard,
  });
};
