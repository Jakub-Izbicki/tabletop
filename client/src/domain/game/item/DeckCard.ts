import Item from "@/domain/game/interface/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";
import BaseCard from "@/domain/game/interface/BaseCard";
import Card from "@/domain/game/item/Card";
import AbsoluteDistance from "@/domain/game/util/AbsoluteDistance";
import HandCard from "@/domain/game/item/HandCard";
import Hand from "@/domain/game/hoverable/Hand";

export default class DeckCard extends BaseCard {

  constructor(protected id: string,
              protected deckCardTranslate: Translate,
              protected deckCardRotation: number,
              protected readonly gameInstanceId: string,
              protected readonly imageUrl: string,
              protected readonly isFaceUp: boolean,
              protected readonly deckId: string) {
    super(id, deckCardTranslate, deckCardRotation, gameInstanceId, imageUrl, isFaceUp);
  }

  public getItemType(): ItemType {
    return ItemType.DECK_CARD;
  }

  public getDeckId(): string {
    return this.deckId;
  }

  public toCard(): Card {
    const position = AbsoluteDistance.getPxFromRootOfContainer(this.getId(), this.gameInstanceId);
    return new Card(this.getId(),
        position,
        this.getRotation(),
        this.getGameInstanceId(),
        this.getImageUrl(),
        this.getIsFaceUp());
  }

  public toHandCard(hand: Hand): HandCard {
    const position = AbsoluteDistance.getPxFromRootOfContainer(this.getId(), hand.getId());
    return new HandCard(this.getId(),
        position,
        this.getRotation(),
        hand.getId(),
        this.getGameInstanceId(),
        this.getImageUrl(),
        this.getIsFaceUp());
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
