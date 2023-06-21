export class Point {
  private x: number;
  private y: number;

  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  distance(): number;
  distance(other: Point): number;
  distance(x: number, y: number): number;
  distance(arg1?: number | Point, arg2?: number): number {
    let targetX: number, targetY: number;

    if (arg1 instanceof Point) {
      targetX = arg1.x;
      targetY = arg1.y;
    } else if (typeof arg1 === "number" && typeof arg2 === "number") {
      targetX = arg1;
      targetY = arg2;
    } else {
      targetX = 0;
      targetY = 0;
    }

    const dx = this.x - targetX;
    const dy = this.y - targetY;
    const result = Math.sqrt(dx * dx + dy * dy);
    return Number(result.toFixed(2));
  }
}
