<template>
    <div class="footer">
        <div class="footer-link">
            <router-link to="/about">关于本站</router-link>
            <i class="footer-icon">|</i> 
            <router-link to="/option">意见反馈</router-link>
        </div>
        
        <span class="footer-val">本站所有小说为转载作品，所有章节均由网友上传，转载至本站只是为了宣传本书让更多读者欣赏。如有版权问题，请联系本站，即时删除相关小说。</span>  
        <span class="footer-val"> Copyright©www.vinekan.com All Rights Reserved 版权所有 | 苏ICP备19067612号</span>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Footer extends Vue {}
</script>
<style lang="less" scoped>
.footer{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #999;
    letter-spacing: 1px;
    line-height: 23px;
    font-size: 12px;
    padding-bottom: 20px;
    padding-top: 20px;
    white-space: nowrap;
}
.footer-link{
    display: flex;
}
.footer-icon{
    margin: 0 10px;
}
.footer-val{
    white-space: pre-line;
    text-align: center;
}
</style>