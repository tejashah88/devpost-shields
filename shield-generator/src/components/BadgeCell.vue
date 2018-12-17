<template>
  <div class="badge-cell">
    <span style="line-height: 0px" v-html="svgSrc"/>
    <div style="padding-left: 10px"></div>
    <b-tooltip
      :label="copyStatus"
      type="is-dark"
      position="is-top"
      :active="tooltipActive"
      animated>
      <button
        v-show="!hasError"
        v-clipboard:copy="composedMarkdown"
        v-clipboard:success="onCopySuccess"
        v-clipboard:error="onCopyError"
        class="button is-small"
        @mouseleave="hideTooltip">
        <span class="icon">
          <i class="mdi mdi-24px mdi-clipboard-text"></i>
        </span>
      </button>
    </b-tooltip>
  </div>
</template>

<script>
import { BASE_URL, PROJECT_BASE_URL } from '@/constants.json';

export default {
  name: 'BadgeCell',
  props: {
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
  },
  data() {
    return {
      copyStatus: 'Unknown',
      tooltipActive: false,
      timeoutObj: null
    };
  },
  computed: {
    hasError() {
      return this.svgSrc.startsWith('<p>') || (this.projectName && this.projectId && this.badgeType && this.badgeStyle);
    },
    composedMarkdown() {
      const badgeParams = `name=${this.projectName}&id=${this.projectId}&type=${this.badgeType}&style=${this.badgeStyle}`;
      const badgeImgUrl = `${BASE_URL}/get-badge?${badgeParams}`;
      const badgeLink = PROJECT_BASE_URL + this.projectId;
      const badgeAltText = `Devpost | ${this.projectName}`;
      return `[![${badgeAltText}](${badgeImgUrl})](${badgeLink})`;
    }
  },
  methods: {
    onCopySuccess() {
      this.copyStatus = 'Copied!';
      this.showTooltipTemporarily(3000);
    },
    onCopyError() {
      this.copyStatus = 'Failed to copy!';
      this.showTooltipTemporarily(3000);
    },
    showTooltipTemporarily(timeout) {
      this.tooltipActive = true;
      this.timeoutObj = setTimeout(() => this.tooltipActive = false, timeout);
    },
    hideTooltip() {
      this.tooltipActive = false;
      if (this.timeoutObj)
        clearTimeout(this.timeoutObj);
    }
  }
};
</script>

<style lang="scss">
.badge-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>