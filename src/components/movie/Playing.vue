<template>
   <app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
<ul class="playing">
    <li class="playing-item" v-for="item in playingList" :key="item.id" @click="playingDetail(item.id)">
        <div class="item-img">
            <img :src="item.img"/>
        </div>
        <div class="item-content">
            <div class="nm">
	            <div class="title">{{item.nm}}</div>
	            <span class="version " :class="[{imax: item.version=='v3d imax'},{v3d: item.version=='v3d'}]"></span>
            </div>
            <div class="sc" v-if="item.sc>0">观众评<span>{{item.sc}}</span></div>
             <div class="sc"v-else-if="item.sc==0"><span>{{item.wish}}</span>人想看</div>
            <div class="star">主演：{{item.star}}</div>
            <div class="show-info">{{item.showInfo}}</div>
        </div>
        <div class="btn-ticket">
        	<div class="btn sell" v-if="item.globalReleased==true">
        		<span>购票</span>
        	</div>
        	<div class="btn pre" v-else-if="item.globalReleased==false">
        		<span>预售</span>
        	</div>
        </div>
    </li>
</ul>
</app-content>
</template>

<script>
import {getPlayingList, getMorePlayingList} from '../../services/movieService'
export default {
    data(){
        return {
            playingList: [],
            playingIDS: [],
            canLoadMore: true
        }
    },
    methods: {
        //加载更多数据
        loadMoreData(){
            //取出ids
            let ids = [...this.playingIDS];
            ids = ids.splice(this.playingList.length, 10);
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            getMorePlayingList(movieIds).then(result=>{
           
                this.playingList = [...this.playingList, ...result];

                //判断是否可以继续加载更多
                if(this.playingList.length >= this.playingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
            })
        },
        playingDetail(id){
        	this.$router.push('/movie/detail');
        	localStorage.id=id;
        }
    },
    created(){
        //初始化请求数据
        getPlayingList().then(({data, ids})=>{
            this.playingList = data;
            this.playingIDS = ids;
        })
    }
}
</script>

<style lang="scss" scoped>
		li{
			position: relative;
		}
	.playing-item{
    display: flex;
    padding: 10px;
    .item-img{
        width: 64px;
        img{
            width: 100%;
        }
    }
    .item-content{
        margin-left: 5px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 13px;
        font-family: PingFangSC-Regular,Hiragino Sans GB,sans-serif;
        color: #666;
		padding-right: 5px;
	    margin-right: 48px;
	    overflow: hidden;		
		.nm{
			max-height: 24px;
		    margin-bottom: 7px;
		    line-height: 24px;
		    overflow: hidden;
		    font-weight: bold;
		    font-size: 17px;
		    color: #333;
		    display:flex;
		    .title{
		    	font-weight: 700;
		        padding-right: 5px;
		        flex-shrink: 1;
		    }
		    .version{
		    	display: flex;
		    	background-size: contain;
			    background-repeat: no-repeat;
			    height: 14px;
			    width: 17px;
			    display: inline-block;
			    margin-top: 5px;
			    margin-right: 3px;
		    }
		    .v3d{
		    	background: url(../../assets/3d.png)  no-repeat;
			    background-size:100% 100%;
		    	
		    }
		    .imax{
		    	width: 43px;
		    	background: url(../../assets/3dMax.png)  no-repeat;
			    background-size:100% 100%;
		    	
		    }
		}
        .sc{
    		line-height:13px;
    		font-weight:normal;
        	span{
        		font-weight: 700;
			    color: #faaf00;
			    font-size: 15px;
        	}
        }
        .star{
        	margin-top: 6px;
		    line-height: 15px;
		    width: 205.6px;
		    text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		    
        }
        .show-info{
        	margin-top: 6px;
    		line-height: 15px;
        }
    }
    .btn-ticket{
    	font-size: 12px;
	    position: absolute;
	    right: 14px;
	    top: 0;
	    bottom: 0;
	    height: 27px;
	    margin: auto;
	   .btn{
	   	    width: 47px;
		    height: 27px;
		    line-height: 28px;
		    text-align: center;
		    box-sizing: border-box;
		    color: #fff;
		    border-radius: 4px;
		    white-space: nowrap;
		    font-size: 12px;
		    cursor: pointer;
	   } 
	   .sell{
	   	 background-color: #f03d37;
	   }
	   .pre{
	   	  background-color: #3c9fe6;
	   }
	   
    }
}
</style>