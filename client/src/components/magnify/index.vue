<template>
    <div
        v-magnify
        class="container" 
        :style="{
            width: imgWidth + 'px',
            height: imgHeight + 'px'
        }">
        <a 
            :href="link" 
            class="mag-wrap" 
            :style="{
                width: magWidth + 'px',
                height: magHeight + 'px'
            }"
        >
            <img 
                class="mag-img" 
                :src="imgUrl" 
                alt=""
                :style="{
                    width: imgWidth + 'px',
                    height: imgHeight + 'px'
                }"
            />
        </a>
        <a 
            :href="link" 
            class="static-wrap"
        >
            <img 
                class="static-img" 
                :src="imgUrl" 
                :style="{
                    width: imgWidth + 'px',
                    height: imgHeight + 'px'
                }"
            />
        </a>
    </div>
</template>

<script>
import magnify from './magnify'
export default {
    name:'img-magnify',
    directives:{
        magnify
    },
    props:{
        imgUrl:{
            type: String,
            default: 'https://m.sarahshouses.com/image/u/cms/www/202107/14185425yu6r.jpg'
        },
        link:{
            type: String,
            default: 'https://www.baidu.com'
        },
        magWidth: {
            type: Number,
            default: 100,
        },
        magHeight: {
            type: Number,
            default: 100,
        },
        imgWidth: {
            type: Number,
            default: 375,
        },
        imgHeight: {
            type: Number,
            default: 500,
        },
    }
}
</script>

<style lang='scss' scoped>
    .container{
        position: relative;
        margin: 50px;
        .mag-wrap{
            position: absolute;
            top: 0;
            left: 0;
            display: none;
            border: 1px solid #ccc;
            box-shadow: 0 0 3px #999;
            overflow: hidden;
            border-radius: 50%;
            z-index: 99;
            cursor: move;
            .mag-img {
                position: absolute;
                left: 0;
                top: 0;
            }
            &.show {
                display: block;
                transform: scale(1.5);
            }
        }
        .static-wrap {
            position: absolute;
            top: 0;
            left: 0;
            .static-img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>