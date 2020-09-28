import Item from "@/domain/game/interface/Item";
import Hoverable from "@/domain/game/interface/Hoverable";
import Entity from "@/domain/game/interface/Entity";
import Card from "@/domain/game/item/Card";
import HandCard from "@/domain/game/item/HandCard";
import Hand from "@/domain/game/hoverable/Hand";
import Deck from "@/domain/game/item/Deck";

export default class EntityStore {

  private static instances: Map<string, EntityStore> = new Map<string, EntityStore>();

  private entities = new Array<Entity>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
  }

  public static getInstance(gameInstanceId: string): EntityStore {
    if (!EntityStore.instances.get(gameInstanceId)) {
      EntityStore.instances.set(gameInstanceId, new EntityStore());
    }

    return this.instances.get(gameInstanceId) as EntityStore;
  }

  public static removeInstance(gameInstanceId: string): void {
    EntityStore.instances.delete(gameInstanceId);
  }

  public getEntities(): Entity[] {
    return this.entities;
  }

  public getEntity(id: string): Entity | null {
    const entity = this.entities.find(e => e.getId() === id);

    return entity ? entity : this.getDeepEntity(id);
  }

  public getHoverables(): Hoverable[] {
    return this.getEntities()
    .filter(e => e instanceof Hoverable)
    .map(e => e as Hoverable);
  }

  public getItems(): Item[] {
    return this.getEntities()
    .filter(e => e instanceof Item)
    .map(e => e as Item);
  }

  public getCards(): Card[] {
    return this.getEntities()
    .filter(e => e instanceof Card)
    .map(c => c as Card);
  }

  public getHandCards(): HandCard[] {
    return this.getEntities()
    .filter(e => e instanceof HandCard)
    .map(c => c as HandCard);
  }

  public getDecks(): Deck[] {
    return this.getEntities()
    .filter(e => e instanceof Deck)
    .map(c => c as Deck);
  }

  private getDeepEntity(id: string): Entity | null {
    const deckCard = this.getDecks().map(deck => deck.getTopCard())
    .find(card => card && card.getId() === id);

    return deckCard ? deckCard : null;
  }

  public addHoverable(hoverable: Hoverable): void {
    if (this.getEntities().some(e => e.getId() === hoverable.getId())) {
      throw `Attempt to add hoverable to store while a hoverable with such id already exists: [${hoverable.getId()}]`;
    }

    this.addEntity(hoverable);
  }

  public addItem(item: Item): void {
    if (this.getEntities().some(e => e.getId() === item.getId())) {
      throw `Attempt to add item to store while a item with such id already exists: [${item.getId()}]`;
    }

    this.addEntity(item);
  }

  public replaceEntity(replacedId: string, newOne: Entity): void {
    this.entities = this.getEntities().map(e => {
      if (e.getId() === replacedId) {
        return newOne;
      } else {
        return e;
      }
    });

  }

  private addEntity(entity: Entity): void {
    this.assureUnique(entity);
    this.getEntities().push(entity);
    this.sort();
  }

  // sort entities first by type, then by their position on screen
  public sort(): void {
    const classesOrder: Function[] = [Card, HandCard, Hand]; // all allowed instances of entities in store
    const nonMovableEntities: Function[] = [Hand];

    this.entities.sort((first: Entity, second: Entity) => {
      // first sort by type
      if (EntityStore.getClassOrder(first, classesOrder) > EntityStore.getClassOrder(second, classesOrder)) {
        return 1;
      }
      if (EntityStore.getClassOrder(first, classesOrder) < EntityStore.getClassOrder(second, classesOrder)) {
        return -1;
      }

      // if same types that are also not comparable by transform (never move), return equal
      if (nonMovableEntities.includes(first.constructor)) {
        return 0;
      }

      // second sort by position
      return (first as Item).compareTo(second as Item);
    });
  }

  private static getClassOrder(entity: Entity, constructors: Function[]): number {
    return constructors.indexOf(entity.constructor);
  }

  private assureUnique(entity: Entity): void {
    const isUnique = this.getHoverables().every(i => i.getId() !== entity.getId());

    if (!isUnique) {
      throw `Attempt to add to store new entity with non-unique id: [${JSON.stringify(entity, null, 3)}]!`;
    }
  }
}
