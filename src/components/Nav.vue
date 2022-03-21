<template>
<div>
  <div>
    <router-link to="/ledger">
      <Icons name="ledger"/>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <Icons name="labels"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <Icons name="statistics"/>
      统计
    </router-link>
  </div>
</div>
</template>

<script lang="ts">
export default {
name: "Nav"
}
</script>

<style lang="scss" scoped>

</style>