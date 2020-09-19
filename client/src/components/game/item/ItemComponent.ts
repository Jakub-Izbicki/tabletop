import {Component, Prop, Vue} from 'vue-property-decorator';
import Moveable from "vue-moveable";
import EntityStore from "@/domain/game/item/EntityStore";
import {TransformConsts} from "@/domain/game/GameTypes";
import MoveableDimensions from "@/domain/game/item/MoveableDimensions";
import Item from "@/domain/game/item/Item";
import Hoverable from "@/domain/game/hoverable/Hoverable";
import throttle from "lodash.throttle";

@Component({
  components: {Moveable}
})
export default class ItemComponent<T extends Item> extends Vue {

  @Prop({type: String, required: true})
  protected readonly id!: string;

  @Prop({type: String, required: true})
  protected readonly gameInstanceId!: string;

  protected store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

  private currentHoverable: Hoverable | undefined | null;

  private readonly moveable = {
    draggable: true,
    throttleDrag: 0,
    renderDirections: []
  };

  private readonly hover = throttle(() => {
    if (this.item.isDragged()) {
      this.onHover();
      this.onHoverLeave();
    }
  }, 16);

  get item(): T {
    const item = this.store.getEntities().find(i => i.getId() === this.id);

    return item as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get transformStyle(): any {
    if (!this.item) {
      return {};
    }

    const t = this.item.getTranslate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformStyle: any = {};
    transformStyle[TransformConsts.TRANSFORM_X] = `${t.x}${t.unit}`;
    transformStyle[TransformConsts.TRANSFORM_Y] = `${t.y}${t.unit}`;

    return transformStyle;
  }

  get items(): Item[] {
    return this.store.getItems();
  }

  get hoverables(): Hoverable[] {
    return this.store.getHoverables();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onDrop(target: Hoverable): void {
    // onDrop must be implemented in child element
  }

  // eslint-disable-next-line
  private onItemDrag(movableEvent: any) {
    if (!this.item.isDragged()) {
      this.item.setDragged(true);
    }

    const position = MoveableDimensions.getTranslateFromDrag(movableEvent.transform);

    this.item.moveItem(position);
    this.hover();
  }

  // eslint-disable-next-line
  private onItemDragEnd() {
    this.onDragEnd();
  }

  private onHover() {
    this.currentHoverable = this.findCurrentHoverable();

    if (this.currentHoverable) {
      this.currentHoverable.onHover(this.item);
    }
  }

  private onHoverLeave() {
    this.hoverables.filter(h => !h.isInRange(this.item) || !h.accepts(this.item) || h.getId() != this.currentHoverable?.getId())
    .forEach(h => h.onHoverLeave(this.item));
  }

  private onDragEnd() {
    this.item.setDragged(false);
    if (this.currentHoverable) {
      this.onDrop(this.currentHoverable);
    }

    this.store.sort();
    this.currentHoverable = null;
    this.hoverables.forEach(h => h.onDragEnd(this.item));
  }

  private findCurrentHoverable(): Hoverable | undefined {
    const hoverables = this.hoverables
    .filter(h => h.getId() != this.id && h.isInRange(this.item))
    .filter(h => h.accepts(this.item));

    if (hoverables.length) {
      return hoverables[hoverables.length - 1];
    }
  }
}
