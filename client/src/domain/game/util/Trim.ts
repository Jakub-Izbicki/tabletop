import {Translate, TranslateUnit} from "@/domain/game/GameTypes";
import Element from "@/domain/game/interface/Element";
import RelativeFontSize from "@/domain/game/util/RelativeFontSize";

export default class Trim {

  public static trimIfOutsideElement(translate: Translate, elId: string): Translate {
    const el = Element.from(elId);

    if (!el.isPresent) {
      console.warn(`Attempt to trim outside non existing container, with id: [${elId}]`);
      return translate;
    }

    if (translate.unit === TranslateUnit.EM) {
      translate = {
        x: RelativeFontSize.getPxFromEM(translate.x, el),
        y: RelativeFontSize.getPxFromEM(translate.y, el),
        unit: TranslateUnit.PX
      }
    }

    const rect = el.getRect();

    const left = 0;
    const right = rect.width;
    const top = 0;
    const bottom = rect.height;

    const x = this.getBetween(translate.x, left, right);
    const y = this.getBetween(translate.y, top, bottom);

    return {x, y, unit: translate.unit};
  }

  private static getBetween(translate: number, min: number, max: number): number {
    if (translate >= min && translate <= max) {
      return translate;
    } else if (translate < min) {
      return min;
    } else {
      return max;
    }
  }
}
