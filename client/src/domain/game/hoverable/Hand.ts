import Hoverable from "@/domain/game/interface/Hoverable";
import Item from "@/domain/game/interface/Item";
import {ItemType} from "@/domain/game/GameTypes";

export default class Hand extends Hoverable {

  public accepts(item: Item): boolean {
    const accepted = [ItemType.CARD, ItemType.HAND_CARD];

    return accepted.includes(item.getItemType());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onHover(item: Item): void {
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
    this.onHoverLeave(item)
  }
}
