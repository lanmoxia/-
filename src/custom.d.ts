// 这里是一个默认的全局的类型声明 TS 看到 d.ts 就认为是声明

type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型：object | string
    createdAt?: string// JSON 不支持 Date 所以这里类型要变更下
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
type RootState ={
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag,  // 这里写好类型
}

