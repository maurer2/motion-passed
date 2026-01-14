// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#line
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#polyline
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths

type Point = [x: number, y: number];

export default class Pathway {
  public readonly id;

  // can't use private properties/elements with runes
  private _startingPoint = $state<Point>([0, 0]);
  private _endPoint = $state<Point>([0, 0]);

  constructor(id: string, x1: number, y1: number, x2: number, y2: number) {
    this.id = id;
    this._startingPoint = [x1, y1];
    this._endPoint = [x2, y2];
  }

  // derived doesn't work with getters
  startingPoint = $derived(() => {
    return this._startingPoint;
  });
  endPoint = $derived(() => {
    return this._endPoint;
  });
  svgElement = $derived(() => {
    const [x1, y1] = this._startingPoint;
    const [x2, y2] = this._endPoint;

    return `<line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" stroke="red"/>`;
  });

  static getReflectionPath(pathway: Pathway): Pathway {
    const [x1, y1] = pathway.startingPoint();
    const [x2, y2] = pathway.endPoint();

    const directionX = x2 - x1;
    const directionY = y2 - y1;

    const value = Math.sqrt(directionX ** 2 + directionY ** 2);

    const [normalX, normalY] = [directionY / value, (directionX * -1) / value];

    const multiplier = 100;

    return new Pathway(
      "reflection-path",
      x2,
      y2,
      normalX * multiplier,
      normalY * multiplier
    );
  }
}
