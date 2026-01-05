// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#line
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Basic_shapes#polyline
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths
export default class Pathway {
  public readonly id;
  #x1;
  #y1;
  #x2;
  #y2;

  constructor(id: string, x1: number, y1: number, x2: number, y2: number) {
    this.id = id;
    this.#x1 = x1;
    this.#y1 = y1;
    this.#x2 = x2;
    this.#y2 = y2;
  }

  // not reactive in Svelte components
  get startPoint(): readonly [x1: number, y1: number] {
    return [this.#x1, this.#y1] as const;
  }

  // not reactive in Svelte components
  get endPoint(): readonly [x2: number, y2: number] {
    return [this.#x2, this.#y2] as const;
  }

  getAsSVGElement(): SVGSVGElement | string {
    return `<line x1="${this.#x1}" x2="${this.#x2}" y1="${this.#y1}" y2="${
      this.#y2
    }" stroke="red"/>`;
  }

  static getReflectionPath(pathway: Pathway): Pathway {
    const [x1, y1] = pathway.startPoint;
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
