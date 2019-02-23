<template>
<div id="city-list" class="page subpage">
    <app-content :style="{top: 0, bottom: 0}" ref="content">
        <section>
        	<h6 class="city-title">定位城市</h6>
        	<div class="city-list clearfix"> 
        		<span class="location-city">定位失败</span>
        	</div>
        </section>
        <section>
        	<h6 class="city-title">热门城市</h6>
        	<div class="city-list clearfix">
        		<span v-for="item in cityList" class="city-item" @click="selectCityAction(item)">{{item.nm}}</span>
        	</div>
        </section>
        <div v-for="cityMap in data" :key="cityMap.key" ref="list" class="city">
            <h6 class="city-title">{{cityMap.key.toUpperCase()}}</h6>
            <ul>
                <li v-for="item in cityMap.value" :key="item.id"
                    @click="selectCityAction(item)">
                    {{item.nm}}
                </li>
            </ul>
        </div>
    </app-content>
    <nav class="nav-bar">
    	<li class="nav-item" @click="scro(0)">定位</li>
    	<li class="nav-item" @click="scro(85.6)">热门</li>
        <li class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
            {{item.toUpperCase()}}
        </li>
    </nav>
</div>

</template>

<script>
import {getCityList} from '../../services/otherService'
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            data: [],
            keys: [],
            cityList:[
            {id:10,nm:"上海"
           },{id:1,nm:"北京"
           },{id:20,nm:"广州"
           },{id:30,nm:"深圳"
           },{id:57,nm:"武汉"
           },{id:40,nm:"天津"
           },{id:42,nm:"西安"
           },{id:55,nm:"南京"
           },{id:50,nm:"杭州"
           },{id:59,nm:"成都"
           },{id:45,nm:"重庆"
            }
           ]
        }
    },
    methods: {
        ...mapActions(['selectCity']),
        btnAction(index){
            //跳转到指定的字母的城市列表中
            //计算需要滚动的高度
            let height = 0;
            for(let i = 0; i < index; i++){
                height += this.$refs.list[i].offsetHeight;
            }     
            //让滚动视图滚动
            this.$refs.content.scrollTo(height);
        },
        scro(height){
        	this.$refs.content.scrollTo(height);
        },
        selectCityAction(item){
            //将选中的城市保存，保存到全局数据中
            this.selectCity({
                city: item.nm,
                id: item.id
            })
            // 返回上一页
            this.$router.back();
        }
    },
    created(){
        // 去本地存储数据，如果没有就请求，如果有就直接使用
        getCityList().then(({data, keys})=>{
            // 本地存储数据，以便下次使用
            this.data = data;
            this.keys = keys;
        })
    }
}
</script>

<style lang="scss" scoped>
#city-list{
   background-color: #ebebeb;
    font-size: 14px;
    color: #333;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow-y: auto;
    z-index: 10;
}

.city-title{
		padding-left: 25px;
	    line-height: 30px;
	    font-size: 14px;
    	color: #333;
    	font-weight: normal;
	}
.city-list{
	background-color: #f5f5f5;
    padding-bottom: 8px;
    padding-right: 30px;
    .location-city{
    	width: auto;
	    min-width: 30%;
	    padding: 0 20px;
    }
}
.city-item,.location-city{
	float: left;
    background: #fff;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 4%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.city{
	ul{
		background: #f5f5f5;
		li{
	height: 44px;
    line-height: 44px;
    margin-left: 15px;
    border-bottom: 1px solid #c8c7cc;
    background: #f5f5f5;
  }
	}
}
.nav-bar{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    .nav-item{
        font-size: 14px;
        padding: 0 6px;
    }
}
</style>

