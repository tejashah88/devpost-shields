<script setup lang="ts">
  import { computed, type ComputedRef } from 'vue';
  const props = defineProps({
    error: {
      type: String,
      default: '',
    }
  });

  // Computed
  const active: ComputedRef<boolean> = computed(() => {
    return !!props.error;
  });

  // Emits
  const emit = defineEmits(['reset-error']);
</script>

<template>
  <b-notification
    type="is-danger"
    v-model="active"
    @close="emit('reset-error')">
    <p>{{ props.error }}</p>
  </b-notification>
</template>
