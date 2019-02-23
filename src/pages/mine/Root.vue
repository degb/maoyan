<template>
	<div class="page" id="mine">
		<app-header title="猫眼电影">
			<div class="iconfont icon-zuo1" slot="left" @click="back"></div>
		</app-header>
		<nav class="nav">
			<li v-for="(navItem,index) in navList" :key="index" :class="{active: navIndex==index}" @click="navAction(index)">
				<a class="react">
					{{navItem}}
				</a>
			</li>
		</nav>
		<router-view></router-view>
		<keep-alive>
			<username v-if="navIndex==0" />
			<tel v-if="navIndex==1" />
		</keep-alive>
	</div>
</template>

<script>
	import username from '../../components/mine/username'
	import tel from '../../components/mine/tel'
	export default {
		components: {
			'username': username,
			'tel': tel,
		},
		data() {
			return {
				navList: ['美团账号登录', '手机验证登录'],
				navIndex: 0,
				bkClass: 'bk',
				blurClass: 'blur'
			}
		},
		methods: {
			navAction(index) {
				this.navIndex = index;
			},
			back() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		overflow: hidden;
		z-index: 10;
	}
	
	.nav {
		position: absolute;
		top: 44px;
		left: 0;
		height: 40px;
		background: #fff;
		line-height: 40px;
		padding-left: 20px;
		padding-right: 20px;
		position: relative;
		border-bottom: 4px solid #d6d6d6;
		li {
			width: 50%;
			display: block;
			text-align: center;
			float: left;
			.react {
				padding-left: 20px;
				padding-right: 20px;
			}
		}
	}
	
	.active {
		a {
			color: #df2d2d !important;
		}
		&::after {
			content: "";
			display: block;
			border-bottom: 4px solid #df2d2d;
			width: 100%;
		}
	}
	
</style>