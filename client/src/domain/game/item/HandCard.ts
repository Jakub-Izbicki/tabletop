import Item from "@/domain/game/item/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";
import EntityStore from "@/domain/game/item/EntityStore";

export default class HandCard extends Item {

  private static HAND_CARDS_SPACING = 1;

  constructor(protected id: string,
              protected translate: Translate,
              protected  handId: string,
              protected readonly gameInstanceId: string,
              protected readonly imageUrl: string) {
    super(id, translate, gameInstanceId);
  }

  public getItemType(): ItemType {
    return ItemType.HAND_CARD;
  }

  public getImageUrl() {
    return this.imageUrl;
  }

  public getHandId(): string {
    return this.handId;
  }

  public moveToHand(): void {
    this.moveItemTo(this.handId);
  }

  public handCardOffset(): number {
    const handCards = EntityStore.getInstance(this.gameInstanceId).getHandCards();
    const position = handCards.findIndex(handCard => handCard.getId() === this.getId());
    return position * HandCard.HAND_CARDS_SPACING;
  }

  public compareTo(other: HandCard): number {
    const x = this.getTranslate().x + this.handCardOffset();
    const otherX = other.getTranslate().x + other.handCardOffset();

    return x === otherX ? 0 : x < otherX ? -1 : 1;
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
