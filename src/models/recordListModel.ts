import {RecordItem} from '@/custom';
const localStorageKeyName = 'recordList';
const recordListModel = {
    clone(data:RecordItem | RecordItem[]){ // 可以是一个 也可以是一个数组
        // 深拷贝
        return JSON.parse(JSON.stringify(data))
    },
    fetch(){
        // 通过赋值x发现返回值类型是 any 正常应该是 RecordItem[]
        // 所以这里要断言 不然所有引用的都要再次强制类型 as RecordItem[]
        //const x: JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        //return x
         return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
    save(data:RecordItem[]){
        // 改为ts后 (data:Record[]) Ledger 中的 Record 是局部的 这里用不了
        // 我们需要全局的 xxx.d.ts
        return window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};
export {recordListModel}
