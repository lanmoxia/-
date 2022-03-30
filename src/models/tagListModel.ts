
// tagListModel 与 recordListModel 不同是的这里定义操作 data

const localStorageKeyName = 'tagList';
// 这里定义好类型
// 等号左边是输入类型 右边是输出类型
type tagListModel = {
    data: string[]
    fetch: () => string[]
    save: () => void
    create: (name: string) =>  'success' | 'duplicated' // 只能是这两个字符串 可以防止手贱写错会提示(联合类型)
}
// 定义好 tagListModel 类型 后边包括外部使用到就不用断言
const tagListModel: tagListModel = {
    data: [],
    fetch(){
        this.data =  JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data
    },
    save(){
        return window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name){
        // 使用成功和失败不方便看错误信息
        // 使用数字表示错误 时间久了容易记不住
        // 使用字符串会容易写错 这里用联合类型防止写错 会有提示
        if(this.data.indexOf(name) >= 0 ){return 'duplicated'}
        this.data.push(name)
        this.save()
        return 'success'
    }
};
export {tagListModel}
