import EntityStore from "@/domain/game/EntityStore";
import Deck from "@/domain/game/item/Deck";
import {TranslateUnit} from "@/domain/game/GameTypes";
import DeckCard from "@/domain/game/item/DeckCard";
import {v4 as uuid4} from "uuid";

export default class GameStateProvider {

  public static createWelcomeState(gameInstanceId: string): void {
    const gameInstance: EntityStore = EntityStore.getInstance(gameInstanceId);


    const deck = new Deck(
        uuid4(),
        {x: 50, y: 50, unit: TranslateUnit.PERCENT},
        0,
        gameInstanceId,
        []);

    // warren instigator
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/a/4/a47fe35f-859c-4663-a4dd-f7ca38e1099a.jpg?1592764738", 1, gameInstanceId);
    // goblin diplomats
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/4/a/4ad346cb-c3e5-4aea-8de6-bb62827e25a9.jpg?1592764797", 1, gameInstanceId);
    // goblin rabblemaster
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/b/c/bce84a87-093a-42de-9696-8c3250e0f33b.jpg?1592764823", 1, gameInstanceId);
    // goblin chieftain
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/3/5/35ac943e-8747-40a0-ac2a-8b88cfa32ca8.jpg?1599764783", 1, gameInstanceId);
    // goblin goon
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/5/b/5b629eb0-0e84-4eaf-bbc3-ec85ae17a8a7.jpg?1601077790", 1, gameInstanceId);
    // goblin razerunners
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/d/5/d55da0b4-92a5-48a3-bec1-24baf190e91a.jpg?1562937781", 1, gameInstanceId);
    // krenko, mob boss
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/c/d/cd9fec9d-23c8-4d35-97c1-9499527198fb.jpg?1601078209", 1, gameInstanceId);
    // foundry street denizen
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/a/3/a328c8d8-a404-43b5-8c79-2e79d639fb40.jpg?1592764775", 2, gameInstanceId);
    // goblin tunneler
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/7/d/7d1ebba6-25ed-448f-b230-7c4a0ca675fa.jpg?1592764842", 1, gameInstanceId);
    // boggart brute
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/3/d/3d6de3a7-30a7-49d7-8e39-494355c6edae.jpg?1600714905", 2, gameInstanceId);
    // ember hauler
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/1/5/159d476e-2f20-4f9b-adfd-9c541dc3e199.jpg?1592516919", 1, gameInstanceId);
    // goblin wardriver
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/6/f/6fb10750-4037-4630-82d3-bb068c335e48.jpg?1592764848", 2, gameInstanceId);
    // Goblin Glory Chaser
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/0/7/07679f88-4bbe-46e1-9b24-3b9f5670860f.jpg?1592764805", 1, gameInstanceId);
    // Gempalm Incinerator
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/9/0/909ac95c-ee41-482c-8b4d-196fe0d5b3c1.jpg?1592764780", 1, gameInstanceId);
    // Goblin Ringleader
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/6/9/6911af4e-4abd-4cf9-8a86-ae5d680c6f12.jpg?1592516961", 2, gameInstanceId);
    // battle squadron
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/0/1/01c3c73d-03e8-4afc-bbfd-08fc87808012.jpg?1592764744", 1, gameInstanceId);

    // Relentless Assault
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/9/7/97622209-9357-4347-8961-f77f8d2389d8.jpg?1604624532", 1, gameInstanceId);
    // Krenko's Command
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/a/1/a1a6efce-e970-4ec3-80b4-c639d0e98186.jpg?1592764866", 3, gameInstanceId);
    // Goblin Grenade
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/3/c/3c57ca32-d1af-4db0-aac4-177baee4ab4d.jpg?1599764793", 1, gameInstanceId);
    // Hordeling Outburst
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/e/4/e4138531-ef42-4c56-864e-d3525a4f2082.jpg?1562442178", 1, gameInstanceId);
    // Cleaver Riot
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/9/3/93930452-af89-42b3-b668-5d4f0a607d4f.jpg?1592764762", 1, gameInstanceId);
    // Brute Strength
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/7/7/7776b3cb-0410-4d9c-958f-3ea042f9eaea.jpg?1592764756", 2, gameInstanceId);
    // Ghostfire
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/2/9/29739dd4-5775-4491-8245-ca2dc38a686e.jpg?1592764786", 3, gameInstanceId);
    // Brittle Effigy
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/d/4/d492418e-fce9-4333-85e7-004a06546b3c.jpg?1592764883", 1, gameInstanceId);
    // Goblin Charbelcher
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/2/4/240344ff-404d-4894-a6e9-4401cd68cf50.jpg?1592764888", 1, gameInstanceId);
    // Mountain
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/c/1/c1baebba-a975-45b1-bbcb-f4ce1ba682b5.jpg?1604628594", 20, gameInstanceId);
    // Forgotten Cave
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/0/8/084bf9fe-78d2-4fef-8514-ed64d6c771e6.jpg?1604628170", 2, gameInstanceId);
    // Blighted Gorge
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/f/1/f133ba0a-e141-4f57-9819-bc17bbacd7b3.jpg?1592764894", 2, gameInstanceId);
    // Tarfire
    this.addCardsToDeck(deck, "https://c1.scryfall.com/file/scryfall-cards/large/front/5/8/5841e5dd-2a4a-42b9-a04f-d7c5c4840d74.jpg?1592764877", 2, gameInstanceId);

    deck.shuffle();
    deck.setDisappeared(true);
    gameInstance.addItem(deck);

    setTimeout(() => deck.setDisappeared(false), 0);
  }

  private static addCardsToDeck(deck: Deck, imageUrl: string, amount: number, gameInstanceId: string): void {
    [...Array(amount).keys()].forEach(() => {
      console.info("deck card")
      deck.pushOnBottom(new DeckCard(uuid4(),
          {x: 0, y: 0, unit: TranslateUnit.EM},
          0,
          gameInstanceId,
          imageUrl,
          false,
          deck.getId()));
    });
  }
}
