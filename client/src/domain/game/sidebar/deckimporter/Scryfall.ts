import Axios from "axios";

export class QueriedCard {

  constructor(readonly name: string,
              readonly amount: number) {
  }
}

export class SearchedCards {

  constructor(readonly found: FoundCard[],
              readonly notFound: string[],
              readonly errors: string[]) {
  }
}

export class FoundCard {

  constructor(readonly name: string,
              readonly imageUrl: string) {
  }
}

export default class Scryfall {

  private scryfallCollectionEndpoint = "https://api.scryfall.com/cards/collection";

  public getCardsByNames(cardNames: QueriedCard[]): Promise<SearchedCards> {
    const body = {"identifiers": [] as Record<string, any>[]}
    body.identifiers.push(...cardNames.map(card => ({name: card.name})));

    return Axios.post(this.scryfallCollectionEndpoint,
        body)
    .then(response => {
      console.info(response.data);
      return response;
    })
    .then(response => {
      const cards: any[] = response?.data?.data;
      const foundNames: FoundCard[] = cards.filter(card => card?.name).map(card => this.parseFoundCard(card));

      return new SearchedCards(foundNames, [], []);
    });
  }

  private parseFoundCard(card: any) {
    let imageUrl;
    if (card.image_uris) {
      imageUrl = card.image_uris.normal;
    } else {
      imageUrl = card.card_faces[0].image_uris.normal;
    }

    return new FoundCard(card.name, imageUrl);
  }
}
