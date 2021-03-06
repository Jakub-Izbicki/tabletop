import {EntityStates, ItemType, Translate, TranslateUnit} from "@/domain/game/GameTypes";
import RelativeFontSize from "@/domain/game/util/RelativeFontSize";
import AbsoluteDistance from "@/domain/game/util/AbsoluteDistance";
import Hoverable from "@/domain/game/interface/Hoverable";
import {Timeouts} from "@/domain/game/util/Timeouts";

export default abstract class Item extends Hoverable {

  protected constructor(protected id: string,
                        protected translate: Translate,
                        protected rotation: number,
                        protected readonly gameInstanceId: string) {
    super(id, gameInstanceId, id);
    this.setTranslate(translate);
  }

  public abstract getItemType(): ItemType;

  public moveItemTo(elementId: string): void {
    const pxFromTo = AbsoluteDistance.getPxFromTo(this.id, elementId);
    const emFromTo = {
      x: RelativeFontSize.getEmFromPx(pxFromTo.x, this.gameInstanceId),
      y: RelativeFontSize.getEmFromPx(pxFromTo.y, this.gameInstanceId),
      unit: TranslateUnit.EM
    };

    const position = {
      x: this.getTranslate().x - emFromTo.x,
      y: this.getTranslate().y - emFromTo.y,
      unit: TranslateUnit.EM
    };

    this.moveItem(position);
  }

  public moveItem(position: Translate): void {
    this.setTranslate(position);
  }

  public animateMoveItem(position: Translate, resetAnimateOnEnd = true): void {
    this.setNonePointerEvents(true);
    this.setIsMovingAnimate(true);
    this.setTranslate(position);

    setTimeout(() => {
      if (resetAnimateOnEnd) {
        this.setNonePointerEvents(false);
        this.setIsMovingAnimate(false);
      }
    }, Timeouts.SMALL_MS.valueOf());
  }

  public isDragged(): boolean {
    return this.states.includes(EntityStates.IS_DRAGGED);
  }

  public isDisappeared(): boolean {
    return this.states.includes(EntityStates.IS_DISAPPEARED);
  }

  public isMovingAnimate(): boolean {
    return this.states.includes(EntityStates.IS_MOVING_ANIMATE);
  }

  public isSkipAnimation(): boolean {
    return this.states.includes(EntityStates.IS_SKIP_ANIMATION);
  }

  public isNonePointerEvents(): boolean {
    return this.states.includes(EntityStates.IS_NONE_POINTER_EVENTS);
  }

  public isMouseOver(): boolean {
    return this.states.includes(EntityStates.IS_MOUSE_OVER);
  }

  public setMouseOver(isMouseOver: boolean): void {
    this.setState(EntityStates.IS_MOUSE_OVER, isMouseOver);
  }

  public setDragged(isDragged: boolean): void {
    this.setState(EntityStates.IS_DRAGGED, isDragged);
  }

  public setDisappeared(isDisappeared: boolean): void {
    this.setState(EntityStates.IS_DISAPPEARED, isDisappeared);
  }

  public setIsMovingAnimate(isMoving: boolean): void {
    this.setState(EntityStates.IS_MOVING_ANIMATE, isMoving);
  }

  public setIsSkipAnimation(isSkip: boolean): void {
    this.setState(EntityStates.IS_SKIP_ANIMATION, isSkip);
  }

  public getTranslate(): Translate {
    return this.translate;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public compareTo(other: Item): number {
    return this.getTranslate().y === other.getTranslate().y ? 0 :
        this.getTranslate().y < other.getTranslate().y ? -1 : 1;
  }

  public setTranslate(translate: Translate): void {
    if (translate.unit === TranslateUnit.PX) {
      this.translate = {
        x: RelativeFontSize.getEmFromPx(translate.x, this.gameInstanceId),
        y: RelativeFontSize.getEmFromPx(translate.y, this.gameInstanceId),
        unit: TranslateUnit.EM
      };
    } else if (translate.unit === TranslateUnit.PERCENT) {
      this.translate = {
        x: RelativeFontSize.getXEmFromPercent(translate.x, this.gameInstanceId),
        y: RelativeFontSize.getYEmFromPercent(translate.y, this.gameInstanceId),
        unit: TranslateUnit.EM
      };
    } else if (translate.unit === TranslateUnit.EM) {
      this.translate = translate;
    } else {
      throw `Attempt to set translate with invalid unit: [${translate}]`;
    }
  }

  public setRotation(rotation: number) {
    this.rotation = rotation;
  }

  public setNonePointerEvents(isNone: boolean): void {
    this.setState(EntityStates.IS_NONE_POINTER_EVENTS, isNone);
  }
}
