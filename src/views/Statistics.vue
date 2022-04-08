<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      type: {{type}}
      <br/>
      interval: {{interval}}
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constant/intervalList';
import recordTypeList from '@/constant/recordTypeList';
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue{
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
  /* deep 语法 两个 deep 可以合并 */
  ::v-deep {
    .type-tabs-item {
      background: white;
      &.selected {
        background: #C4C4C4;

        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item{
      height: 48px;
    }
  }
</style>