import { Worker, Processor } from 'bullmq';
import IORedis from 'ioredis';

export function createWorker(queueName: string, processor: Processor, connection: IORedis) {
  const worker = new Worker(queueName, processor, {
    connection,
  });

  return worker;
}
