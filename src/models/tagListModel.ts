
// tagListModel 与 recordListModel 不同是的这里定义操作 data

import createId from '@/lib/careteId';

const localStorageKeyName = 'tagList';

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
// 定义好 tagListModel 类型 后边包括外部使用到就不用断言
const tagListModel: tagListModel = {
    data: [],
    create(name: string){
        // 这里的 this.data相当于 this.data = [{id:'1',name:'1'},{…}]
        // 所以搜索里边name的时候就要搜索里边所有的name
        const names = this.data.map(item =>item.name)
        if(names.indexOf(name) >= 0 ){return 'duplicated'}
        const id = createId().toString()
        this.data.push({id, name:name}) //{id: id, name: name}
        this.save()
        return 'success'
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    update(id: string, name: string) {
        const idList = this.data.map(item => item.id)
        if(idList.indexOf(id) >=0){
            const names = this.data.map(item => item.name)
            if(names.indexOf(name) >= 0){
                return 'duplicated';
            }else{
                const tag = this.data.filter(item => item.id === id)[0];
                tag.name = name;
                //id 和 name 最好都更改
                // 3 更改为 333 , id:3 name:333 再添加 3  id:3 就会重复
                //tag.id = tag.name = name // 简写
                this.save()
                return 'success';
            }
        }else{
            return 'not fount';
        }
    },
    remove(id: string){
      let index = -1;
      for(let i=0; i<this.data.length;i++){
          if(this.data[i].id === id){
              index = i;
              break;
          }
      }
      this.data.splice(index, 1);
      this.save();
      return true
    },
    save(){
        return window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
export default tagListModel
