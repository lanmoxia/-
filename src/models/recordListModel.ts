import RecordItem from '@/custom';
import clone from '@/lib/clone';
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],
    create(record: RecordItem){
        // 深拷贝
        const record2: RecordItem = clone(record)
        // 生成日期
        record2.createdAt = new Date()
        // 不使用深拷贝 | 这里是引用的地址 每次数据更新了都会覆盖之前的
        this.data.push(record2)
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
