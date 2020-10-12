import {Component, Prop, Vue} from 'vue-property-decorator';
import Moveable from "vue-moveable";
import EntityStore from "@/domain/game/EntityStore";
import {EntityStates, TransformConsts, Translate} from "@/domain/game/GameTypes";
import MoveableDimensions from "@/domain/game/util/MoveableDimensions";
import Item from "@/domain/game/interface/Item";
import Hoverable from "@/domain/game/interface/Hoverable";
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

  protected item: T = this.store.getEntity(this.id) as T;

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

  protected triggerOnNoHoverable = false;

  get translate(): Translate | undefined {
    return this.item?.getTranslate();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get transformStyle(): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformStyle: any = {};

    const t = this.translate;
    if (t) {
      transformStyle[TransformConsts.TRANSFORM_X] = `${t.x}${t.unit}`;
      transformStyle[TransformConsts.TRANSFORM_Y] = `${t.y}${t.unit}`;
    }
    return transformStyle;
  }

  get hoverables(): Hoverable[] {
    return this.store.getHoverables();
  }

  get isMovingAnimate(): boolean {
    return this.item.isMovingAnimate();
  }

  get isNonePointerEvents(): boolean {
    return this.item.isNonePointerEvents();
  }

  get isDragged(): boolean {
    return this.item.isDragged();
  }

  get isMouseOver(): boolean {
    return this.item.isMouseOver();
  }

  protected getMouseOver(): boolean {
    return this.item.isMouseOver();
  }

  protected onMouseOver(): void {
    this.item.setState(EntityStates.IS_MOUSE_OVER, true);
  }

  protected onMouseOut(): void {
    this.item.setState(EntityStates.IS_MOUSE_OVER, false);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onDrop(target: Hoverable | undefined): void {
    // onDrop must be implemented in child element
  }

  protected onDropNoTarget(): void {
    this.onDrop(undefined);
  }

  // eslint-disable-next-line
  protected onItemDrag(movableEvent: any) {
    if (!this.item.isDragged()) {
      this.item.setDragged(true);
    }

    const position = MoveableDimensions.getTranslateFromDrag(movableEvent.transform);

    this.item.moveItem(position);
    this.hover();
  }

  // eslint-disable-next-line
  protected onItemDragEnd() {
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
    if (this.currentHoverable) {
      this.onDrop(this.currentHoverable);
      this.currentHoverable = null;
    } else if (this.triggerOnNoHoverable) {
      this.onDropNoTarget();
    }

    this.store.sort();
    this.hoverables.forEach(h => h.onDragEnd(this.item));
    setTimeout(() => this.item.setDragged(false), 0);
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
