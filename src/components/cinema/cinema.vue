<template>
	<app-content :style="{top: '129px', bottom: '44px'}">
		<div class="cinema">
			<ul>
				<li v-for="item in cinemaList" @click="goShows()">
					<div class="title-block">
						<div class="title">
							<span>{{item.nm}}</span>
							<span class="price-block">
                <span class="price">{{item.sellPrice}}</span><span class="q">元起</span>
							</span>
						</div>

						<div class="location-block box-flex">
							<div class="flex line-ellipsis">{{item.addr}}</div>
							<div class="distance">{{item.distance}}</div>
						</div>

						<div class="label-block">
							<div class="allowRefund" v-if="item.tag.allowRefund==1">退</div>
							<div class="endorse" v-if="item.tag.endorse==1">改签</div>
							<div class="snack" v-if="item.tag.snack==1">小吃</div>
							<div class="vipTag" v-if="item.tag.vipTag">{{item.tag.vipTag}}</div>
							<div class="hallType" v-for="item in  item.tag.hallType">{{item}}</div>
						</div>

						<div class="discount-block" v-if="item.promotion.cardPromotionTag">
							<div class="discount-label normal card">
								<img src="../../assets/card.png" />
							</div>
							<div class="discount-label-text">{{item.promotion.cardPromotionTag}}</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</app-content>
</template>

<script>
	import { getCinemaList } from '../../services/cinemaService'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				cinemaList: []
			}
		},
		computed: {
			...mapState(['cityID'])
		},
		created() {
			//初始化请求数据
			getCinemaList(this.cityID).then((data) => {
				this.cinemaList = data.cinemas;
			})

		},
		methods: {
			goShows() {
				this.$router.push('../../cinema/shows');
			}
		},
		watch: {
			cityID() {
				getCinemaList(this.cityID).then((data) => {
					this.cinemaList = data.cinemas;
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	ul {
		overflow: hidden;
		background: #fff;
	}
	
	.line-ellipsis {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.flex {
		-webkit-box-flex: 1;
		flex: 1;
	}
	
	li {
		padding: 13px 15px 13px 0;
		margin-left: 15px;
		background-color: #fff;
		position: relative;
		overflow: hidden;
		.title-block {
			line-height: 1.5;
			display: block;
			align-items: center;
			.title {
				height: 23px;
				line-height: 23px;
				font-size: 16px;
				color: #000;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				.price-block {
					padding-top: 9px;
					padding-left: 3px;
					.price {
						color: #f03d37;
					}
					.q {
						font-size: 11px;
						color: #f03d37;
						margin-left: 3px;
					}
				}
			}
			.location-block {
				margin-top: 6px;
				font-size: 13px;
				color: #666;
				.distance {
					margin-left: 5px;
				}
			}
			.box-flex {
				display: -webkit-box;
				display: flex;
			}
			.label-block {
				height: 17px;
				line-height: 17px;
				margin-top: 4px;
				margin-bottom: 4px;
				overflow: hidden;
				font-size: 0;
				flex-shrink: 0;
				div {
					position: relative;
					display: inline-block;
					padding: 0 3px;
					height: 15px;
					line-height: 15px;
					border-radius: 2px;
					font-size: .6rem;
				}
				.endorse,
				.hallType {
					color: #589daf;
					border: 1px solid #589daf;
				}
				.allowRefund,
				.snack,
				.vipTag {
					color: #f90;
					border: 1px solid #f90;
				}
			}
			.discount-block {
				color: #999;
				margin-bottom: 4px;
				display: flex;
				.discount-label {
					width: 15px;
					height: 14px;
					position: relative;
					top: 3px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.discount-label-text {
					margin-left: 0;
					font-size: 11px;
					display: inline-block;
				}
			}
		}
	}
</style>