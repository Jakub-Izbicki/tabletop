import {Component, Prop, Vue} from 'vue-property-decorator';
import EntityStore from "@/domain/game/EntityStore";
import Hoverable from "@/domain/game/interface/Hoverable";

@Component
export default class HoverableComponent<T extends Hoverable> extends Vue {

  @Prop({type: String, required: true})
  protected readonly id!: string;

  @Prop({type: String, required: true})
  protected readonly gameInstanceId!: string;

  protected store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

  protected hoverable: T = this.store.getEntity(this.id) as T;

  mounted() {
    this.registerHoverableIfNotPresent()
  }

  get isHover(): boolean {
    return this.hoverable.isHover();
  }

  protected getHoverableToRegister(): T {
    throw "Must be implemented in ancestor!";
  }

  private registerHoverableIfNotPresent(): void {
    if (!this.isPresentInStore()) {
      this.store.addHoverable(this.getHoverableToRegister());
      this.hoverable = this.store.getEntity(this.id) as T;
    }
  }

  private isPresentInStore() {
    return this.store.getEntity(this.id);
  }
}
