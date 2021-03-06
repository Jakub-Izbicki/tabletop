import {Translate, TranslateUnit} from "@/domain/game/GameTypes";
import Element from "@/domain/game/interface/Element";

export default class AbsoluteDistance {

  public static getPxFromTo(firstElId: string, secondElId: string): Translate {
    const firstRect = Element.from(firstElId).getRect();
    const secondRect = Element.from(secondElId).getRect();

    const firstCenterX = firstRect.x + (firstRect.width / 2);
    const firstCenterY = firstRect.y + (firstRect.height / 2);
    const secondCenterX = secondRect.x + (secondRect.width / 2);
    const secondCenterY = secondRect.y + (secondRect.height / 2);

    return {
      x: firstCenterX - secondCenterX,
      y: firstCenterY - secondCenterY,
      unit: TranslateUnit.PX
    }
  }

  public static getPxFromRootOfContainer(elId: string, containerId: string): Translate {
    const el = Element.from(elId).getRect();
    const gameContainer = Element.from(containerId).getRect();

    const elCenterX = el.x + (el.width / 2);
    const elCenterY = el.y + (el.height / 2);

    return {
      x: elCenterX - gameContainer.x,
      y: elCenterY - gameContainer.y,
      unit: TranslateUnit.PX
    }
  }
}
