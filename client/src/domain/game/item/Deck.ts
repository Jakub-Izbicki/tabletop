import Item from "@/domain/game/interface/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";
import DeckCard from "@/domain/game/item/DeckCard";

export default class Deck extends Item {

  public constructor(protected id: string,
                     protected deckTranslate: Translate,
                     protected readonly gameInstanceId: string,
                     protected deckCards: DeckCard[]) {
    super(id, deckTranslate, gameInstanceId);
  }

  public getItemType(): ItemType {
    return ItemType.DECK;
  }

  public getTopCard(): DeckCard | null {
    return this.deckCards.length ? this.deckCards[0] : null;
  }

  public getCard(cardId: string): DeckCard | undefined {
    return this.deckCards.find(card => card.getId() === cardId);
  }

  public getCards(): DeckCard[] {
    return this.deckCards;
  }

  public pushOnTop(card: DeckCard): void {
    this.deckCards.unshift(card);
  }

  public pushOnBottom(card: DeckCard): void {
    this.deckCards.push(card);
  }

  public remove(cardId: string): void {
    this.deckCards = this.deckCards.filter(card => card.getId() !== cardId);
  }

  accepts(item: Item): boolean {
    return item.getItemType() === ItemType.DECK_CARD;
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

  /*eslint-enable */
}
