<template>
	<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
		<div class="coming">
			<div class="expected">
				<p>最受期待的电影：</p>
				<h-scroll class="expected-list" @moreExpectList="moreExpectList" :canLoadMore="canLoadMore">
					<li class="expected-item" v-for="item in expectedList" :key="item.id">
						<div class="img">
							<img :src="item.img | replaceWH(85, 115)" />
						</div>
						<div class="name">{{item.nm}}</div>
						<p class="time">{{item.comingTitle}}</p>
					</li>
				</h-scroll>
			</div>

			<div v-for="(list, key) in comingMap" :key="key">
				<p class="time-title">{{key}}</p>
				<ul>
					<li v-for="item in list" :key="item.id" class="coming-item">
						<div class="item-img">
							<img :src="item.img" />
						</div>
						<div class="item-content">
							<div class="nm">
								<div class="title">{{item.nm}}</div>
								<span class="version " :class="[{imax: item.version=='v3d imax'},{v3d: item.version=='v3d'}]"></span>
							</div>
							<div class="sc"><span>{{item.wish}}</span>人想看</div>
							<div class="star">主演：{{item.star}}</div>
							<div class="show-info">{{item.rt}}上映</div>
						</div>
						<div class="btn-ticket">
							<div class="btn sell" v-if="item.showst==4">
								<span>预售</span>
							</div>
							<div class="btn pre" v-else-if="item.showst==1">
								<span>想看</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</app-content>
</template>

<script>
	import '../../utils/filter'
	import { getComingList, getMoreComingList, getMostExpectedData, getMoreMostExpectedData } from '../../services/movieService'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				comingMap: [],
				morecomingMap: [],
				comingIDS: [],
				canLoadMore: true,
				expectedList: [],
				num: 0
			}
		},
		computed: {
			...mapState(['cityID'])
		},
		methods: {
			moreExpectList() {
				this.num += 10;
				getMoreMostExpectedData(this.num).then((result) => {
					this.expectedList = this.expectedList.concat(...result);
				})
			}, //加载更多数据
			loadMoreData() {
				//取出ids
				let ids = [...this.comingIDS];
				ids = ids.splice(this.initData.length, 10);
				//组装ids
				let comingIDS = ids.join(',');
				// 发送请求
				this.canLoadMore = false;
				getMoreComingList(this.cityID, comingIDS).then(result => {
					this.initData = [...this.initData, ...result];
					result.map(item => {
						if(!this.morecomingMap[item.comingTitle]) {
							this.morecomingMap[item.comingTitle] = [];
						}
						this.morecomingMap[item.comingTitle].push(item);
					});
					this.comingMap = Object.assign({}, this.comingMap, this.morecomingMap);
					if(this.morecomingMap.length >= this.comingIDS.length) {
						//加载完毕
						this.canLoadMore = false;
					} else {
						//还可以继续加载
						this.canLoadMore = true;
					}
				})

			}
		},
		created() {
			//初始化请求数据
			getComingList(this.cityID).then(({
				dataResult,
				data,
				ids
			}) => {
				this.initData = dataResult;
				this.comingMap = data;
				this.comingIDS = ids;
			})

			getMostExpectedData(this.cityID).then(result => {
				this.expectedList = result;
			})

		},
		watch: {
			cityID() {
				getComingList(this.cityID).then(({
						dataResult,
						data,
						ids
					}) => {
						this.initData = dataResult;
						this.comingMap = data;
						this.comingIDS = ids;
					}),
					getMostExpectedData(this.cityID).then(result => {
						this.expectedList = result;
					})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.expected {
		padding: 12px 0 12px 15px;
		border-bottom: 10px solid #F4F4F4;
		.expected-item {
			display: inline-block;
			width: 85px;
			overflow: hidden;
			margin-right: 10px;
			.img {
				width: 85px;
				height: 115px;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.name {
				margin: 0 0 3px;
				font-size: 13px;
				color: #222;
			}
			.time {
				margin: 0;
				font-size: 12px;
				color: #999;
			}
		}
	}
	
	.time-title {
		padding: 12px 15px 0;
		margin: 0;
		font-size: 14px;
		color: #333;
	}
	
	li {
		position: relative;
	}
	
	.coming-item {
		display: flex;
		padding: 10px;
		.item-img {
			width: 64px;
			height: 90px;
			img {
				width: 100%;
			}
		}
		.item-content {
			margin-left: 5px;
			border-bottom: 1px solid #e6e6e6;
			font-size: 13px;
			font-family: PingFangSC-Regular, Hiragino Sans GB, sans-serif;
			color: #666;
			padding-right: 5px;
			margin-right: 48px;
			overflow: hidden;
			.nm {
				max-height: 24px;
				margin-bottom: 7px;
				line-height: 24px;
				overflow: hidden;
				font-weight: bold;
				font-size: 17px;
				color: #333;
				display: flex;
				width: 205.6px;
				.title {
					font-weight: 700;
					padding-right: 5px;
					flex-shrink: 1;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.version {
					display: flex;
					background-size: contain;
					background-repeat: no-repeat;
					height: 14px;
					width: 17px;
					display: inline-block;
					margin-top: 5px;
					margin-right: 3px;
				}
				.v3d {
					background: url(../../assets/3d.png) no-repeat;
					background-size: 100% 100%;
				}
				.imax {
					width: 43px;
					background: url(../../assets/3dMax.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.sc {
				line-height: 13px;
				font-weight: normal;
				span {
					font-weight: 700;
					color: #faaf00;
					font-size: 15px;
				}
			}
			.star {
				margin-top: 6px;
				line-height: 15px;
				width: 205.6px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.show-info {
				margin-top: 6px;
				line-height: 15px;
			}
		}
		.btn-ticket {
			font-size: 12px;
			position: absolute;
			right: 14px;
			top: 0;
			bottom: 0;
			height: 27px;
			margin: auto;
			.btn {
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
			.sell {
				background-color: #3c9fe6;
			}
			.pre {
				background-color: #faaf00;
			}
		}
	}
</style>