<template>
	<app-content id="shows">
		<div class="shows">
			<!--头部-->
			<app-header :title="name">
				<div slot="left" class="iconfont icon-zuo" @click="backAction"></div>
			</app-header>
			<div class="cinema-block">
				<div class="cinema-info">
					<div class="title ellipsis">{{name}}</div>
					<div class="location ellipsis">{{data.addr}}</div>
					<div class="location-icon"><img src="../../assets/location.png"></div>
				</div>
				<div class="wrap">
					<div class="cinema-nav">
						<div class="post-bg"></div>
						<div class="post-bg-filter"></div>
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<div class="swiper-slide"><img src="../../assets/1.jpg"></div>
								<div class="swiper-slide"><img src="../../assets/2.jpg"></div>
								<div class="swiper-slide"><img src="../../assets/1.jpg"></div>
								<div class="swiper-slide"><img src="../../assets/2.jpg"></div>
								<div class="swiper-slide"><img src="../../assets/1.jpg"></div>
								<div class="swiper-slide"><img src="../../assets/2.jpg"></div>
							</div>
						</div>
					</div>
					
					
			<div class="movie-info">
				<div class="movie-title ellipsis">
					<span class="title">毒液：致命守护者</span>
					<span class="grade">
						<span>8.7<span class="small">分</span></span>
						
					</span>
					
				</div>
				<div class="movie-desc ellipsis">88分钟 | 喜剧 | 罗温·艾金森,本·米勒</div>
			</div>
			
				</div>
				
				
				<!--14.00-->
				<div class="list-wrap">
					<div class="item-outer" v-for="item in "></div>
				</div>
			</div>

		</div>
	</app-content>
</template>

<script>
	import { getShows } from '../../services/cinemaService'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				name: '',
				data: {}
			}
		},
		methods: {
			backAction() {
				this.$router.back();
			}
		},
		created() {
			getShows().then((data) => {
				this.name = data.cinemaData.nm;
				this.data = data.cinemaData;
			})

		}

	}
	window.onload = function() {
		var mySwiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
			slidesPerView: 4,

		})
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 20px 15px 20px 5px;
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
		margin-left: auto;
		margin-right: auto;
		position: relative;
		overflow: hidden;
		z-index: 1;
		.cinema-nav {
			.post-bg {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: -1;
				overflow: hidden;
				-webkit-filter: blur(30px);
				filter: blur(30px);
				background-position-y: 40%;
			}
			.post-bg-filter {
				position: absolute;
				width: 100%;
				height: 140px;
				top: 0;
				left: 0;
				background-color: #40454d;
				opacity: .55;
			}
			.swiper-container {
				.swiper-wrapper {
					width: 390px;
					height: 108px;
					.swiper-slide {
						width: 65px;
						height: 108px;
						img {
							width: 65px;
							height: 108px;
						}
					}
				}
			}
		}
		.movie-info {
			padding: 11px 15px;
			text-align: center;
			.movie-title {
				height: 24px;
				line-height: 24px;
				font-size: 17px;
				color: #333;
				font-weight: 700;
			}
			.movie-desc {
				margin-top: 2px;
				height: 18.5px;
				line-height: 18.5px;
				font-size: 13px;
				color: #999;
			}
		}
	}
	
	#shows {
		width: 100%;
		height: 100%;
		z-index: 11;
		background: #fff;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.cinema-block {
		position: absolute;
		top: 40px;
		.cinema-info {
			width: 215px;
			padding-right: 90px;
			position: relative;
			padding: 15px 100px 15px 15px;
			.title {
				font-size: 17px;
				line-height: 24px;
				font-weight: 700;
				color: #333;
			}
			.location {
				margin-top: 2px;
				font-size: 13px;
				line-height: 18.5px;
				color: #999;
			}
			.location-icon {
				position: absolute;
				right: 0;
				top: 50%;
				width: 70px;
				height: 31px;
				-webkit-transform: translateY(-50%);
				transform: translateY(-50%);
				border-left: 1px solid #d8d8d8;
				text-align: center;
				img {
					display: inline-block;
					width: 19px;
					height: 22px;
					margin-top: 5px;
				}
			}
		}
	}
</style>