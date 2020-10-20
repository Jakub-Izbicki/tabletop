export enum ItemType {
  CARD = "CARD",
  HAND_CARD = "HAND_CARD",
  DECK = "DECK",
  DECK_CARD = "DECK_CARD"
}

export enum TranslateUnit {
  PX = "px",
  EM = "em",
}

export interface Translate {
  readonly x: number;
  readonly y: number;
  readonly unit: TranslateUnit;
}

export enum TransformConsts {
  TRANSFORM_X = "--transform-translate-x",
  TRANSFORM_Y = "--transform-translate-y",
  ROTATION = "--transform-rotate"
}

export interface DimensionsPx {
  readonly width: number;
  readonly height: number;
}

export enum EntityStates {
  IS_HOVER,
  IS_DRAGGED,
  IS_NONE_POINTER_EVENTS,
  IS_MOVING_ANIMATE,
  IS_SKIP_ANIMATION,
  IS_FACE_UP,
  IS_MOUSE_OVER
}
