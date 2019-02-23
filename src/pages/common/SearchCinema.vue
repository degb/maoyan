<template>
	<div id="search" class="page">
		<app-header title="猫眼电影">
			<div slot="left" class="iconfont icon-zuo" @click="backAction"></div>
		</app-header>

		<div class="search">
			<img class="search-icon" src="../../assets/searchImg.png" />
			<input type="search" placeholder="搜影院" v-model="val" />
			<img class="del-input" style="display: none;" alt="" src="../../assets/searchClose.png" @click="cancel()">
		</div>
		<div class="result">
			<search-cinema class="cinema" :searchCinemaList="this.searchCinemaList" :cinemaTotal="this.cinemaTotal" v-if="cinemaTotal"></search-cinema>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import { getCinemaAndMovie } from "../../services/otherService";
	import { mapState } from "vuex";
	import SearchCinema from '../../components/search/SearchCinema';
	export default {
		components: {
			'search-cinema': SearchCinema
		},
		data() {
			return {
				searchCinemaList: [],
				cinemaTotal: null,
				val: ""
			};
		},
		computed: {
			...mapState(["city"]),
			...mapState(["cityID"])
		},
		methods: {
			cancel() {
				this.$router.back();
			},
			backAction() {
				this.$router.back();
			}
		},
		watch: {
			val: function() {
				getCinemaAndMovie(this.cityID, this.val).then(data => {
					console.log(data)
					if(data.newCinemaData) {
						this.searchCinemaList = data.newCinemaData;
						this.cinemaTotal = data.cinemaTotal;
					} else {
						this.searchCinemaList = [];
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#search {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		background-color: #f5f5f5;
	}
	.cinema{
		position: absolute;
		top: 0;
	}
	.result {
		width: 100%;
		position: absolute;
		top: 94px;
		height: 100%;
	}
	
	.search {
		position: relative;
		top: 44px;
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		-webkit-box-flex: 1;
		margin: 10px 10px;
		flex-grow: 1;
		z-index: 10;
		overflow: hidden;
		.search-icon {
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 15px;
			height: 15px;
			margin-right: 6px;
			float: left;
			position: relative;
			top: 6px;
		}
		input {
			-webkit-box-flex: 1;
			flex: 1;
			border: none;
			font-size: 13px;
			color: #333;
			line-height: 20px;
			padding: 4px 0;
			width: calc(100% - 40px);
			padding-left: 10px;
		}
		.del-input {
			display: block;
			position: absolute;
			width: 15px;
			height: 15px;
			float: right;
			top: 6px;
		}
	}
	
	.hot-search {
		position: relative;
		top: 44px;
		left: 0;
		padding: 0 0 8px 15px;
		background-color: #fff;
		h3 {
			border-top: 1px solid #e5e5e5;
			padding-top: 17px;
			font-size: 15px;
			color: #666;
		}
		.hot-movies-wrap {
			margin-top: 15px;
			padding-right: 15px;
			overflow: hidden;
		}
	}
</style>