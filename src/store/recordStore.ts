import clone from '@/lib/clone';
const localStorageKeyName = 'recordList';

const recordStore =  {
    recordList: [] as RecordItem[],
    // 外边需要触发就把 fetch 暴漏出去
    fetchRecords(){
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList
    },
    // 外边需要触发就把 save 暴漏出去
    saveRecords(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList))
    },
    createRecord(record: RecordItem){
        // 深拷贝
        const record2: RecordItem = clone(record)
        // 生成日期
        record2.createdAt = new Date().toISOString()
        // 不使用深拷贝 | 这里是引用的地址 每次数据更新了都会覆盖之前的
        //this.recordList && this.recordList.push(record2)
        this.recordList?.push(record2) // 可选链语法
        recordStore.saveRecords()
    }
}
// 函数在定义中能使用 现在 fetchRecord 是 recordStore 对象的一个 key
// 对象在定义中是不能使用的 所以要放到这里
recordStore.fetchRecords()

export default recordStore