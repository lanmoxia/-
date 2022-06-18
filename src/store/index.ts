import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/careteId';
import router from '@/router';

Vue.use(Vuex) // 把 store 绑定 Vue.prototype.$store = store

const store =  new Vuex.Store({
  state: {
    createTagError: null,
    recordList: [],
    tagList: [],
    currentTag: undefined, // ① 第一步先定义当前 currentTag 默认 undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string){
      state.currentTag =  state.tagList.filter(t => t.id === id)[0]
    },
    updateTag(state, payload:{id: string, name: string}){// 这里值接受除了 state 的第二个参数 只能用对象 对象名一般是 payload
      const {id,name} = payload
      const idList = state.tagList.map(item => item.id)
      if(idList.indexOf(id) >=0){
        const names = state.tagList.map(item => item.name)
        if(names.indexOf(name) >= 0){
          window.alert('标签名重复了')
        }else{
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          //id 和 name 最好都更改
          // 3 更改为 333 , id:3 name:333 再添加 3  id:3 就会重复
          //tag.id = tag.name = name // 简写
          store.commit('saveTags')
        }
      }
    },
    removeTag(state,id: string){
      let index = -1;
      for(let i=0; i<state.tagList.length;i++){
        if(state.tagList[i].id === id){
          index = i;
          break;
        }
      }
      if(index >= 0){
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back()
      }else{
        window.alert('删除失败')
      }
    },
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem){
      // 深拷贝
      const record2 = clone(record)
      // 生成日期
      record2.createdAt = record2.createdAt || new Date().toISOString()
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
      if(!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣')
        store.commit('createTag', '食')
        store.commit('createTag', '住')
        store.commit('createTag', '行')
      }
    },
    createTag(state, name: string){
      state.createTagError = null
      // 创建一个 tag 如果重复
      const names = state.tagList.map(item =>item.name)
      if(names.indexOf(name) >= 0 ){
        state.createTagError = new Error('tag name duplicated');
        return
      }
      // 如果没有重复 创建一个 id 然后把 id 和 name 放到 tagList 中保存
      const id = createId().toString()
      state.tagList.push({id, name:name}) //{id: id, name: name}
      store.commit('saveTags')
    },
    saveTags(state){
      return window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  }
})
export default store