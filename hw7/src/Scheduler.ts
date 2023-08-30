import { PriorityQueue, PriorityQueueI } from "./PriorityQueue";

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<void>;
}

export class Scheduler implements SchedulerI {
  private taskQueue: PriorityQueue<() => Promise<any>> = new PriorityQueue<() => Promise<any>>();

  postTask(task: () => Promise<any>, priority: number): void {
    this.taskQueue.enqueue(task, priority);
  }

  async run(): Promise<void> {
    while (this.taskQueue.size() > 0) {
      const task = this.taskQueue.dequeue();
      if (task) await task();
    }
  }
}
