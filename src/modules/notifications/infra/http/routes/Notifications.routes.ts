import { Router } from "express";
import NotificationsController from "../controllers/NotificationsController";

const notificationsRouter = Router();
const notificationsController = new NotificationsController();

notificationsRouter.post("/", notificationsController.create);

export default notificationsRouter;
