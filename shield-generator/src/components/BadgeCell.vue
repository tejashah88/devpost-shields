<script setup lang="ts">
  import { useClipboard } from '@vueuse/core';
  import { ref, computed, type Ref } from 'vue';
  import { BASE_URL, PROJECT_BASE_URL } from '@/constants.json';

  // Input Properties
  const props = defineProps({
    projectName: {
      type: String,
      default: ''
    },
    projectId: {
      type: String,
      default: ''
    },
    badgeType: {
      type: String,
      default: ''
    },
    badgeStyle: {
      type: String,
      default: ''
    },
    svgSrc: {
      type: String,
      default: '<p>Unknown</p>'
    }
  });

  // Data
  const copyStatus: Ref<string, string> = ref('Unknown');
  const tooltipActive: Ref<boolean, boolean> = ref(false);
  const timeoutObj: Ref<ReturnType<typeof setTimeout> | null, ReturnType<typeof setTimeout> | null> = ref(null);

  // Computed
  const hasError = computed(() => {
    return props.svgSrc.startsWith('<p>') || !(props.projectName && props.projectId && props.badgeType && props.badgeStyle);
  });

  const composedMarkdown = computed(() => {
    const badgeParams = `name=${encodeURIComponent(props.projectName)}&id=${props.projectId}&type=${props.badgeType}&style=${props.badgeStyle}`;
    const badgeImgUrl = `${BASE_URL}/get-badge?${badgeParams}`;
    const badgeLink = PROJECT_BASE_URL + props.projectId;
    const badgeAltText = `Devpost | ${props.projectName}`;
    return `[![${badgeAltText}](${badgeImgUrl})](${badgeLink})`;
  });

  const { /* text,  */copy, /* copied, isSupported */ } = useClipboard({ source: composedMarkdown });


  // Methods
  async function onCopyRequest() {
    await copy(composedMarkdown.value);
    copyStatus.value = 'Copied!';
    showTooltipTemporarily(3000);
  }

  function showTooltipTemporarily(timeout: number) {
    tooltipActive.value = true;
    timeoutObj.value = setTimeout(() => {
      tooltipActive.value = false;
      timeoutObj.value = null;
    }, timeout);
  }

  function hideTooltip() {
    tooltipActive.value = false;
    if (timeoutObj.value) {
      clearTimeout(timeoutObj.value);
      timeoutObj.value = null;
    }
  }
</script>

<template>
  <div class="badge-cell">
    <span style="line-height: 0px" v-html="svgSrc"/>
    <div style="padding-left: 10px"></div>
    <b-tooltip
      :label="copyStatus"
      type="is-dark"
      position="is-top"
      :active="tooltipActive"
      animated
    >
      <b-button
        class="button is-small"
        :disabled="hasError"
        @click="onCopyRequest()"
        @mouseleave="hideTooltip"
      >
        <span class="icon">
          <i class="mdi mdi-24px mdi-clipboard-text"></i>
        </span>
      </b-button>
    </b-tooltip>
  </div>
</template>


<style lang="scss" scoped>
.badge-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
