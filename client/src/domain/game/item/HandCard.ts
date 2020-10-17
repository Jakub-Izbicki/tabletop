import Item from "@/domain/game/interface/Item";
import {ItemType, Translate, TranslateUnit} from "@/domain/game/GameTypes";
import EntityStore from "@/domain/game/EntityStore";
import Card from "@/domain/game/item/Card";
import AbsoluteDistance from "@/domain/game/util/AbsoluteDistance";
import BaseCard from "@/domain/game/interface/BaseCard";
import DeckCard from "@/domain/game/item/DeckCard";

export default class HandCard extends BaseCard {

  private static HAND_CARDS_SPACING = 2;

  constructor(protected id: string,
              protected handCardTranslate: Translate,
              protected handCardRotation: number,
              protected handId: string,
              protected readonly gameInstanceId: string,
              protected readonly imageUrl: string,
              protected readonly isFaceUp: boolean) {
    super(id, handCardTranslate, handCardRotation, gameInstanceId, imageUrl, isFaceUp);
  }

  public getItemType(): ItemType {
    return ItemType.HAND_CARD;
  }

  public getHandId(): string {
    return this.handId;
  }

  public getHandCardOffset(): number {
    const handCards = EntityStore.getInstance(this.gameInstanceId).getHandCards();
    const index = handCards.findIndex(handCard => handCard.getId() === this.getId());
    const position = index * HandCard.HAND_CARDS_SPACING;

    const maxPosition = handCards.length * HandCard.HAND_CARDS_SPACING;

    return position - maxPosition / 2;
  }

  public compareTo(other: Item): number {
    if (!(other instanceof HandCard)) {
      throw "Cannot compare HandCard with other type";
    }

    const x = this.getTranslate().x;
    const otherX = (other as HandCard).getTranslate().x;

    return x === otherX ? 0 : x < otherX ? -1 : 1;
  }

  public moveToHandPosition(): void {
    this.setTranslate({x: 0, y: 0, unit: TranslateUnit.EM});
  }

  public animateMoveToHandPosition(): void {
    this.animateMoveItem({x: 0, y: 0, unit: TranslateUnit.EM})
  }

  public setTranslate(translate: Translate): void {
    super.setTranslate({...translate, x: translate.x + this.getHandCardOffset()});
  }

  public toCard(): Card {
    const distanceToBoardRoot =
        AbsoluteDistance.getPxFromRootOfContainer(this.getId(), this.getGameInstanceId());
    return new Card(this.getId(),
        distanceToBoardRoot,
        this.getRotation(),
        this.getGameInstanceId(),
        this.getImageUrl(),
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
