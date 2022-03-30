
// tagListModel 与 recordListModel 不同是的这里定义操作 data

const localStorageKeyName = 'tagList';
// 这里定义好类型
// 等号左边是输入类型 右边是输出类型
type tagListModel = {
    data: string[]
    fetch: () => string[]
    save: () => void
    create: (name: string) => string
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
    create(name: string){
        this.data.push(name)
        this.save()
        return name
    }
};
export {tagListModel}
