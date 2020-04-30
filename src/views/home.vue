<template>
    <div class="main">
        <vine-header></vine-header>
        <div class="books">
            <div class="book" v-for="(item, index) in books" :key="index">
                <div class="type">
                    <span class="type-val">{{item.title}}</span>
                    <span class="type-more" @click="toMore(item)">更多</span>
                </div>
                <div class="lists">
                    <div class="list" @click="toChapter(itm)" v-for="(itm, idx) in item.lists" :key="idx">
                        <div class="list-left">
                            <img
                            :src="itm.imgUrl"
                            :alt="itm.name"
                            class="list-img"
                            >
                        </div>
                        <div class="list-right">
                                <span class="list-title">{{itm.name}}</span>
                                <span class="list-des">{{itm.description}}</span>
                            <div class="list-bottom">
                                <span class="list-name">{{itm.author}}</span>
                                <span class="list-type">{{itm.typeName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vine-footer></vine-footer>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Common from '../service/common';
import Header from './../components/header.vue';
import Footer from './../components/footer.vue';
@Component({
    components: {
        'vine-header': Header,
        'vine-footer': Footer,
    },
})
export default class Home extends Vue {
    private books: object[] = [];
    public created() {
        this.getBooks();
    }
    private async getBooks() {
        const {data}: any = await Common.getBooks({});
        this.books = data.books;
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
        window.sessionStorage.setItem('bookInfo', JSON.stringify(obj));
    }
    private toMore(item: any) {
        this.$router.push(`/more?isover=${item.isOver}`);
    }
}
</script>
<style lang="less" scoped>
.main {
    margin: 0 auto;
    padding: 20px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.books {
    flex: 1;
}
.book{
    margin-top: 40px;
}
.lists {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
}
.type {
    border-bottom: 1px solid #e6e6e6;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.type-more {
    font-size: 12px;
    color: #999;
    letter-spacing: 1px;
    line-height: 16px;
    background: url(../assets/images/more.png) no-repeat right center;
    padding-right: 8px;
    cursor: pointer;
}
.type-val {
    font-weight: 700;
    font-size: 18px;
    color: #333;
    letter-spacing: 1px;
}
.list {
    width: 33.3%;
    height: 128px;
    margin: 30px 0 10px;
    display: flex;
    cursor: pointer;
}
// .list:nth-of-type(3n) {
//     margin-right: 0;
// }
.list-left {
    width: 95px;
    height: 126px;
    margin-right: 15px;
}
.list-img {
    width: 95px;
    height: 126px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    overflow: hidden;
}
.list-right {
    display: flex;
    flex-direction: column;
    width: 222px;
    height: 100%;
}
.list-title {
    line-height: 21px;
    font-size: 16px;
    color: #333;
    margin-bottom: 7px;
    width: 222px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-des {
    color: #666;
    letter-spacing: 0.93px;
    height: 72px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size: 13px;
}
.list-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.list-name {
    font-size: 13px;
    color: #999;
    letter-spacing: 1px;
    width: 125px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowra;
}
.list-type {
    line-height: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    padding: 0 5px;
    color: #999;
    font-size: 12px;
}
@media screen and (max-width: 720px){
   .list{
       width: 100%;
   } 
}
@media screen and (min-width: 721px) and (max-width: 1099px){
   .list{
       width: 50%;
   } 
}
@media screen and (min-width: 1100px) {
   .list{
       width: 33.3%;
   } 
}
</style>




