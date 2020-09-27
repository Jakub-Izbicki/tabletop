import Item from "@/domain/game/interface/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";
import Hand from "@/domain/game/hoverable/Hand";
import HandCard from "@/domain/game/item/HandCard";
import AbsoluteDistance from "@/domain/game/util/AbsoluteDistance";
import BaseCard from "@/domain/game/interface/BaseCard";

export default class Card extends BaseCard {

  constructor(protected id: string,
              protected cardTranslate: Translate,
              protected readonly gameInstanceId: string,
              protected readonly imageUrl: string,
              protected readonly isFaceUp: boolean) {
    super(id, cardTranslate, gameInstanceId, isFaceUp);
  }

  public getItemType(): ItemType {
    return ItemType.CARD;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public toHandCard(hand: Hand): HandCard {
    const position = AbsoluteDistance.getPxFromRootOfContainer(this.getId(), hand.getId());
    return new HandCard(this.getId(),
        position,
        hand.getId(),
        this.getGameInstanceId(),
        this.imageUrl,
        this.getIsFaceUp());
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
