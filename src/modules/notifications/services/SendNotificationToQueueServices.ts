import { inject, injectable } from "tsyringe";
import IQueueProvider from "@shared/container/providers/QueueProvier/models/IQueueProvider";

@injectable()
class SendNotificationToQueueServices {
  constructor(
    @inject("QueueProvider")
    private queueProvider: IQueueProvider
  ) {}

  public execute(): void {
    this.queueProvider.sendMessage();
  }
}

export default SendNotificationToQueueServices;
