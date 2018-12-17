<template>
  <section>
    <b-field>
      <b-checkbox-button
        v-for="type in BADGE_TYPES"
        :key="type.internal"
        v-model="type.hidden"
        :disabled="numTypesShown <= 1 && !type.hidden"
        style="width: 100%"
        ref="typeCheckboxBtn">
        {{ type.readable }}
      </b-checkbox-button>
    </b-field>

    <b-field>
      <b-checkbox-button
        v-for="style in BADGE_STYLES"
        :key=style.internal
        v-model="style.hidden"
        :disabled="numStylesShown <= 1 && !style.hidden"
        style="width: 100%"
        ref="styleCheckboxBtn">
        {{ style.readable }}
      </b-checkbox-button>
    </b-field>
  </section>
</template>

<script>
export default {
  name: 'BadgeTableOptions',
  props: ['BADGE_TYPES', 'BADGE_STYLES'],
  computed: {
    numTypesShown() {
      return this.BADGE_TYPES.map(type => !type.hidden ? 1 : 0).reduce((acc, cur) => acc + cur, 0);
    },
    numStylesShown() {
      return this.BADGE_STYLES.map(type => !type.hidden ? 1 : 0).reduce((acc, cur) => acc + cur, 0);
    }
  }
};
</script>

<style lang="scss">
.b-checkbox.checkbox.button {
  width: 100%;
}
</style>