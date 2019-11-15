<template>
    <div class="search">
        <vine-header></vine-header>
        <div class="search-main">
            <div class="search-lists">
                <div class="search-list" v-for="(item, index) in books" :key="index">
                    <div class="search-list-info">
                        <img class="search-list-img" :src="item.imgUrl" :alt="item.name">
                        <div class="search-list-right">
                            <span class="search-list-title">{{item.name}}</span>
                            <div class="search-list-tags">
                                <span class="search-list-tag">{{item.author}}</span>
                                <i class="search-icon">|</i>   
                                <span class="search-list-tag">{{item.typeName}}</span>
                                <i class="search-icon">|</i>  
                                <span class="search-list-tag">{{item.isOver === 1 ? '连载中' : '已完结'}}</span>
                            </div>
                            <span class="search-list-des">{{item.description}}</span>
                            <span class="search-list-keyword"></span>
                        </div>
                    </div>
                    <span class="search-list-detail" @click="toDetail(item)">书籍详情</span>
                </div>
            </div>
        </div>
        <vine-footer></vine-footer>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Header from './../components/header.vue';
import Footer from './../components/footer.vue';
import { Getter } from 'vuex-class';
import Common from './../service/common';
@Component({
    components: {
        'vine-header': Header,
        'vine-footer': Footer,
    },
})
export default class Search extends Vue {
    private searchVal: string | Array<string | null> = '';
    private books: object[] = [];
    public created() {
        const query = this.$route.query;
        this.searchVal = query.search;
        this.searchBooks();
    }
    private async searchBooks() {
        const data: any =  await Common.searchBooks({
            searchVal: this.searchVal,
        });
        this.books = data.books;
    }
    private toDetail(item: any) {
        this.$router.push(`/chapter?bookId=${item.bookId}&name=${item.name}&typeName=${item.typeName}&isOver=${item.isOver}&imgUrl=${item.imgUrl}&description=${item.description}&author=${item.author}`);
    }
}
</script>
<style lang="less" scoped>
.search{
    width: 1200px;
    min-height: 100%;
    display: flex;
    padding-top: 40px;
    flex-direction: column;
    margin: 0 auto;
}
.search-main{
    flex: 1;

}
.search-list{
    padding: 20px 0;
    border-bottom: 1px dotted #ccc;
    display: flex;
    justify-content: space-between;
}
.search-list-info{
    display: flex;
}
.search-list-img{
    width: 100px;
    height: 132px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    overflow: hidden;
    margin-right: 20px;
}
.search-list-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.search-list-title{
    font-size: 20px;
    color: #333;
    letter-spacing: 1px;
    font-weight: 400;
}
.search-list-tags{
    display: flex;
    color: #999;
    font-size: 12px;
}
.search-icon{
    margin: 0 10px;
}
.search-list-des{
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 13px;
    color: #666;
    line-height: 20px;
    letter-spacing: .93px;
    height: 40px;
}
.search-list-detail{
    width: 100px;
    height: 30px;
    margin-bottom: 9px;
    text-align: center;
    line-height: 30px;
    overflow: hidden;
    font-size: 14px;
    border-radius: 2px;
    color: #fff;
    background: #e84848;
    cursor: pointer;
}
</style>

