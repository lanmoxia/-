// JS 修改为 TS 文件 发现类型在其他文件内 我们就把公用类型设为全局的
// 不用引用直接使用 名字不重要 只要是 xxx.d.ts 就可以

// 这里是一个默认的全局的类型声明 TS 看到 d.ts 就认为是声明
// 由于 record 被占用 之前在ledger中是局部声明 这里全局定义就要改名字
type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型：object | string
    createdAt?: Date// 类 / 构造函数 比类型小
}
export default RecordItem