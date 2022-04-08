function clone<X>(data: X):X{ // data 什么类型 返回值就是什么类型 第一个 X 是定义
    return JSON.parse(JSON.stringify(data))
}
export default clone