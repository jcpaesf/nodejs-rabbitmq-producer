import { container } from "tsyringe";

import IQueueProvider from "./QueueProvier/models/IQueueProvider";
import RabbitMqProvider from "./QueueProvier/implementations/RabbitMqProvider";

container.registerInstance<IQueueProvider>(
  "QueueProvider",
  container.resolve(RabbitMqProvider)
);
