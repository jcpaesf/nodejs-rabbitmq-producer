import { Request, Response } from "express";
import { container } from "tsyringe";
import SendNotificationToQueueServices from "@modules/notifications/services/SendNotificationToQueueServices";

export default class NotificationsController {
  public create(request: Request, response: Response): Response {
    const sendNotificationToQueueServices = container.resolve(
      SendNotificationToQueueServices
    );

    sendNotificationToQueueServices.execute();

    return response.status(202).json();
  }
}
