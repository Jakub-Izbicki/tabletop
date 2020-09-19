import Item from "@/domain/game/item/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";

export default class HandCard extends Item {

  constructor(protected id: string,
              protected translate: Translate,
              protected  handId: string,
              protected readonly gameInstanceId: string) {
    super(id, translate, gameInstanceId);
  }

  public getItemType(): ItemType {
    return ItemType.HAND_CARD;
  }

  public getHandId(): string {
    return this.handId;
  }

  public moveToHand(): void {
    this.moveItemTo(this.handId);
  }

  /*eslint-disable */
  accepts(item: Item): boolean {
    return false;
  }

  isInRange(item: Item): boolean {
    return false;
  }

  onDragEnd(item: Item): void {
  }

  onHover(item: Item): void {
  }

  onHoverLeave(item: Item): void {
  }

  /*eslint-enable */
}
