export default class Subject {
  public readonly id;
  #x;
  #y;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.#x = x;
    this.#y = y;
  }

  // not reactive in Svelte components
  get x() {
    return this.#x;
  }

  // not reactive in Svelte components
  get y() {
    return this.#y;
  }

  getAsSVGElement(): SVGSVGElement | string {
    return `
          <rect width="100" height="100" />
    `;
  }
}
