<template>
		<div class="cinemaList">
			<h3>影院</h3>
			<div class="list">
				<li v-for="(item, index) in searchCinemaList" :key="index" @click="itemActive(index)">
					<p>
						<span class="cinemaName">{{item.nm}}</span>
						<span class="sellPrice"><font color="#f03d37" font-size="0.16px">{{item.sellPrice}}</font>元起</span>
					</p>
					<p class="addr">{{item.addr}}</p>
					<div class="tip">
						<span v-if="item.sell == true">座</span>
						<span v-if="item.endorse == 1">改签</span>
						<span v-for="(_item, index) in item.hallType" :key="index">{{_item}}</span>
						<span class="snack" v-if="item.snack == 1">小吃</span>
						<span class="sale" v-if="item.vipDesc != ''">{{item.vipDesc}}</span>
					</div>
				</li>
			</div>
		    <div class="more-result" v-if="cinemaTotal>3">查看全部{{cinemaTotal}}家电影院</div>
		</div>
</template>

<script>
	import { searchCinema } from '../../services/otherService.js'
	import { mapState } from 'vuex'
	export default {
		name: 'search-cinema',
		props:{
			searchCinemaList:Array,
			cinemaTotal:Number
		},
		computed: {
			...mapState(['city']),
			...mapState(['cityID'])
		},
		methods: {
			cancel() {
				this.$router.back();
			},
			itemActive(index) {
				console.log(index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cinemaList {
		width: 100%;
		height: 392.6px;
		overflow: hidden;
		margin-bottom: 10px;
		background: #fff;
		h3 {
			font-size: 15px;
		    color: #999;
		    padding: 9px 15px;
		}
		.list {
			padding-left: 15px;
			border-top: 1px solid #e6e6e6;
			border-bottom: 1px solid #e6e6e6;
			height: 309.6px;
			overflow: hidden;
			li:nth-child(2) {
		    border-bottom: none;
		  }
		}
		
		.more-result{
			text-align: center;
		    line-height: 44px;
		    height: 44px;
		    font-size: 15px;
		    color: #ef4238;
		}
		li {
			width: 100%;
			min-height: 80px;
			margin: 10px 0;
			padding-bottom: 10px;
			border-bottom: 1px solid #ccc;
			p {
				width: 100%;
				display: flex;
				.cinemaName {
					display: inline-block;
					max-width: 70%;
					font-size: 16px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.sellPrice {
					margin-left: 10px;
					font-size: 12px;
					font {
						font-size: 16px;
					}
				}
			}
			.addr {
				display: inline-block;
				width: 70%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding: 5px 0;
				color: #999;
				font-size: 12px;
			}
			.tip {
				width: 70%;
				font-size: 10px;
				white-space: wrap;
				span {
					display: inline-block;
					min-width: 10px;
					height: 20px;
					line-height: 18px;
					text-align: center;
					padding: 0 5px;
					color: #589daf;
					border: 1px solid #589daf;
					border-radius: 3px;
					margin: 2px 2px;
				}
				.snack,
				.sale {
					color: #f90;
					border: 1px solid #f90;
				}
			}
		}
	}
</style>