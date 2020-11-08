import Item from "@/domain/game/interface/Item";
import {ItemType, Translate} from "@/domain/game/GameTypes";
import DeckCard from "@/domain/game/item/DeckCard";
import Shuffle from "@/domain/game/util/Shuffle";

export default class Deck extends Item {

  public constructor(protected id: string,
                     protected deckTranslate: Translate,
                     protected deckRotation: number,
                     protected readonly gameInstanceId: string,
                     protected deckCards: DeckCard[]) {
    super(id, deckTranslate, deckRotation, gameInstanceId);
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

  public shuffle(): void {
    this.getTopCard()?.setDragged(false);
    this.getTopCard()?.setHover(false);
    this.getTopCard()?.setMouseOver(false);
    this.getCards().forEach(deckCard => deckCard.setFaceUp(false));

    // copying existing array and setting it to deck cards after shuffle
    // in order to trigger vue's recomputation of computed props,
    // otherwise it won't trigger
    const arrayToShuffle = [...this.getCards()];
    Shuffle.anArray(arrayToShuffle);
    this.setCards(arrayToShuffle);
  }

  private setCards(deckCards: DeckCard[]): void {
    this.deckCards = deckCards;
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
