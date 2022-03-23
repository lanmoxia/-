<template>
<div>
  <Layout class-prefix="layout" >
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags/>
  </Layout>
</div>
</template>

<script lang="ts">
import NumberPad from '@/components/Ledger/NumberPad.vue';
import Types from '@/components/Ledger/Types.vue';
import Notes from '@/components/Ledger/Notes.vue';
import Tags from '@/components/Ledger/Tags.vue';
export default {
  name: 'Ledger',
  components: {Tags, Notes, Types, NumberPad}
};
</script>
<style lang="scss">
.layout-wrapper{
  //border: 10px solid red;
}
.layout-content{
  //border: 8px solid blue;
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
</style>