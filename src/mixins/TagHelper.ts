// Vue Class Component 中有 mixins 用法
// 第一步 先定义好
import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
    'tag name duplicated': '标签名重复了'
};

@Component
export class TagHelper extends Vue {
    createTag() {
        let name = window.prompt('请输入标签名');
        if (name === '') {
            return window.alert('标签名不能为空');
        }
        if (name !== null) {
            this.$store.commit('createTag', name);
            if (this.$store.state.createTagError) {
                return window.alert(map[this.$store.state.createTagError.message] || '未知错误');
            }
            window.alert('创建成功');
        }
    }
}
export default TagHelper
