import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
    // record store
    recordList : recordListModel.fetch(),
    createRecord : (record: RecordItem) =>{recordListModel.create(record)},

    //tag store
    tagList : tagListModel.fetch(),
    findTag(id: string){ // 这里不能使用箭头函数 this 会指向 window
        return this.tagList.filter(t => t.id === id)[0]
    },
    createTag : (name: string) => {
        const message = tagListModel.create(name)
        if(message === 'duplicated'){
            window.alert('标签名重复了')
        }else if(message === 'success'){
            window.alert('添加成功')
        }
    },
    removeTag : (id: string) =>{
        return tagListModel.remove(id); // 简化
    },
    updateTag : (id: string, name: string) => {
        return tagListModel.update(id, name)
    }
}
export default store