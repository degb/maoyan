<template>
  <div id="app">

   <keep-alive>
      <router-view/>
   </keep-alive>

      <div class="items">
	      <router-link v-for="(tabItem, index) in tabList" :key="index" :name="tabItem.name" :class="tabItem.icon" :to="tabItem.path" class="item">
	         {{tabItem.name}}
	      </router-link>
   		</div>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      tabList: [
       {name: '电影', icon: 'iconfont icon-dianying', path: '/movie'},
        {name: '影院', icon: 'iconfont icon-yingyuan', path: '/cinema'},
        {name: '我的', icon: 'iconfont icon-ren', path: '/mine'}
      ]
    }
  }
}
</script>


<style lang="scss">
	.items{
		width: 100%;
    height: 49px;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
    .item{
    	width: 33%;
    	text-align: center;
    	display: flex;
    	flex-direction: column;
    }
    .router-link-active{
    	color: #f03d37;
    }
	}
</style>
