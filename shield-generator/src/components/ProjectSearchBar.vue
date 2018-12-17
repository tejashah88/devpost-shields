<template>
  <b-field>
    <b-input
      placeholder="Enter your Devpost project link here..."
      icon="magnify"
      v-model.trim="devpostLink"
      expanded
      @keyup.native.enter="$emit('request-table-update', devpostLink)"
      :loading="loading">
    </b-input>
    <p class="control">
      <button
        @click="$emit('request-table-update', devpostLink)"
        class="button is-primary"
        :disabled="loading">Search</button>
    </p>
  </b-field>
</template>

<script>
export default {
  name: 'ProjectSearchBar',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      devpostLink: ''
    };
  }
};
</script>

<style lang="scss">
.b-checkbox.checkbox[disabled] {
  color: white;
  opacity: 0.7;
}
</style>