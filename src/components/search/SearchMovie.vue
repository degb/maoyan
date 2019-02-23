<template>
	<div id="searchMovie">
		<div class="result">
			<h3 class="title">电影/电视剧/综艺</h3>
			<div class="list">
				<div class="movieItem" v-for="item in searchMovieList" :key="item.id">
					<div class="movieImg">
						<img :src="item.img" alt="">
					</div>
					<div class="info">
						<div class="name-score">
							<p class="name">
					            <span class="one-line">{{item.nm}}</span>
					            <span class="version " :class="[{imax: item.version=='v3d imax'},{v3d: item.version=='v3d'}]"></span>
          					</p>
          					<span class="score">
          						<div class="no-score" v-if="item.sc==0&&item.wish==0">暂无评分</div>
                				<div v-if="item.sc!=0&&item.wish==0"><span class="num">{{item.sc}}</span>分</div>
                				<div v-if="item.sc==0&&item.wish!=0"><span class="num">{{item.wish}}</span>人想看</div>
              				</span>
						</div>
						<div class="detail-section">
							<div class="detail-items">
								<p class="ename one-line">{{item.enm}}</p>
								<p class="catogary">{{item.cat}}</p>
								<p class="release">{{item.rt}}</p>
							</div>
							<div class="btn toggle-wish-btn"  v-if="item.showst==1">
              					<span>想看</span>
            				</div>
						</div>
					</div>
				</div>
			</div>
		    <div class="more-result" v-if="movieTotal>3">查看全部{{movieTotal}}部影视剧</div>
		</div>
	</div>
</template>

<script>
	import { getCinemaAndMovie } from "../../services/otherService";
	export default {
		name: "search-movie",
		props: {
			searchMovieList: Array,
			movieTotal:Number
		},
		methods: {
			cancel() {
				this.$router.back();
			}

		}
	};
</script>

<style lang="scss" scoped>
	#searchMovie {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 426px;
		overflow: hidden;
		margin-bottom: 10px;
	}
	.one-line{
		white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
	.result {
		width: 100%;
		height: 426px;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		margin-bottom: 10px;
		background-color: #fff;
		h3 {
			font-size: 15px;
			color: #999;
			padding: 9px 15px;
		}
		.list {
			padding-left: 15px;
			border-top: 1px solid #e6e6e6;
			border-bottom: 1px solid #e6e6e6;
			height: 345px;
			overflow: hidden;
			.movieItem:last-child {
	    		border-bottom: none;
			}
			.movieItem {
				padding: 12px 0;
				min-height: 90px;
				border-bottom: 1px solid #e6e6e6;
				.movieImg {
					background-color: #eee;
					width: 64px;
					height: 90px;
					float: left;
					margin-right: 10px;
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.info {
					margin-right: 15px;
					margin-top: 1px;
					.name-score{
						font-size: 16px;
					    color: #222;
					    display: -webkit-box;
					    display: flex;
					    -webkit-box-pack: justify;
					    justify-content: space-between;
					    margin-bottom: 2px;
						.name{
							display: flex;
						    -webkit-box-align: center;
						    align-items: center;
						    -webkit-box-flex: 1;
						    flex-grow: 1;
						    max-height: 24px;
						    overflow: hidden;
						    white-space: nowrap;
						    text-overflow: ellipsis;
						    .one-line{
						    	display: inline-block;
							    font-weight: 700;
							    font-size: 17px;
						    }
						    .version{
					    	    background-size: contain;
							    background-repeat: no-repeat;
							    height: 14px;
							    margin-left: 5px;
							    display: inline-block;
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
						.score{
							color: #fa0;
						    font-size: 10px;
						    flex-shrink: 0;
						    padding-left: 5px;
						    .num{
						    	font-size: 16px;
						    }
						    .no-score{
						    	font-size: 14px;
							    color: #666;
							    flex-shrink: 0;
						    }
						}
					}
					.detail-section{
						position: relative;
						.detail-items{
							-webkit-box-flex: 1;
						    flex-grow: 1;
						    overflow: hidden;
						    padding-right: 10px;
						    margin-right: 48px;
						    min-height: 27px;
						    .ename,.catogary,.release{
						    	font-size: 13px;
							    color: #666;
							    margin-top: 2px;
						    }
						}
						.btn{
							color: #fff;
						    border-radius: 4px;
						    font-size: 12px;
						    -webkit-align-self: flex-end;
						    align-self: flex-end;
						    flex-shrink: 0;
						    width: 48px;
						    text-align: center;
						    height: 27px;
						    line-height: 27px;
						    right: 0;
						    position: absolute;
						    top: 0;
						    bottom: 0;
						    margin: auto;
						}
						.toggle-wish-btn{
							background-color: #faaf00;
						    border: none;
						    color: #fff;
						}
					}
				}
			}
		}
		.more-result{
			text-align: center;
		    line-height: 44px;
		    height: 44px;
		    font-size: 15px;
		    color: #ef4238;
		}
	}
</style>