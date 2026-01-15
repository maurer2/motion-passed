// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#line
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#polyline
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths

type Point = [x: number, y: number];

export default class Pathway {
  // can't use private properties/elements with runes
  private _startingPoint = $state<Point>([0, 0]);
  private _endPoint = $state<Point>([0, 0]);

  public readonly id;
  public readonly startingPoint: Point;
  public readonly endPoint: Point;
  public readonly svgElement: SVGSVGElement | string;

  constructor(id: string, x1: number, y1: number, x2: number, y2: number) {
    this.id = id;
    this._startingPoint = [x1, y1];
    this._endPoint = [x2, y2];

    // https://github.com/sveltejs/svelte/pull/15820
    this.startingPoint = $derived(this._startingPoint);
    this.endPoint = $derived(this._endPoint);
    this.svgElement = $derived.by(() => {
      const [[x1, y1], [x2, y2]] = [this._startingPoint, this._endPoint];

      return `<line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" stroke="red"/>`;
    });
  }

  static getReflectionPath(pathway: Pathway): Pathway {
    const [x1, y1] = pathway.startingPoint;
    const [x2, y2] = pathway.endPoint;

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
