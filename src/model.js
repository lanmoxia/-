const localStorageKeyName = 'recordList'
const model = {
    fetch(){
         return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')

    },
    seve(data){
        return window.localStorage.setItem(localStorageKeyName, JSON.stringify(data))
    }
}
// 具名导出 const model = require('@/model.js').model 或者使用析构：const {model} = require('@/model.js')
export {model}
// 默认导出 const model = require('@/model.js').default
//export default model
