import Element from "@/domain/game/interface/Element";

export default class RelativeFontSize {

  public static DEFAULT = 1;

  private static MULTIPLIER = 40;

  public static getPixelSize(containerWidth: number): number {
    return this.DEFAULT * containerWidth / this.MULTIPLIER;
  }

  public static getEmFromPx(px: number, gameInstanceId: string) {
    return px / (this.DEFAULT * Element.from(gameInstanceId).getRect().width / this.MULTIPLIER);
  }

  public static getPxFromEM(em: number, container: Element) {
    return em * (this.DEFAULT * container.getRect().width / this.MULTIPLIER);
  }
}
