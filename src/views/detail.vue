<template>
    <div class="content">
        <div class="content-page">
            <i class="content-icon"></i>
            <div class="content-title">
                <div class="content-name">{{chapter.name}}</div>
                <div class="content-des">
                    <div class="content-author">
                        作者：<span class="content-author-val">{{author}}</span> |
                    </div>
                    <div class="content-createtime">
                        更新时间：<span>{{chapter.createTime}}</span>
                    </div>
                </div>
            </div>
            <div class="content-main" v-html="chapter.content"></div>
            <div class="content-btn">
                <span class="content-chapter content-box" @click="toChapter">目录</span>
                <span class="content-pre content-box" @click="toPreChapter" v-show="chapterId > 1">上一章</span>
                <span class="content-next content-box" @click="toNextChapter" v-show="!isLast">下一章</span>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Common from './../service/common';
import MkTime from 'mktime';
@Component({})
export default class Detail extends Vue {
    private chapterId: string | Array<string | null> | number = '';
    private bookId: string | Array<string | null> = '';
    private author: string | Array<string | null> = '';
    private chapterIdNum: number = 0;
    private isLast: boolean = false;
    private chapter: any = {};
    public created() {
        const query = this.$route.query;
        this.chapterId = Number(query.chapterId);
        this.chapterIdNum = this.chapterId;
        this.bookId = query.bookId;
        this.author = query.author;
        this.getContent();
    }
    private async getContent() {
        const data: any = await Common.getContent({bookId: this.bookId, chapterId: this.chapterId});
        this.chapter = data.chapter;
        this.chapter.createTime = MkTime.format(this.chapter.createTime / 1000, 7);
        this.isLast = this.chapter.isLast;
    }
    private toChapter() {
        this.$router.go(-1);
    }
    private toPreChapter() {
        this.chapterIdNum = this.chapterIdNum - 1;
        this.$router.replace(`/detail?chapterId=${this.chapterIdNum}&bookId=${this.bookId}&author=${this.author}`);
        window.location.reload();
    }
    private toNextChapter() {
        this.chapterIdNum = this.chapterIdNum + 1;
        this.$router.replace(`/detail?chapterId=${this.chapterIdNum}&bookId=${this.bookId}&author=${this.author}`);
        window.location.reload();
    }
}
</script>
<style lang="less" scoped>
.content{
    width: 100%;
    height: 100%;
    background: #d9cdb6;
    padding-top: 60px;
    padding-bottom: 60px;
    overflow-y: auto;
}
.content-page{
    width: 960px;
    font-size: 14px;
    color: #333;
    margin: 0 auto;
    background: #faeed7;
    box-shadow: 0 2px 20px 0 rgba(0,0,0,.05);
    position: relative;
}
.content-icon{
    width: 17px;
    height: 26px;
    background-image: url('./../assets/images/reader_ico.png');
    position: absolute;
    right: 18px;
    top: 0;
    cursor: pointer;
    background-position: -120px 0;
}
.content-name{
    padding-top: 80px;
    padding-bottom: 10px;
    text-align: center;
    line-height: 40px;
    font-size: 28px;
    color: #333;
    letter-spacing: 1.08px;
    box-sizing: content-box;
    font-weight: 700;
    text-align: center;
}
.content-des{
    display: flex;
    justify-content: center;
}
.content-author{
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: .86px;
    line-height: 23px;
    padding-bottom: 20px;
    color: #999;
    margin-right: 5px;
}
.content-author-val{
    color: #333;
}
.content-i{
    margin: 0 10px;
}
.content-createtime{
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: .86px;
    line-height: 23px;
    padding-bottom: 20px;
    color: #999;
}
.content-main {
    letter-spacing: 1px;
    line-height: 2em;
    text-indent: 2em;
    padding: 20px 40px;
    white-space: pre-wrap;
}
.content-btn {
    display: flex;
    justify-content: center;
    padding-bottom: 60px;
}
.content-box{
    background: rgba(0,0,0,.03);
    border-radius: 2px;
    height: 50px;
    display: table-cell;
    border-collapse: separate;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #333;
    letter-spacing: .93px;
    width: 180px;
    cursor: pointer;
}
.content-box:hover{
    background: rgba(232,72,72,.06);
    color: #e84848;
}
.content-chapter,
.content-pre{
    margin-right: 10px;
}
.content-next{
    width: 370px;
}
</style>
