import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled?: boolean) {
    if (points.length < 3) {
      throw new Error("A Shape must have at least 3 points.");
    }

    this.points = points;
    this.color = color || "green";
    this.filled = filled ?? true;
  }

  toString(): string {
    const filledText = this.filled ? "filled" : "not filled";
    const pointsText = this.points.map((point) => point.toString()).join(", ");
    return `A Shape with color of ${this.color} and ${filledText}. Points: ${pointsText}.`;
  }

  abstract getPerimeter(): number;

  abstract getType(): string;
}
