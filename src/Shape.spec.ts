import { Shape } from "./Shape";
import { Point } from "./Point";

class TestShape extends Shape {
  constructor(points: Point[], color?: string, filled?: boolean) {
    super(points, color as string, filled as boolean);
    if (points.length !== 3) {
      throw new Error("A triangle must have exactly 3 points.");
    }
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
    const numPoints = this.points.length;

    for (let i = 0; i < numPoints; i++) {
      const currentPoint = this.points[i];
      const nextPoint = this.points[(i + 1) % numPoints];
      perimeter += currentPoint.distance(nextPoint);
    }

    return perimeter;
  }
}

describe("Shape", () => {
  const points = [new Point(0, 0), new Point(0, 3), new Point(4, 3)];

  it("should fail to be created with 2 points", () => {
    expect(() => new TestShape([new Point(0, 0), new Point(0, 3)])).toThrow();
  });

  it("should show it's color and filled property", () => {
    expect(new TestShape(points, "blue", false).toString()).toBe(
      "A Shape with color of blue and not filled. Points: (0, 0), (0, 3), (4, 3)."
    );
    expect(new TestShape(points, "mustard", true).toString()).toBe(
      "A Shape with color of mustard and filled. Points: (0, 0), (0, 3), (4, 3)."
    );
  });

  it("should have default color and filled property", () => {
    expect(new TestShape(points).toString()).toBe(
      "A Shape with color of green and filled. Points: (0, 0), (0, 3), (4, 3)."
    );
  });

  it("should calculate the perimeter", () => {
    expect(new TestShape(points).getPerimeter()).toBe(12);
  });
});
