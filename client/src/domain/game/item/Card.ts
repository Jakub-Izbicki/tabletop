import Item from "@/domain/game/item/Item";
import {ItemType, Translate, TranslateUnit} from "@/domain/game/GameTypes";
import Hand from "@/domain/game/hoverable/Hand";
import HandCard from "@/domain/game/item/HandCard";

export default class Card extends Item {

  constructor(protected id: string,
              protected cardTranslate: Translate,
              protected readonly gameInstanceId: string,
              protected readonly imageUrl: string) {
    super(id, cardTranslate, gameInstanceId);
  }

  public getItemType(): ItemType {
    return ItemType.CARD;
  }

  public getImageUrl() {
    return this.imageUrl;
  }

  public toHandCard(hand: Hand): HandCard {
    return new HandCard(this.getId(),
        {x: 0, y: 0, unit: TranslateUnit.EM},
        hand.getId(),
        this.getGameInstanceId(),
        this.imageUrl);
  }

  accepts(item: Item): boolean {
    return item.getItemType() === ItemType.CARD;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onHover(item: Item): void {
    if (this.isHover()) {
      return;
    }

    this.setHover(true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onHoverLeave(item: Item): void {
    if (!this.isHover()) {
      return;
    }

    this.setHover(false);
  }

  onDragEnd(item: Item): void {
    this.onHoverLeave(item);
  }
}
