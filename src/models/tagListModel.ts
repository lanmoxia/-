
// tagListModel 与 recordListModel 不同是的这里定义操作 data

const localStorageKeyName = 'tagList';

type Tag = {
    id: string
    name: string
}
// 这里定义好类型
// 等号左边是输入类型 右边是输出类型
type tagListModel = {
    data: Tag[] // 这里的 data 是一个 Tag 对象的数组
    fetch: () => Tag[] // // 这里的 data 是一个 Tag 对象的数组
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
        // 这里的 this.data相当于 this.data = [{id:'1',name:'1'},{…}]
        // 所以搜索里边name的时候就要搜索里边所有的name
        const names = this.data.map(item =>item.name)
        if(names.indexOf(name) >= 0 ){return 'duplicated'}
        this.data.push({id:name, name:name}) // 这里 id 和 name 暂时重复 后边使用 ID生成器
        this.save()
        return 'success'
    }
};
export {tagListModel}
