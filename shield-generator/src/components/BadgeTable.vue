<template>
  <div class="table-container">
    <table id="badge-table" class="table is-bordered is-narrow is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th v-for="style in BADGE_STYLES"
              :key=style.internal
              v-show="!style.hidden">
            {{ style.readable }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in BADGE_TYPES"
            :key="type.internal"
            v-show="!type.hidden">
          <th>{{ type.readable }}</th>
          <td v-for="style in BADGE_STYLES"
              :key=style.internal
              v-show="!style.hidden">
            <BadgeCell
              :svgSrc="tableData[`${type.internal}/${style.internal}`]"
              :projectName="tableData.projectName"
              :projectId="tableData.projectId"
              :badgeType="type.internal"
              :badgeStyle="style.internal">
            </BadgeCell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BadgeCell from '@/components/BadgeCell.vue';

export default {
  name: 'BadgeTable',
  components: {
    BadgeCell
  },
  props: {
    tableData: Object,
    BADGE_TYPES: Array,
    BADGE_STYLES: Array
  }
};
</script>

<style>
#badge-table th {
  vertical-align: middle;
  text-align: center;
}

#badge-table td {
  vertical-align: middle;
  text-align: left;
}

#badge-table tr {
  height: 50px;
}
</style>