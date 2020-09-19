import Item from "@/domain/game/item/Item";
import Entity from "@/domain/game/Entity";
import AbsoluteDistance from "@/domain/game/AbsoluteDistance";
import Element from "@/domain/game/item/Element";
import {EntityStates} from "@/domain/game/GameTypes";

export default abstract class Hoverable extends Entity {

  public constructor(protected id: string,
                     protected readonly gameInstanceId: string,
                     protected readonly hoverableAreaElId: string) {
    super(id, gameInstanceId);
  }

  public isInRange(entity: Entity): boolean {
    const pxBetween = AbsoluteDistance.getPxFromTo(this.hoverableAreaElId, entity.getId());
    const hoverableRect = Element.from(this.hoverableAreaElId).getRect();

    const isInXrange = Math.abs(pxBetween.x) <= hoverableRect.width / 2;
    const isInYrange = Math.abs(pxBetween.y) <= hoverableRect.height / 2;

    return isInXrange && isInYrange;
  }

  public isHover(): boolean {
    return this.states.includes(EntityStates.IS_HOVER);
  }

  public setHover(isHover: boolean): void {
    this.setState(EntityStates.IS_HOVER, isHover);
  }

  abstract accepts(item: Item): boolean;

  abstract onDragEnd(item: Item): void;

  abstract onHover(item: Item): void;

  abstract onHoverLeave(item: Item): void;
}
