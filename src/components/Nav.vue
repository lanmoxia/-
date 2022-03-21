<template>
<div>
  <div>
    <router-link to="/ledger">
      <svg>
        <use xlink:href="#ledger"/>
      </svg>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <svg>
        <use xlink:href="#labels"/>
      </svg>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <svg>
        <use xlink:href="#statistics"/>
      </svg>
      统计
    </router-link>
  </div>
</div>
</template>

<script lang="ts">
import x from '@/assets/icons/ledger.svg'
import y from '@/assets/icons/labels.svg'
import z from '@/assets/icons/statistics.svg'
console.log(x,y,z);
export default {
name: "Nav"
}
</script>

<style lang="scss" scoped>

</style>