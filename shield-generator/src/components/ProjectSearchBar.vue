<script setup lang="ts">
import { ref, type Ref } from 'vue';
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    }
  });

  const devpostLink: Ref<string, string> = ref('');

  // Emits
  const emit = defineEmits(['request-table-update']);
</script>

<template>
  <b-field>
    <b-input
      placeholder="Enter your Devpost project link here..."
      icon="magnify"
      v-model.trim="devpostLink"
      expanded
      @keyup.enter="emit('request-table-update', devpostLink)"
      :loading="props.loading">
    </b-input>
    <p class="control">
      <button
        @click="emit('request-table-update', devpostLink)"
        class="button is-primary"
        :disabled="props.loading">Search</button>
    </p>
  </b-field>
</template>

<style lang="scss" scoped>
.b-checkbox.checkbox[disabled] {
  color: white;
  opacity: 0.7;
}
</style>
