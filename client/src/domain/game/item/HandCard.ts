import Item from "@/domain/game/item/Item";
import {ItemType, Translate, TranslateUnit} from "@/domain/game/GameTypes";
import EntityStore from "@/domain/game/item/EntityStore";

export default class HandCard extends Item {

  private static HAND_CARDS_SPACING = 2;

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

  public handCardOffset(): number {
    const handCards = EntityStore.getInstance(this.gameInstanceId).getHandCards();
    const position = handCards.findIndex(handCard => handCard.getId() === this.getId());
    const offsetFromHandCenter = position * HandCard.HAND_CARDS_SPACING;

    const maxPosition = handCards.length * HandCard.HAND_CARDS_SPACING;

    return offsetFromHandCenter - maxPosition / 2;
  }

  public compareTo(other: Item): number {
    if (!(other instanceof HandCard)) {
      throw "Cannot compare HandCard with other type";
    }

    const x = this.getTranslate().x + this.handCardOffset();
    const otherX = (other as HandCard).getTranslate().x + (other as HandCard).handCardOffset();

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

  public moveBackToHand(): void {
    this.setTranslate({x: 0, y: 0, unit: TranslateUnit.EM});
  }

  public setTranslate(translate: Translate): void {
    super.setTranslate({...translate, x: translate.x + this.handCardOffset()});
  }
}
