// 这里是一个默认的全局的类型声明 TS 看到 d.ts 就认为是声明
type Tag = {
    id: string
    name: string
}

type RecordItem = {
    tags: Tag[]
    notes: string
    type: string
    amount: number // 数据类型：object | string
    createdAt?: string// JSON 不支持 Date 所以这里类型要变更下
}

type RootState ={
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag,  // 这里写好类型
}

