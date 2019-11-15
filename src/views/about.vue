<template>
    <div class="about">
        <vine-header></vine-header>
        <div class="about-main">
            <div class="about-content">
                <span class="about-val">本网站所有内容都是精心挑选的高分小说！！！</span>
                <span class="about-val">所有章节内容都是手动转载，并非采集而来，所以更新可能不是特别及时，请见谅。</span>
                <span class="about-val">如有特别想看的小说而本站也没有该小说，可以在下面留言，本站会尽快更新上来。</span>
                <div class="about-story">
                    <input class="about-input" v-model="name" type="text" placeholder="请输入小说名称">
                    <span class="about-btn" @click="submitEvent">留言</span>
                </div>
            </div>
           
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
export default class About extends Vue {
    private name: string = '';
    private async submitEvent() {
        const data: any = await Common.setStory({
            name: this.name,
        });
        this.name = '';
        Message({
            type: 'success',
            message: '本站会尽快更新该小说，谢谢留言。',
        });
    }
}
</script>

<style lang="less" scoped>
.about {
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0 0 0 ;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.about-main{
    flex: 1;
}
.about-content{
    width: 790px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #e3e3e3;
    padding: 20px;
    margin-top: 80px;
}
.about-val{
    font-size: 20px;
    font-weight: 700;
    color: #333;
    line-height: 48px;
}
.about-story{
    margin-top: 20px;
    display: flex;
}
.about-input{
    height: 60px;
    color: #333;
    line-height: 60px;
    border: 1px solid #e3e3e3;
    width: 300px;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
}
.about-btn{
    width: 100px;
    margin-left: 20px;
    background: #d32f2f;
    color: #fff;
    cursor: pointer;
    line-height: 60px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    border-radius: 4px;
}
</style>

