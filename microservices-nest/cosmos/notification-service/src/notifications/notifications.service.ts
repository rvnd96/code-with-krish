import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService implements OnModuleInit {
  //   localhost not working
  private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly consumer = this.kafka.consumer({
    groupId: 'rmadushan-notification-service',
  });
  private readonly producer = this.kafka.producer();

  async onModuleInit() {
    await this.consumer.connect();
    await this.producer.connect();
    await this.consumeOrderNotifications();
  }

  async consumeOrderNotifications() {
    await this.consumer.subscribe({
      topic: `rmadushan.order.created.notification`,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) {
          throw new BadRequestException('Message value is null');
        }
        const notification = JSON.parse(message.value.toString());
        console.log(notification.message);
      },
    });
  }
}
