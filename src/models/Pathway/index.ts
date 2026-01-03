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
    }"/>`;
  }
}
