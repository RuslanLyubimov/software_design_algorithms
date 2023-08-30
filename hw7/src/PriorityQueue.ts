interface PriorityQueueNode<T> {
  value: T;
  priority: number;
}

export interface PriorityQueueI<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): T | undefined;
  size(): number;
}

export class PriorityQueue<T> implements PriorityQueueI<T> {
  private heap: PriorityQueueNode<T>[] = [];

  enqueue(value: T, priority: number): void {
    const newNode: PriorityQueueNode<T> = { value, priority };
    this.heap.push(newNode);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): T | undefined {
    const length = this.heap.length;
    if (length === 0) return undefined;

    if (length === 1) return this.heap.pop()?.value;

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.sinkDown(0);

    return root.value;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].priority <= this.heap[index].priority) break;

      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    const length = this.heap.length;
    if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
      smallest = left;
    }

    if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
      smallest = right;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }
}
