import {EntityStates} from "@/domain/game/GameTypes";

export default abstract class Entity {

  protected states: EntityStates[] = [];

  protected constructor(protected id: string,
                        protected readonly gameInstanceId: string) {
    this.assureUniqueId(id);
    // this.assureExistingContainerForGame(gameInstanceId);
  }

  protected abstract assureUniqueId(id: string): void;

  // private assureExistingContainerForGame(containerId: string): void {
  //   if (!document.getElementById(containerId)) {
  // throw `Attempt to create entity with non-existing container/game instance, id: [${containerId}]!`;
  // }
  // }

  public getId(): string {
    return this.id;
  }

  public getGameInstanceId(): string {
    return this.gameInstanceId;
  }

  public setState(state: EntityStates, doSet: boolean): void {
    if (doSet) {
      this.states = [...this.states, state];
    } else {
      this.states = this.states.filter(s => s != state);
    }
  }
}
