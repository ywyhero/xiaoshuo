<template>
    <div class="chapter">
        <vine-header></vine-header>
        <div class="chapter-main">
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
            <div class="chapter-lastest">
                <span class="chapter-lastest-val">上次看的章节：</span>
                <span class="chapter-lastest-val" @click="toContent(lastestChapter)">{{lastestChapter.chapterName}}</span>
            </div>
            <div class="chapter-lists">
                <div class="chapter-list" @click="toContent(item)" v-for="(item, index) in chapters" :key="index">{{item.chapterName}}</div>
            </div>
            <el-pagination
                v-show="total > pageSize"
                class="chapter-pagination"
                :total="total"
                :current-page="pageSize"
                layout="pager"
                :page-size="pageSize"
                @current-change="pageChange">
        </el-pagination>
        </div>
       
        <vine-footer></vine-footer>
    </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator';
import Common from './../service/common';
import Header from './../components/header.vue';
import Footer from './../components/footer.vue';
import { Pagination } from 'element-ui';
@Component({
    components: {
        'vine-header': Header,
        'vine-footer': Footer,
        'el-pagination': Pagination,
    },
})
export default class Chapter extends Vue {
    private name: string | Array<string | null> = '';
    private author: string | Array<string | null> = '';
    private imgUrl: string | Array<string | null> = '';
    private bookId: string | Array<string | null> = '';
    private description: string | Array<string | null> = '';
    private typeName: string | Array<string | null> = '';
    private isOver: string | Array<string | null> = '';
    private lastestChapter: any = {};
    private pageSize: Number = 300;
    private pageNo: Number = 1;
    private total: Number = 0;
    private chapters: object[] = [];
    public created() {
        let  bookInfo: any = window.sessionStorage.getItem('bookInfo');
        bookInfo = JSON.parse(bookInfo);
        this.name = bookInfo.name;
        this.author = bookInfo.author;
        this.imgUrl = bookInfo.imgUrl;
        this.description = bookInfo.description;
        this.isOver = bookInfo.isOver === '1' ? '连载中' : '已完结';
        this.typeName = bookInfo.typeName;
        this.bookId = bookInfo.bookId;
        document.title = `${this.name}-Vine小说 | ${this.name}最新章节`;
        let lastestChapter: any = {};
        if(window.sessionStorage.getItem('lastestChapter')){
            lastestChapter = window.sessionStorage.getItem('lastestChapter')
            this.lastestChapter = JSON.parse(lastestChapter);
        }
        this.getChapters();
    }
    private async getChapters() {
        const data: any = await Common.getChapters({
            bookId: this.bookId,
            pageSize: this.pageSize,
            pageNo: this.pageNo
        });
        this.total = data.total;
        this.chapters = data.chapters;
    }
    private toContent(item: any) {
        this.$router.push(`/detail`);
        let obj = {
            chapterId: item.chapterId,
            bookId: this.bookId, 
            author: this.author,
            bookName: this.name,
            chapterName: item.chapterName
        }
        window.sessionStorage.setItem('chapterInfo', JSON.stringify(obj))
        window.sessionStorage.setItem('lastestChapter', JSON.stringify(item))
    }
    private async pageChange (page: number) {
        this.pageNo = page
        await this.getChapters()
    }
}
</script>
<style lang="less">
.chapter{
    .chapter-pagination{
        margin-top: 20px;
        text-align: center;
        .el-pager li.active{
            color: #e84848;
        }
        .el-pager li:hover {
            color: #e84848;
        }
    }
}
</style>

<style lang="less" scoped>
.chapter{
    margin: 0 auto;
    padding: 40px 40px 0px 40px; 
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.chapter-main{
    flex: 1;
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
.chapter-lastest{
    display: flex;
    border-bottom: 1px #ccc dotted;
}
.chapter-lastest-val{
    color: #333;
    padding: 11px 0;
    
}
.chapter-lists{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.chapter-list{
    width: 33.33%;
    padding: 11px 0;
    position: relative;
    border-bottom: 1px #ccc dotted;
    color: #333;
    cursor: pointer;
}
@media screen and (max-width: 720px){
    .chapter-list{
        width: 100%;
    }
    .chapter-img{
        margin-right: 10px;
        width: 100px;
    }
    .chapter-header-name{
        margin-bottom: 5px;
        font-size: 18px;
    }
    .chapter-header-tag{
        margin-bottom: 5px;
    }
    .chapter-header-author{
        margin-bottom: 5px;
        font-size: 14px;
    }
    .chapter-header-des{
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: normal; 
        margin-bottom: 5px;
        max-height: none; 
    }
}
</style>
