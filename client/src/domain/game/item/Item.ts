import {EntityStates, ItemType, Translate, TranslateUnit} from "@/domain/game/GameTypes";
import RelativeFontSize from "@/domain/game/RelativeFontSize";
import AbsoluteDistance from "@/domain/game/AbsoluteDistance";
import Hoverable from "@/domain/game/hoverable/Hoverable";
import {Timeouts} from "@/domain/game/Timeouts";

export default abstract class Item extends Hoverable {

  protected constructor(protected id: string,
              protected translate: Translate,
              protected readonly gameInstanceId: string) {
    super(id, gameInstanceId, id);
    this.setTranslate(translate);
  }

  public abstract getItemType(): ItemType;

  public moveItemTo(elementId: string): void {
    const pxFromTo = AbsoluteDistance.getPxFromTo(this.id, elementId);
    const emFromTo = {
      x: RelativeFontSize.getEm(pxFromTo.x, this.gameInstanceId),
      y: RelativeFontSize.getEm(pxFromTo.y, this.gameInstanceId),
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
    // if (this.containerId) {
    //   position = Trim.trimIfOutsideElement(position, this.containerId);
    // }

    this.setTranslate(position);
  }

  public animateMoveItem(position: Translate): void {
    this.setNonePointerEvents(true);
    this.setIsMovingAnimate(true);
    this.setTranslate(position);

    setTimeout(() => {
      this.setNonePointerEvents(false);
      this.setIsMovingAnimate(false);
    }, Timeouts.SMALL_MS.valueOf());
  }

  public isDragged(): boolean {
    return this.states.includes(EntityStates.IS_DRAGGED);
  }

  public isMovingAnimate(): boolean {
    return this.states.includes(EntityStates.IS_MOVING_ANIMATE);
  }

  public isNonePointerEvents(): boolean {
    return this.states.includes(EntityStates.IS_NONE_POINTER_EVENTS);
  }

  public setDragged(isDragged: boolean): void {
    this.setState(EntityStates.IS_DRAGGED, isDragged);
  }

  public getTranslate(): Translate {
    return this.translate;
  }

  public compareTo(other: Item): number {
    return this.getTranslate().y === other.getTranslate().y ? 0 :
        this.getTranslate().y < other.getTranslate().y ? -1 : 1;
  }

  public setTranslate(translate: Translate): void {
    if (translate.unit === TranslateUnit.PX) {
      this.translate = {
        x: RelativeFontSize.getEm(translate.x, this.gameInstanceId),
        y: RelativeFontSize.getEm(translate.y, this.gameInstanceId),
        unit: TranslateUnit.EM
      };
    } else if (translate.unit === TranslateUnit.EM) {
      this.translate = translate;
    } else {
      throw `Attempt to set translate with invalid unit: [${translate}]`;
    }
  }

  private setNonePointerEvents(isNone: boolean): void {
    this.setState(EntityStates.IS_NONE_POINTER_EVENTS, isNone);
  }

  private setIsMovingAnimate(isMoving: boolean): void {
    this.setState(EntityStates.IS_MOVING_ANIMATE, isMoving);
  }
}
