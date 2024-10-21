<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    BADGE_TYPES: {
      type: Array<{
        internal: string,
        readable: string,
        hidden: boolean,
      }>,
      required: true,
    },
    BADGE_STYLES: {
      type: Array<{
        internal: string,
        readable: string,
        hidden: boolean,
      }>,
      required: true,
    },
  });

  // Computed
  const numTypesShown = computed(() => {
    return props.BADGE_TYPES
      .map(type => !type.hidden ? 1 : 0)
      .reduce((acc: number, cur: number) => acc + cur, 0);
  });

  const numStylesShown = computed(() => {
    return props.BADGE_STYLES
      .map(type => !type.hidden ? 1 : 0)
      .reduce((acc: number, cur: number) => acc + cur, 0);
  });
</script>

<template>
  <div class="columns">
    <b-checkbox-button v-for="type in BADGE_TYPES"
      class="column is-2"
      :key="type.internal"
      v-model="type.hidden"
      :disabled="numTypesShown <= 1 && !type.hidden"
      ref="typeCheckboxBtn">
      {{ type.readable }}
    </b-checkbox-button>
  </div>

  <div class="columns">
    <b-checkbox-button v-for="style in BADGE_STYLES"
      class="column is-2"
      :key=style.internal
      v-model="style.hidden"
      :disabled="numStylesShown <= 1 && !style.hidden"
      ref="styleCheckboxBtn">
      {{ style.readable }}
    </b-checkbox-button>
  </div>
</template>

<style lang="scss">
.b-checkbox.checkbox.button {
  width: 100%;
}
</style>
