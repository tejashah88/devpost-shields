<template>
  <div id="app">
    <Introduction></Introduction>

    <br>

    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <ProjectSearchBar :loading="processing" @request-table-update=updateBadgeTable></ProjectSearchBar>

        <BadgeTableOptions :BADGE_TYPES="BADGE_TYPES" :BADGE_STYLES="BADGE_STYLES"></BadgeTableOptions>

        <br>

        <ErrorBox :error="currentError" @reset-error="currentError = ''"></ErrorBox>
      </div>
    </div>

    <div class="columns">
      <div class="column is-10 is-offset-1">
        <BadgeTable :tableData="apiData" :BADGE_TYPES="BADGE_TYPES" :BADGE_STYLES="BADGE_STYLES"></BadgeTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import isUrl from 'is-url';
import getHTMLTitle from 'get-html-title';

import Introduction from '@/components/Introduction.vue';
import ProjectSearchBar from '@/components/ProjectSearchBar.vue';
import ErrorBox from '@/components/ErrorBox.vue';
import BadgeTableOptions from '@/components/BadgeTableOptions.vue';
import BadgeTable from '@/components/BadgeTable.vue';

import { BASE_URL, PROJECT_BASE_URL, BADGE_TYPES, BADGE_STYLES } from '@/constants.json';

const getDevpostTitle = content => getHTMLTitle(content).split('|')[0].trim();

export default {
  name: 'app',
  components: {
    Introduction,
    ProjectSearchBar,
    ErrorBox,
    BadgeTableOptions,
    BadgeTable
  },
  data() {
    return {
      currentError: '',
      apiData: {},
      processing: false,
      'BADGE_TYPES': BADGE_TYPES.map(type => {
        type.hidden = false;
        return type;
      }),
      'BADGE_STYLES': BADGE_STYLES.map(type => {
        type.hidden = false;
        return type;
      })
    };
  },
  methods: {
    async updateBadgeTable(link) {
      // clear the error slate
      this.currentError = '';
      this.processing = true;

      try {
        // check that we have a proper link
        if (!isUrl(link) || !link.startsWith(PROJECT_BASE_URL) || link === PROJECT_BASE_URL)
          throw new Error(`Invalid link provided! The link should be in the form "${PROJECT_BASE_URL}/<project-id>"`);

        // Test if it's a valid projecct link and fetch the project name...
        // We can't retrieve from Devpost directly due to CORS only allowing same origin policy
        // so we use the AllOrigins to fetch the page for us
        const finalLink = `https://api.allorigins.win/get?url=${link}`;
        let projectName, projectId;

        const { data: devpostPage } = await axios(finalLink);
        // project doesn't exist
        if (devpostPage.status.http_code >= 400)
          throw new Error("The project associated with the link does not exist! Make sure you've copied its link properly.");
        else {
          projectName = getDevpostTitle(devpostPage.contents);
          // forbidden access to project
          if (projectName === 'Devpost - The home for hackathons')
            throw new Error("The project associated with the link is restricted! Make sure you've publisly copied its link properly.");
          else {
            // we got a valid project!
            projectId = link.split(PROJECT_BASE_URL)[1];
            const { data: badgeTableData } = await axios(`${BASE_URL}/get-badge-table?name=${projectName}&id=${projectId}`);
            this.apiData = badgeTableData;
            this.apiData.projectName = projectName;
            this.apiData.projectId = projectId;
          }
        }
      } catch (err) {
        this.currentError = err.message;
      } finally {
        this.processing = false;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>