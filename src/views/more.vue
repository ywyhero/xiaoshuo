<template>
    <div class="more">
        <vine-header></vine-header>
        <div class="more-search">
            <div class="more-likes">
                <span @click="likeEvent(item)" :class="currentId === item.id ? 'active' : ''" class="more-like" v-for="(item, index) in like" :key="index">{{item.name}}</span>
            </div>
            <div class="more-types">
                <span class="more-val">作品分类:</span>
                <div class="more-types-lists">
                    <span class="more-type" @click="typeEvent(item, 'type')" :class="typeId === item.id ? 'active' : ''" v-for="(item, index) in types" :key="index">{{item.name}}</span>
                </div>
            </div>
            <div class="more-types">
                <span class="more-val">书本进度:</span>
                <div class="more-types-lists">
                    <span class="more-type" @click="statusEvent(item, 'status')" :class="statusId === item.id ? 'active' : ''" v-for="(item, index) in status" :key="index">{{item.name}}</span>
                </div>
            </div>
            <div class="more-line"></div>
            <div class="more-types">
                <span class="more-val">已选条件:</span>
                <div class="more-types-lists">
                    <div class="more-types-list" v-for="(item, index) in selectedLists" :key="index">
                        <span class="more-type active more-selected">{{item.name}}
                            <i @click="removeEvent(item)" class="more-type-close"></i>
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="more-main">
            <div class="more-books">
                <div class="more-book" v-show="books.length > 0" v-for="(item, index) in books" :key="index">
                    <img class="more-book-img" @click="toChapter(item)" :src="item.imgUrl" :alt="item.name">
                    <div class="more-book-right">
                        <span class="more-book-title" @click="toChapter(item)">{{item.name}}</span>
                        <div class="more-book-info">
                            <span class="more-book-author">{{item.author}}</span> |
                            <span class="more-book-type">{{item.typeName}}</span> |
                            <span class="more-book-is-over">{{item.isOver === 1 ? '连载中' : '已完结'}}</span> | 
                            <span class="more-book-time">{{item.createTime}}</span>
                        </div>
                        <span class="more-book-des">{{item.description}}</span>
                        <span class="more-book-new" @click="toNewChapter(item)">最新章节: {{item.newChapter.chapterName}}</span>
                    </div>
                </div>
                <div class="more-empty" v-show="books.length === 0">暂无数据</div>
            </div>
        </div>
        <el-pagination
                v-show="total > pageSize"
                class="more-pagination"
                :total="total"
                :current-page="currentPage"
                layout="pager"
                :page-size="pageSize"
                @current-change="handlerCurrentChange">
        </el-pagination>
        <vine-footer></vine-footer>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Common from './../service/common';
import MkTime from 'mktime';
import { Pagination } from 'element-ui';
import Header from './../components/header.vue';
import Footer from './../components/footer.vue';
@Component({
    components: {
        'el-pagination': Pagination,
        'vine-header': Header,
        'vine-footer': Footer,
    },
})
export default class More extends Vue {
    private like: object[] = this.$store.state.like;
    private types: object[] = [];
    private status: object[] = this.$store.state.isOver;
    private currentId: number = 1;
    private typeId: number = 0;
    private statusId: number = 0;
    private selectedLists: object[] = [];
    private books: object[] = [];
    private pageNo: number = 1;
    private pageSize: number = 16;
    private total: number = 0;
    private currentPage: number = 1;
    public async created() {
        await this.getTypes();
        const isOver = Number(this.$route.query.isover);
        this.statusId = isOver;
        const item = this.status.find((v: any) => v.id === isOver);
        this.statusEvent(item, 'status');
        // this.moreBooks();
    }
    private async getTypes() {
        const data: any = await Common.getTypes({
            like: this.currentId,
        });
        this.types = data.types;

        this.types.unshift({
            id: 0,
            name: '全部作品',
        });
    }
    private async likeEvent(item: any) {
        this.currentId = item.id;
        this.typeId = 0;
        const index = this.selectedLists.findIndex((v: any) => v.type === 'type');
        if (index > -1) {
            this.selectedLists.splice(index, 1);
        }
        await this.getTypes();
        await this.moreBooks();
    }
    private typeEvent(item: any, type: string) {
        this.typeId = item.id;
        const obj = Object.assign(item, { type });
        const index = this.selectedLists.findIndex((v: any) => v.type === obj.type);
        if (index > -1 && this.typeId !== 0) {
            this.selectedLists.splice(index, 1, obj);
        } else if (index > -1 && this.typeId === 0) {
            this.selectedLists.splice(index, 1);
        } else if (this.typeId !== 0) {
            this.selectedLists.push(obj);
        }
        this.moreBooks();
    }
    private statusEvent(item: any, type: string) {
        this.statusId = item.id;
        const obj = Object.assign(item, { type });
        const index = this.selectedLists.findIndex((v: any) => v.type === obj.type);
        if (index > -1 && this.statusId !== 0) {
            this.selectedLists.splice(index, 1, obj);
        } else if (index > -1 && this.statusId === 0) {
            this.selectedLists.splice(index, 1);
        } else if (this.statusId !== 0) {
            this.selectedLists.push(obj);
        }
        this.moreBooks();
    }
    private removeEvent(item: any) {
        if (item.type === 'status') {
            this.statusId = 0;
        }
        if (item.type === 'type') {
            this.typeId = 0;
        }
        const index = this.selectedLists.findIndex((v: any) => v.type === item.type);
        this.selectedLists.splice(index, 1);
        this.moreBooks();
    }
    private async moreBooks() {
        const typeSelected: any = this.selectedLists.filter((v: any) => v.type === 'type');
        const typeId = typeSelected.length > 0 && typeSelected[0].id || null;
        const statusSelected: any = this.selectedLists.filter((v: any) => v.type === 'status');
        const statusId = statusSelected.length > 0 && statusSelected[0].id || null;
        const { data }: any = await Common.moreBooks({
            like: this.currentId,
            type: typeId,
            isOver: statusId,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
        });
        this.books = data.books;
        this.books = this.books.map((v: any) => ({
            ...v,
            createTime: MkTime.format(v.createTime, 7),
        }));
        this.total = data.total;
    }
    private toNewChapter(item: any) {
        this.$router.push(`/detail?chapterId=${item.newChapter.chapterId}&bookId=${item.bookId}&author=${item.author}`);
    }
    private toChapter(item: any) {
        this.$router.push(`/chapter`);
        let obj = {
            bookId: item.bookId,
            name: item.name,
            typeName: item.typeName,
            isOver: item.isOver,
            imgUrl: item.imgUrl,
            description: item.description,
            author: item.author
        }
        window.localStorage.setItem('bookInfo', JSON.stringify(obj));
    }
    private handlerCurrentChange(page: number) {
        this.currentPage = page;
        this.pageNo = page;
        this.moreBooks();
    }

}
</script>
<style lang="less">
.more-pagination{
    margin-top: 20px;
    text-align: center;
    .el-pager li.active{
        color: #e84848;
    }
    .el-pager li:hover {
        color: #e84848;
    }
}
</style>

