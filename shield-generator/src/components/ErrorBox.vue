<template>
  <b-notification
    type="is-danger"
    :active="active"
    @close="$emit('reset-error')">
    <p>{{ error }}</p>
  </b-notification>
</template>

<script>
export default {
  name: 'ErrorBox',
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    active() {
      return !!this.error;
    }
  }
};
</script>