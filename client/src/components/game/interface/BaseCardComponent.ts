import {Component} from 'vue-property-decorator';
import ItemComponent from "@/components/game/interface/ItemComponent";
import BaseCard from "@/domain/game/interface/BaseCard";

@Component
export default class BaseCardComponent<T extends BaseCard> extends ItemComponent<T> {

  get keymap() {
    return {
      'f': {
        keyup: this.flipCard,
      }
    }
  }

  get isFaceUp(): boolean {
    return this.item.getIsFaceUp();
  }

  protected flipCard(): void {
    if (this.isMouseOver()) {
      this.item.setFaceUp(!this.isFaceUp);
    }
  }
}
