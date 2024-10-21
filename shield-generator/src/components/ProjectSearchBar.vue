<script setup lang="ts">
import { ref, type Ref } from 'vue';
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    }
  });

  const projectLink: Ref<string, string> = ref('');
  const projectName: Ref<string, string> = ref('');

  // Emits
  const emit = defineEmits(['request-table-update']);
</script>

<template>
  <div class="columns">
    <div class="column is-4">
      <b-field label="Project Name">
        <b-input
          placeholder="Enter your Devpost project name here..."
          icon=""
          v-model.trim="projectName"
          expanded
          :loading="props.loading">
        </b-input>
      </b-field>
    </div>

    <div class="column is-6">
      <b-field label="Project Link">
        <b-input
          placeholder="Enter your Devpost project link here..."
          icon=""
          v-model.trim="projectLink"
          expanded
          :loading="props.loading">
        </b-input>
      </b-field>
    </div>

    <div class="column is-2" style="align-self: end; text-align: center">
      <b-button
        type="is-primary"
        size="is-medium"
        icon-left="magnify"
        @click="emit('request-table-update', projectName, projectLink)"
        :disabled="props.loading || projectName.length === 0 || projectLink.length === 0"
      >Search</b-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.b-checkbox.checkbox[disabled] {
  color: white;
  opacity: 0.7;
}

.button {
  width: 100%;
}
</style>
