// 这里是一个默认的全局的类型声明 TS 看到 d.ts 就认为是声明

type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型：object | string
    createdAt?: Date// 类 / 构造函数 比类型小
}

type Tag = {
    id: string
    name: string
}

// 这里定义好类型
// 等号左边是输入类型 右边是输出类型
type tagListModel = {
    data: Tag[] // 这里的 data 是一个 Tag 对象的数组
    create: (name: string) =>  'success' | 'duplicated' // 只能是这两个字符串 可以防止手贱写错会提示(联合类型)
    fetch: () => Tag[] // // 这里的 data 是一个 Tag 对象的数组
    update: (id: string , name: string) => 'success' | 'not fount' | 'duplicated'
    remove: (id:string) => boolean
    save: () => void
}

// 消除 main.js 中 tagList 类型问题
interface Window {
    // tagType
    tagList: Tag[]
    findTag: (id: string) => Tag
    createTag: (name: string) => void
    removeTag: (id: string) => boolean
    //updateTag: (id: string, name: string) => 'success' | 'not fount' | 'duplicated'
    // 这里跟上边 update 返回类型一样 可以这样简写
    updateTag: TaglistModel['update']
    // recordType
    recordList: RecordItem[]
    createRecord: (record) => void
}
