import rabbitMq, { Channel } from "amqplib";
import IQueueProvider from "../models/IQueueProvider";
import queueConnection from "@config/queueConnection";
import * as Sentry from "@sentry/node";

export default class RabbitMqProvider implements IQueueProvider {
  private channel: Channel;
  private queue: string;
  private connectionOk: boolean;

  constructor() {
    const me = this;

    function connectRabbitMq() {
      rabbitMq
        .connect({
          protocol: queueConnection.protocol,
          hostname: queueConnection.hostname,
          port: queueConnection.port,
          username: queueConnection.username,
          password: queueConnection.password,
        })
        .then((connection) => {
          connection.createChannel().then((channel) => {
            const queue = queueConnection.queueNotifications;

            channel.assertQueue(queue, {
              durable: false,
            });

            me.channel = channel;
            me.queue = queue;
            me.connectionOk = true;
          });
        })
        .catch((e) => {
          Sentry.captureException(`RabbitMq connection error: ${e.message}`);

          setTimeout(() => {
            connectRabbitMq();
          }, 10000);
        });
    }

    connectRabbitMq();
  }

  public sendMessage(): boolean {
    if (!this.connectionOk) {
      Sentry.captureException("RabbitMq connection is offline");

      throw new Error("RabbitMq connection is offline");
    }

    const sendToQueue = this.channel.sendToQueue(
      this.queue,
      Buffer.from(JSON.stringify({ message: "Your JSON here!" }))
    );

    return sendToQueue;
  }
}
