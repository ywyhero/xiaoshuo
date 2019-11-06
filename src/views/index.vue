<template>
    <div class="main">
        <div class="header">
            <div class="title">
                <span class="title-val">Vine小说</span>
                <span class="titl-des">高分小说聚集地</span>
            </div>
            <div class="search">
                <input type="text" placeholder="请输入您想看的小说名称" class="search-input"/>
                <div class="search-btn">
                    <img class="search-img" src="./../assets/images/search.png" alt="">
                </div>
            </div>
        </div>
        <div class="books" v-for="itm in 5" :key="itm">
             <div class="type">
                <span class="type-val">经典完本</span>
                <span class="type-more">更多</span>
            </div>
            <div class="lists">
                <div class="list" v-for="item in 6" :key="item">
                    <div class="list-left">
                        <img src="http://47.105.109.192:3000/upload/dazhuzai1571800180.jpg" alt="" class="list-img">
                    </div>
                    <div class="list-right">
                        <span class="list-title">超级全能系统</span>
                        <span class="list-des">
                            一次意外却让夜凡激活了一个全能系统，从此...“系统，给我弄点钱花...”“系统，给我变成世界第一给我变成世界第一
                        </span>
                        <div class="list-bottom">
                            <span class="list-name">拔丝地瓜</span>
                            <span class="list-type">都市娱乐</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
export default class Index extends Vue {}
</script>
<style lang="less" scoped>
.main{
    width: 1200px;
    margin: 0 auto;
}
.header{
    padding: 30px 0 0px;
    display: flex;
    align-items: center;
}
.header.active{
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    background: #fafafa;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
    width: 100%;
    z-index: 99;
}
.title{
    color: #d32f2f;
    font-size: 32px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.titl-des{
    font-size: 16px;
    font-weight: normal;
}
.search{
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
    margin: 0 auto;
    display: flex;
}
.search-input{
    width: 100%;
}
.search-btn{
    width: 40px;
    height: 34px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background: #d32f2f;
}
.books{
    margin-top: 40px;
}
.lists{
    display: flex;
    flex-wrap: wrap;
}
.type{
    border-bottom: 1px solid #e6e6e6;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.type-more{
    font-size: 12px;
    color: #999;
    letter-spacing: 1px;
    line-height: 16px;
    background: url(../assets/images/more.png) no-repeat right center;
    padding-right: 8px;
    cursor: pointer;
}
.type-val{
    font-weight: 700;
    font-size: 18px;
    color: #333;
    letter-spacing: 1px;
}
.list{
    width: 332px;
    height: 128px;
    margin: 30px 0 10px;
    display: flex;
    margin-right: 102px;
}
.list:nth-of-type(3n) {
    margin-right: 0;
}
.list-left{
    width: 95px;
    height: 126px;
    margin-right: 15px;
}
.list-img{
    width: 95px;
    height: 126px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    overflow: hidden;
}
.list-right{
    display: flex;
    flex-direction: column;
    width: 222px;
    height: 100%;
}
.list-title{
    line-height: 21px;
    font-size: 16px;
    color: #333;
    margin-bottom: 7px;
    width: 222px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-des{
    line-height: 24px;
    color: #666;
    letter-spacing: .93px;
    height: 72px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 13px;
}
.list-bottom{
    display: flex;
    justify-content: space-between;
}
.list-name{
    font-size: 13px;
    color: #999;
    letter-spacing: 1px;
    width: 125px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowra
}
.list-type{
    line-height: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 2px;
    padding: 0 5px;
    color: #999;
    font-size: 12px;
}
</style>
