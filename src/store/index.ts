import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/careteId';

Vue.use(Vuex) // 把 store 绑定 Vue.prototype.$store = store
type RootState ={
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
}
const store =  new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string){
      state.currentTag =  state.tagList.filter(t => t.id === id)[0]
    },
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record){
      // 深拷贝
      const record2: RecordItem = clone(record)
      // 生成日期
      record2.createdAt = new Date()
      // 不使用深拷贝 | 这里是引用的地址 每次数据更新了都会覆盖之前的
      //this.recordList && this.recordList.push(record2)
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name: string){
      // 创建一个 tag 如果重复
      const names = state.tagList.map(item =>item.name)
      if(names.indexOf(name) >= 0 ){
        window.alert('标签名重复了')
      }
      // 如果没有重复 创建一个 id 然后把 id 和 name 放到 tagList 中保存
      const id = createId().toString()
      state.tagList.push({id, name:name}) //{id: id, name: name}
      store.commit('saveTags')
      window.alert('添加成功')
    },
    saveTags(state){
      return window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  }
})
export default store