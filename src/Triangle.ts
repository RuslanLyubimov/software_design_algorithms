import { Shape } from "./Shape";
import { Point } from "./Point";

export class Triangle extends Shape {
  constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
    super([point1, point2, point3], color as string, filled as boolean);
  }

  toString(): string {
    const pointStrings = this.points.map((point, index) => `v${index + 1}=${point.toString()}`);
    return `Triangle[${pointStrings.join(",")}]`;
  }

  getType(): string {
    const sideA = this.points[0].distance(this.points[1]);
    const sideB = this.points[1].distance(this.points[2]);
    const sideC = this.points[2].distance(this.points[0]);

    if (sideA === sideB && sideB === sideC) {
      return "equilateral triangle";
    } else if (sideA === sideB || sideB === sideC || sideC === sideA) {
      return "isosceles triangle";
    } else {
      return "scalene triangle";
    }
  }

  getPerimeter(): number {
    let perimeter = 0;

    for (let i = 0; i < this.points.length; i++) {
      const currentPoint = this.points[i];
      const nextPoint = this.points[(i + 1) % this.points.length];
      perimeter += currentPoint.distance(nextPoint);
    }

    return perimeter;
  }
}
