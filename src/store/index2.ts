import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
    count: 0,
    addCount(){
        this.count +=1
    },
    // record store
    ...recordStore,
    //tag store
    ...tagStore,
}
export default store