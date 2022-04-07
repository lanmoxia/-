// Vue Class Component 中有 mixins 用法
// 第一步 先定义好
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class TagHelper extends Vue {
    createTag(){
        const name = window.prompt('请输入标签名');
        if (!name) {return window.alert('标签名不能为空')}
        this.$store.commit('createTag',(name))
    }
}
export default TagHelper