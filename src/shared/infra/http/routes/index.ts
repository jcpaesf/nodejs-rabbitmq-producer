import { Router } from "express";
import NotificationsRouter from "@modules/notifications/infra/http/routes/Notifications.routes";

const routes = Router();

routes.use("/notifications", NotificationsRouter);

export default routes;
