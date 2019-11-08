<template>
    <div class="chapter">
        <div class="chapter-header">
            <img class="chapter-img" :src="imgUrl" :alt="name">
            <div class="chapter-header-right">
                <span class="chapter-header-name">{{name}}</span>
                <div class="chapter-header-tag">
                    <span class="chapter-header-is-over">{{isOver}}</span>
                    <span class="chapter-header-type-name">{{typeName}}</span>
                </div>
                <span class="chapter-header-author">{{author}}</span>
                <span class="chapter-header-des">{{description}}</span>
            </div>
        </div>
        <div class="chapter-val">
            <i class="chapter-icon"></i>
            正文
        </div>
        <div class="chapter-lists">
            <div class="chapter-list" @click="toContent(item)" v-for="(item, index) in chapters" :key="index">{{item.name}}</div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Common from './../service/common';
@Component({})
export default class Chapter extends Vue {
    private name: string | Array<string | null> = '';
    private author: string | Array<string | null> = '';
    private imgUrl: string | Array<string | null> = '';
    private bookId: string | Array<string | null> = '';
    private description: string | Array<string | null> = '';
    private typeName: string | Array<string | null> = '';
    private isOver: string | Array<string | null> = '';
    private chapters: object[] = [];
    public created() {
        const query = this.$route.query;
        this.name = query.name;
        this.author = query.author;
        this.imgUrl = query.imgUrl;
        this.description = query.description;
        this.isOver = query.isOver === '1' ? '连载中' : '已完结';
        this.typeName = query.typeName;
        this.bookId = query.bookId;
        this.getChapters();
    }
    private async getChapters() {
        const data: any = await Common.getChapters({bookId: this.bookId});
        this.chapters = data.chapters;
    }
    private toContent(item: any) {
        this.$router.push(`/detail?chapterId=${item.chapterId}&bookId=${this.bookId}&author=${this.author}`);
    }
}
</script>
<style lang="less" scoped>
.chapter{
    width: 1200px;
    margin: 0 auto;
    padding: 40px; 
}
.chapter-header{
    display: flex;
    align-items: flex-start;
    padding-bottom: 20px;
    border-bottom: 1px solid #e3e3e3;
}
.chapter-img {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    width: 200px;
    margin-right: 26px;
}
.chapter-header-right{
    display: flex;
    flex-direction: column;
}
.chapter-header-name {
    font-size: 24px;
    color: #333;
    letter-spacing: 1.33px;
    font-weight: 700;
    margin-bottom: 10px;
}
.chapter-header-author{
    margin-bottom: 10px;
    color: #333;
}
.chapter-header-des{
    font-size: 14px;
    color: #333;
    line-height: 25px;
    margin-bottom: 5px;
    max-height: 76px;
    overflow: hidden;
}
.chapter-header-tag{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.chapter-header-is-over{
    background: #02b389;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    display: inline-block;
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.chapter-header-type-name{
    background: #d32f2f;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    display: inline-block;
    padding: 0 5px;
    height: 20px;
    line-height: 20px;
}
.chapter-val{
    color: #333;
    font: 700 18px/24px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
    overflow: hidden;
    height: 39px;
    position: relative;
    line-height: 100%;
    padding: 15px 0 0 0;
}
.chapter-icon{
    border-left: 4px solid #fc7403;
    padding-right: 8px;
    display: inline-block;
    height: 17px;
    margin-bottom: -2px;
}
.chapter-lists{
    display: flex;
    flex-wrap: wrap;
}
.chapter-list{
    width: 33.33%;
    padding: 11px 0;
    position: relative;
    border-bottom: 1px #ccc dotted;
    color: #333;
    cursor: pointer;
}
</style>
