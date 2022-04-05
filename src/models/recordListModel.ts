import RecordItem from '@/custom';
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    clone(data:RecordItem | RecordItem[]){ // 可以是一个 也可以是一个数组
        // 深拷贝
        return JSON.parse(JSON.stringify(data))
    },
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data
    },
    save(){
        // 改为ts后 (data:Record[]) Ledger 中的 Record 是局部的 这里用不了
        // 我们需要全局的 xxx.d.ts
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
export default recordListModel
