<template>
    <!--加这个@mouseover="clearInv" @mouseout="runInv"属性移除自动播放-->
    <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
        <div class="slide-img">
            <a :href="slides[nowIndex].href">
                <transition name="slide-trans">
                    <img v-if="isShow" :src="slides[nowIndex].src">
                </transition>
                <transition name="slide-trans-old">
                    <img v-if="!isShow" :src="slides[nowIndex].src">
                </transition>
            </a>
        </div>
        <h2>{{slides[nowIndex].title}}</h2>
        <ul class="slide-pages">
            <li @click="goto(prevIndex)"><</li>
            <li v-for="(item,index) in slides" @click="goto(index)">
                <a :class="{on:index===nowIndex}">{{index+1}}</a>
            </li>
            <li @click="goto(nextIndex)">></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:{
            slides:{
                type:Array,
                default:[]
            },
            inv:{
                type:Number,
                default:1000
            }
        },
        data () {
            return {
                nowIndex:0,
                isShow:true
            }
        },
        methods:{
            goto (index){
//                幻灯片过渡效果
                this.isShow=false
                setTimeout(()=>{
                    this.isShow=true
                    this.nowIndex = index
                    this.$emit('onchange',index)
                },10)

            },
//            幻灯片自动翻转核心部分
            runInv(){
                this.invId=setInterval(()=>{
                    this.goto(this.nextIndex)
                },this.inv)
            },
//              鼠标放上停止跳转
            clearInv(){
                clearInterval(this.invId)
            }
        },

//        实现关灯片的翻转
        computed:{
            prevIndex(){
                if(this.nowIndex===0){
//                    这里this.slides.length就是slides上面对象的长度。也就是this.slides.length-1是最后一张
                    return this.slides.length-1
                }else{
//                    其余的就是nowIndex这个指针减一的问题
                    return this.nowIndex-1
                }
            },
            nextIndex(){
                if(this.nowIndex===this.slides.length-1){
                    return 0
                }else{
                    return this.nowIndex+1
                }
            }
        },
        mounted(){
            this.runInv()
        }

    }
</script>

<style scoped>
    .slide-trans-enter-active {
        transition: all .5s;
    }
    .slide-trans-enter {
        transform: translateX(900px);
    }
    .slide-trans-old-leave-active {
        transition: all .5s;
        transform: translateX(-900px);
    }
    .slide-show {
        position: relative;
        margin: 15px 15px 15px 0;
        width: 900px;
        height: 500px;
        overflow: hidden;
    }
    .slide-show h2 {
        position: absolute;
        width: 100%;
        height: 100%;
        color: #fff;
        background: #000;
        opacity: .5;
        bottom: 0;
        height: 30px;
        text-align: left;
        padding-left: 15px;
    }
    .slide-img {
        width: 100%;
    }
    .slide-img img {
        width: 100%;
        position: absolute;
        top: 0;
    }
    .slide-pages {
        position: absolute;
        bottom: 10px;
        right: 15px;
    }
    .slide-pages li {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
        color: #fff;
    }
    .slide-pages li .on {
        text-decoration: underline;
    }
</style>
