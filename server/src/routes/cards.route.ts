import route, { Router } from "express";

import * as cardController from "../controllers/cards.controller";

export const cardsRouter: Router = route.Router();

cardsRouter.get("/", cardController.getAllCards);
cardsRouter.get("/:id", cardController.getCard);
cardsRouter.post("/", cardController.createCard);
cardsRouter.patch("/:id", cardController.updateCard);
cardsRouter.delete("/:id", cardController.deleteCard);