<style lang="less" scoped>
.more {
    margin: 0 auto;
    padding: 20px; 
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.more-search{
    background: #f7f7f7;
    border: 1px solid #e6e6e6;
    padding: 12px 20px;
    overflow: hidden;
    font-size: 13px;
}
.more-likes{
    display: flex;
    font-size: 15px;
    color: #999;
    margin: 0;
    line-height: 30px;
}
.more-like.active{
    color: #333;
    background: 0 0;
    font-weight: 700;
}
.more-like{
    margin-right: 20px;
    cursor: pointer;
}
.more-types{
    padding: 3px 0;
    line-height: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
}
.more-val{
    width: 88px;
    color: #999;
}
.more-types-lists{
    width: 1020px;
    color: #888;
    display: flex;
    flex-wrap: wrap;
}
.more-type{
    color: #151515;
    font-size: 13px;
    margin: 5px 6px 5px 7px;
    cursor: pointer;
}
.more-type.active{
    color: #fff;
    background: #d32f2f;
    border-radius: 2px;
    padding: 0 5px;
}
.more-line{
    height: 1px;
    background: #e6e6e6;
    overflow: hidden;
    margin: 5px auto;
}
.more-selected{
    display: flex;
    align-items: center;
    cursor: default;
}
.more-type-close{
    width: 11px;
    height: 11px;
    background: url('./../assets/images/closeselect.png');
    cursor: pointer;
    margin-left: 5px;
}
.more-main{
    margin-top: 40px;
    margin-bottom: 20px;
    border: 1px solid #e6e6e6;
    padding: 20px;
    font-size: 12px;
    overflow: hidden;
    flex: 1;
}
.more-books{
    display: flex;
    flex-wrap: wrap;
}
.more-empty{
    width: 100%;
    height: 800px;
    line-height: 800px;
    font-size: 32px;
    text-align: center;
    color: #e3e3e3;
}
.more-book{
    width: 558px;
    height: 175px;
    padding: 20px 0;
    display: flex;
    border-bottom: 1px dashed #e3e3e3;
}
.more-book-img{
    width: 100px;
    height: 132px;
    margin-right: 20px;
    cursor: pointer;
}
.more-book-right{
    display: flex;
    flex-direction: column;
    flex: 1;
}
.more-book-title{
    font-size: 20px;
    color: #333;
    line-height: 26px;
    cursor: pointer;
}
.more-book-info{
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #e6e6e6;
    margin: 10px 0 15px;
    color: #999;
}
.more-book-des{
    font-size: 13px;
    color: #666;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.more-book-new{
    line-height: 20px;
    margin-top: 10px;
    text-align: left;
    color: #999;
    cursor: pointer;
}
.more-book-title:hover{
    color: #e84848;
}
.more-book-new:hover{
    color: #e84848;
}
@media screen and (max-width: 720px){
    .more-val{
        width: 245px;
    }
    .more-empty{
        height: auto;
        line-height: normal;
    }
    
}
</style>
