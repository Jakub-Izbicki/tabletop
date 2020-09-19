import Element from "@/domain/game/item/Element";

export default class RelativeFontSize {

  public static DEFAULT = 1;

  private static MULTIPLIER = 30;

  public static getPixelSize(containerWidth: number): number {
    return this.DEFAULT * containerWidth / this.MULTIPLIER;
  }

  public static getEm(px: number, gameInstanceId: string) {
    return px / (this.DEFAULT * Element.from(gameInstanceId).getRect().width / this.MULTIPLIER);
  }

  public static getPx(em: number, container: Element) {
    return em * (this.DEFAULT * container.getRect().width / this.MULTIPLIER);
  }
}
