<template>
<div>
  <Layout class-prefix="layout" >
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags :data-source="tags"/>
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
  components: {Tags, Notes, Types, NumberPad},
  data(){
    return{
      tags:['衣','食','住','行','股票']
    }
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>