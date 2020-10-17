import Item from "@/domain/game/interface/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";
import Hand from "@/domain/game/hoverable/Hand";
import HandCard from "@/domain/game/item/HandCard";
import AbsoluteDistance from "@/domain/game/util/AbsoluteDistance";
import BaseCard from "@/domain/game/interface/BaseCard";
import DeckCard from "@/domain/game/item/DeckCard";

export default class Card extends BaseCard {

  constructor(protected id: string,
              protected cardTranslate: Translate,
              protected cardRotation: number,
              protected readonly gameInstanceId: string,
              protected readonly imageUrl: string,
              protected readonly isFaceUp: boolean) {
    super(id, cardTranslate, cardRotation, gameInstanceId, imageUrl, isFaceUp);
  }

  public getItemType(): ItemType {
    return ItemType.CARD;
  }

  public toHandCard(hand: Hand): HandCard {
    const position = AbsoluteDistance.getPxFromRootOfContainer(this.getId(), hand.getId());
    return new HandCard(this.getId(),
        position,
        this.getRotation(),
        hand.getId(),
        this.getGameInstanceId(),
        this.imageUrl,
        this.getIsFaceUp());
  }

  toDeckCard(currentDeckCard: DeckCard): DeckCard {
    const position = AbsoluteDistance.getPxFromTo(this.getId(), currentDeckCard.getDeckId());
    return new DeckCard(this.getId(),
        position,
        this.getRotation(),
        this.getGameInstanceId(),
        this.getImageUrl(),
        this.getIsFaceUp(),
        currentDeckCard.getDeckId());
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
