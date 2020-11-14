<template>
  <div ref="container"
       class="h-full w-full
              bg-gray-300">
    <div class="absolute
                  top-0 bottom-0 left-0 right-0
                  flex items-center justify-center">
      <div :id="gameInstanceId"
           class="relative
                    flex flex-col"
           :style="[{width: `${dimensions.width}px`},
                      {height: `${dimensions.height}px`},
                      {padding: `${paddingY} ${paddingX} ${paddingY} ${paddingX}`},
                      {'font-size': pixelSize}]">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Ratio, {RatioConstants} from "@/domain/game/util/Ratio";
import {DimensionsPx} from "@/domain/game/GameTypes";
import EntityStore from "@/domain/game/EntityStore";
import RelativeFontSize from "@/domain/game/util/RelativeFontSize";
import debounce from "lodash.debounce";
import GameStateProvider from "@/domain/game/util/GameStateProvider";

@Component
export default class RatioContainer extends Vue {

  @Prop({type: String, required: true})
  private readonly gameInstanceId!: string;

  @Prop({required: true})
  private readonly ratio!: RatioConstants;

  private store: EntityStore = EntityStore.getInstance(this.gameInstanceId);

  private height = 0;

  private width = 0;

  private observer!: MutationObserver;

  created() {
    // temporary code to spawn test items
    setTimeout(() => {
      GameStateProvider.createWelcomeState(this.gameInstanceId);
    }, 300);
  }

  mounted() {
    /* eslint-disable */
    const resizeRatioContainer = debounce(wrapper => {
      this.setDimensions(wrapper.contentRect);
    }, 200);

    // @ts-ignore
    this.observer = new ResizeObserver(singletonArray => {
      singletonArray.forEach(resizeRatioContainer);
    });

    // @ts-ignore
    this.observer.observe(this.$refs.container);
    /* eslint-enable */
  }

  beforeDestroy() {
    EntityStore.removeInstance(this.gameInstanceId);
  }

  get pixelSize(): string {
    return `${RelativeFontSize.getPixelSize(this.width)}px`;
  }

  get paddingX(): string {
    // return `${RelativeFontSize.DEFAULT.valueOf() * this.width / 15}px`;
    return "0px";
  }

  get paddingY(): string {
    return `${RelativeFontSize.DEFAULT.valueOf() * this.width / 45}px`;
  }

  get dimensions(): DimensionsPx {
    return {
      height: this.height,
      width: this.width
    };
  }

  private setDimensions(rect: DOMRect): void {
    if (rect && rect.height && rect.width) {
      const dimensionsPx = Ratio.trimIntoRatio(rect.height, rect.width, this.ratio);

      this.height = dimensionsPx.height;
      this.width = dimensionsPx.width;
    }
  }
}
</script>

<style>
.moveable-line {
  background: rgba(68, 170, 255, 0) !important;
  display: none;
  pointer-events: none;
}

.card-face-down {
  transform: rotateY(180deg);
}

.card-flip-container {
  transform-style: preserve-3d;
}

.card-flip-perspective {
  perspective: 700px;
}
</style>
