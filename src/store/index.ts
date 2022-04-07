import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';

Vue.use(Vuex) // 把 store 绑定 Vue.prototype.$store = store
const store =  new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
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
  }
})
export default store