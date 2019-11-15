<template>
    <div class="header">
        <div class="title" @click="toHome">
            <span class="title-val">姚威宇的个人主页</span>
            <span class="titl-des">看过并强烈推荐的高分小说</span>
        </div>
        <div class="search">
            <input type="text" @keyup.enter="searchBtn" placeholder="请输入您想看的小说名称" v-model="searchVal" class="search-input">
            <div class="search-btn" @click="searchBtn">
                <img class="search-img" src="./../assets/images/search.png" alt>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Vue, Component, Emit } from 'vue-property-decorator';
@Component({})
export default class Header extends Vue {
    private searchVal: string | Array<string | null> = '';
    public async created() {
        this.searchVal = this.$route.query.search;
    }
    private async searchBtn() {
        this.$router.push(`/search?search=${this.searchVal}`);
        if(this.$route.path.includes('/search'))  {
            window.location.reload();
        }
       
    }
    private toHome() {
        location.href = '/';
    }
}
</script>
<style lang="less" scoped>
.header {
    // padding: 30px 0 0px;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
.header.active {
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    background: #fafafa;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 99;
}
.title {
    color: #d32f2f;
    font-size: 32px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.titl-des {
    font-size: 16px;
    font-weight: normal;
}
.search {
    border: 1px solid #e0e0e0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    line-height: 32px;
    width: 283px;
    border-right: 0 none;
    padding-left: 14px;
    font-size: 14px;
    letter-spacing: 1px;
    color: #333;
    margin-left: 200px;
    display: flex;
}
.search-input {
    width: 100%;
}
.search-btn {
    width: 40px;
    height: 34px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background: #d32f2f;
}
</style>
