<template>
    <div class="option">
        <vine-header></vine-header>
        <div class="option-main">
            <span class="option-val">请提出您对本站的建议：</span>
            <textarea  class="option-input" v-model="option" placeholder="请输入您的建议"></textarea>
            <span class="option-btn" @click="submitEvent">留言</span>
        </div>
        <vine-footer></vine-footer>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Header from './../components/header.vue';
import Footer from './../components/footer.vue';
import Common from './../service/common';
import { Message } from 'element-ui';
@Component({
    components: {
        'vine-header': Header,
        'vine-footer': Footer,
    },
})
export default class Option extends Vue {
    private option: string = '';
    private async submitEvent() {
        await Common.setOptions({
            option: this.option,
        });
        this.option = '';
        Message({
            type: 'success',
            message: '谢谢您的建议，本站会尽快整改。',
        });
    }
}
</script>
<style lang="less" scoped>
.option{
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0 0px 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.option-main{
    width: 600px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
}
.option-val{
    font-size: 20px;
    color: #333;
}
.option-input{
    margin-top: 20px;
    width: 100%;
    height: 400px;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    resize: none;
    padding: 10px;
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
}
.option-btn{
    width: 100px;
    height: 40px;
    cursor: pointer;
    background: #d32f2f;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    line-height: 40px;
}
</style>

