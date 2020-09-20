import {Component, Prop, Vue} from 'vue-property-decorator';
import EntityStore from "@/domain/game/item/EntityStore";
import Hoverable from "@/domain/game/hoverable/Hoverable";

@Component
export default class HoverableComponent<T extends Hoverable> extends Vue {

  @Prop({type: String, required: true})
  protected readonly id!: string;

  @Prop({type: String, required: true})
  protected readonly gameInstanceId!: string;

  protected store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

  mounted() {
    this.registerHoverableIfNotPresent()
  }

  get hoverable(): T {
    const hoverable = this.store.getHoverables()
    .find(h => h.getId() === this.id);

    return hoverable as T;
  }

  get isHover(): boolean {
    return this.hoverable.isHover();
  }

  protected getHoverableToRegister(): T {
    throw "Must be implemented in ancestor!";
  }

  private registerHoverableIfNotPresent(): void {
    if (this.store.getEntities().every(e => e.getId() != this.id)) {
      this.store.addHoverable(this.getHoverableToRegister());
    }
  }
}
