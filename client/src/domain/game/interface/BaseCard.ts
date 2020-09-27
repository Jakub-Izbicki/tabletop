import Item from "@/domain/game/interface/Item";
import {EntityStates, Translate} from "@/domain/game/GameTypes";

export default abstract class BaseCard extends Item {

  protected constructor(protected id: string,
                        protected baseCardTranslate: Translate,
                        protected readonly gameInstanceId: string,
                        protected readonly imageUrl: string,
                        protected readonly isFaceUp: boolean) {
    super(id, baseCardTranslate, gameInstanceId);
    this.setFaceUp(isFaceUp);
  }

  public getImageUrl() {
    return this.imageUrl;
  }

  public getIsFaceUp(): boolean {
    return this.states.includes(EntityStates.IS_FACE_UP);
  }

  public setFaceUp(isFaceUp: boolean): void {
    this.setState(EntityStates.IS_FACE_UP, isFaceUp);
  }
}
