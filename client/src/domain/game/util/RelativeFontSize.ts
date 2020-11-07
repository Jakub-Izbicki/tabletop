import Element from "@/domain/game/interface/Element";

export default class RelativeFontSize {

  public static DEFAULT = 1;

  private static MULTIPLIER = 40;

  public static getPixelSize(containerWidth: number): number {
    return this.DEFAULT * containerWidth / this.MULTIPLIER;
  }

  public static getEmFromPx(px: number, gameInstanceId: string): number {
    return px / this.getGameWidth(gameInstanceId);
  }

  public static getPxFromEM(em: number, gameInstanceId: string): number {
    return em * this.getGameWidth(gameInstanceId);
  }

  public static getXEmFromPercent(percent: number, gameInstanceId: string): number {
    return this.getEmFromPercent(percent, Element.from(gameInstanceId).getRect().width, gameInstanceId);
  }

  public static getYEmFromPercent(percent: number, gameInstanceId: string): number {
    return this.getEmFromPercent(percent, Element.from(gameInstanceId).getRect().height, gameInstanceId);
  }

  private static getEmFromPercent(percent: number, sizePx: number, gameInstanceId: string): number {
    const percentIntoPx = percent / 100 * sizePx;
    return this.getEmFromPx(percentIntoPx, gameInstanceId);
  }

  private static getGameWidth(gameInstanceId: string): number {
    return this.DEFAULT * Element.from(gameInstanceId).getRect().width / this.MULTIPLIER;
  }
}
