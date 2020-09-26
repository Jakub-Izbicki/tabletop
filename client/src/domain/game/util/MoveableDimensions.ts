import {Translate, TranslateUnit} from "../GameTypes";

export default class MoveableDimensions {

  /**
   Extract last two numbers inside css matrix statement (left and top values).<br>
   Example:<br>
   For following string:<br>
   - "matrix(1,0,0,1,123.45,678) translate(88px, 99px)"<br>
   Should extract three groups total, second and third being values:<br>
   - '123.45',
   - '678'
   */
  private static getMatrixAndTranslateLeftAndTop =
      /matrix\((?:[0-9]+,)+([+-]?(?:[0-9]*[.])?[0-9]+),([+-]?(?:[0-9]*[.])?[0-9]+)\) translate\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px\)/g;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getTranslateFromDrag(transform: any): Translate {
    const position = this.getPxPosition(transform);

    const x: number = position.matrixX + position.translateX;
    const y: number = position.matrixY + position.translateY;

    return {x, y, unit: TranslateUnit.PX};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getPxPosition(transform: any): MovablePosition {
    const matches = new RegExp(this.getMatrixAndTranslateLeftAndTop).exec(transform);

    if (!matches || matches.length < 5) {
      console.warn(`Could not get transform values from movable transform: [${transform}], matches: [${matches}]`);
      return {matrixX: 0, matrixY: 0, translateX: 0, translateY: 0};
    }

    return {
      matrixX: +matches[1],
      matrixY: +matches[2],
      translateX: +matches[3],
      translateY: +matches[4]
    };
  }
}

interface MovablePosition {
  matrixX: number;
  matrixY: number;
  translateX: number;
  translateY: number;
}
