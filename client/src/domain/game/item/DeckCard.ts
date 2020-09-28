import Item from "@/domain/game/interface/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";
import BaseCard from "@/domain/game/interface/BaseCard";

export default class DeckCard extends BaseCard {

  constructor(protected id: string,
              protected cardTranslate: Translate,
              protected readonly gameInstanceId: string,
              protected readonly imageUrl: string,
              protected readonly isFaceUp: boolean,
              protected readonly deckId: string) {
    super(id, cardTranslate, gameInstanceId, imageUrl, isFaceUp);
  }

  public getItemType(): ItemType {
    return ItemType.DECK_CARD;
  }

  public getDeckId(): string {
    return this.deckId;
  }

  accepts(item: Item): boolean {
    return item.getItemType() === ItemType.CARD || item.getItemType() === ItemType.HAND_CARD;
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
