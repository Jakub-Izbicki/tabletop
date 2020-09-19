import {DimensionsPx} from "@/domain/game/GameTypes";

export default class Ratio {

  public static trimIntoRatio(height: number, width: number, ratio: RatioConstants): DimensionsPx {
    if (height < width * ratio.valueOf()) {
      width = height / ratio.valueOf();
    } else {
      height = width * ratio.valueOf();
    }

    return {
      width: width,
      height: height,
    }
  }
}

export enum RatioConstants {
  RATIO_16_9 = 0.5625
}
