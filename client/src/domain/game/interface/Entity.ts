import {EntityStates} from "@/domain/game/GameTypes";

export default abstract class Entity {

  protected states: EntityStates[] = [];

  protected constructor(protected id: string,
                        protected readonly gameInstanceId: string) {
  }

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
