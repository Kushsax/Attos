import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'nextjs-app',
    brokers: ['localhost:9092']
})

export const producer = kafka.producer();