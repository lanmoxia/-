import createId from '@/lib/careteId';
const localStorageKeyName = 'tagList';
const tagStore = {
    tagList : [] as Tag[],
    fetchTags(){
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList;
    },
    findTag(id: string){ // 这里不能使用箭头函数 this 会指向 window
        return this.tagList.filter(t => t.id === id)[0]
    },
    createTag(name: string){
        // 创建一个 tag 如果重复
        const names = this.tagList.map(item =>item.name)
        if(names.indexOf(name) >= 0 ){
            window.alert('标签名重复了')
            return 'duplicated'
        }
        // 如果没有重复 创建一个 id 然后把 id 和 name 放到 tagList 中保存
        const id = createId().toString()
        this.tagList.push({id, name:name}) //{id: id, name: name}
        this.saveTags()
        window.alert('添加成功')
        return 'success'
    },
    removeTag(id: string){
        let index = -1;
        for(let i=0; i<this.tagList.length;i++){
            if(this.tagList[i].id === id){
                index = i;
                break;
            }
        }
        this.tagList.splice(index, 1);
        this.saveTags();
        return true
    },
    updateTag(id: string, name: string){
        const idList = this.tagList.map(item => item.id)
        if(idList.indexOf(id) >=0){
            const names = this.tagList.map(item => item.name)
            if(names.indexOf(name) >= 0){
                return 'duplicated';
            }else{
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                //id 和 name 最好都更改
                // 3 更改为 333 , id:3 name:333 再添加 3  id:3 就会重复
                //tag.id = tag.name = name // 简写
                this.saveTags()
                return 'success';
            }
        }else{
            return 'not fount';
        }
    },
    saveTags(){
        return window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    }
}
tagStore.fetchTags()
export default tagStore