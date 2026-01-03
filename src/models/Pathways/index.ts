import type Pathway from "../Pathway";

export default class Pathways {
  #pathWays;

  constructor(pathWays: Pathway[]) {
    this.#pathWays = pathWays;
  }

  getAsSVGElement(): SVGSVGElement | string {
    return this.#pathWays.join(" ");
  }
}
