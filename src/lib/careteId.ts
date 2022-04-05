// ID 从 localStorage 中获取，最大值之后 没有就第 0 个开始
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;
// ID 自增
 function createId(){
    id++;
    window.localStorage.setItem('_idMax', id.toString())
     return id;
 }
 export default createId