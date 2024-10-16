<script setup lang="ts">
  import axios from 'axios';
  import isUrl from 'is-url';

  import Introduction from '@/components/IntroductionHeader.vue';
  import ProjectSearchBar from '@/components/ProjectSearchBar.vue';
  import ErrorBox from '@/components/ErrorBox.vue';
  import BadgeTableOptions from '@/components/BadgeTableOptions.vue';
  import BadgeTable from '@/components/BadgeTable.vue';

  import { BASE_URL, PROJECT_BASE_URL, BADGE_TYPES, BADGE_STYLES } from '@/constants.json';

  import { ref, type Ref } from 'vue';

  const currentError: Ref<string, string> = ref('');
  const apiData: Ref<{
    projectId: string,
    projectName: string,
    badges: object,
  }, {
    projectId: string,
    projectName: string,
    badges: object,
  }> = ref({
    projectId: '',
    projectName: '',
    badges: {},
  });
  const processing: Ref<boolean, boolean> = ref(false);

  const BADGE_TYPES_MAPPED = ref(
    BADGE_TYPES.map(type => ({
      ...type,
      hidden: false,
    }))
  );

  const BADGE_STYLES_MAPPED = ref(
    BADGE_STYLES.map(type => ({
      ...type,
      hidden: false,
    }))
  );

  async function updateBadgeTable(link: string) {
    // clear the error slate
    currentError.value = '';
    processing.value = true;

    try {
      // check that we have a proper link
      if (!isUrl(link) || !link.startsWith(PROJECT_BASE_URL) || link === PROJECT_BASE_URL)
        throw new Error(`Invalid link provided! The link should be in the form "${PROJECT_BASE_URL}/<project-id>"`);

      const projectId = link.split(PROJECT_BASE_URL)[1];
      const { data: badgeTableData } = await axios(`${BASE_URL}/get-badge-table?&id=${projectId}`);
      apiData.value = badgeTableData;
    } catch (err: unknown) {
      if (typeof err === "string") {
        currentError.value = err;
      } else if (err instanceof Error) {
        currentError.value = err.message;
      }
    } finally {
      processing.value = false;
    }
  }
</script>


<template>
  <div id="app">
    <Introduction></Introduction>

    <br>

    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <ProjectSearchBar :loading="processing" @request-table-update=updateBadgeTable></ProjectSearchBar>
        <BadgeTableOptions :BADGE_TYPES="BADGE_TYPES_MAPPED" :BADGE_STYLES="BADGE_STYLES_MAPPED"></BadgeTableOptions>

        <br>

        <ErrorBox :error="currentError" @reset-error="currentError = ''"></ErrorBox>
      </div>
    </div>

    <div class="columns">
      <div class="column is-10 is-offset-1">
        <BadgeTable :projectId="apiData?.projectId" :projectName="apiData?.projectName" :tableData="apiData?.badges" :BADGE_TYPES="BADGE_TYPES_MAPPED" :BADGE_STYLES="BADGE_STYLES_MAPPED"></BadgeTable>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
