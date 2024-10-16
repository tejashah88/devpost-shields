<script setup lang="ts">
  import BadgeCell from '@/components/BadgeCell.vue';

  const props = defineProps({
    projectId: {
      type: String,
      required: false,
    },
    projectName: {
      type: String,
      required: false,
    },
    tableData: {
      type: Object,
      required: true,
    },
    BADGE_TYPES: {
      type: Array<{
        internal: string,
        readable: string,
        hidden: boolean,
      }>,
      required: true,
    },
    BADGE_STYLES: {
      type: Array<{
        internal: string,
        readable: string,
        hidden: boolean,
      }>,
      required: true,
    },
  });
</script>

<template>
  <div class="table-container">
    <table id="badge-table" class="table is-bordered is-narrow is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th v-for="style in props.BADGE_STYLES"
              :key=style.internal
              v-show="!style.hidden">
            {{ style.readable }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in props.BADGE_TYPES"
            :key="type.internal"
            v-show="!type.hidden">
          <th>{{ type.readable }}</th>
          <td v-for="style in props.BADGE_STYLES"
              :key=style.internal
              v-show="!style.hidden">
            <BadgeCell
              :svgSrc="props.tableData[`${type.internal}/${style.internal}`]"
              :projectName="props.projectName"
              :projectId="props.projectId"
              :badgeType="type.internal"
              :badgeStyle="style.internal">
            </BadgeCell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
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
