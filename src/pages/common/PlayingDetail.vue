<template>
	<div id="detail">
		<app-header :title="data.nm">
			<div slot="left" class="iconfont icon-zuo" @click="backAction"></div>
		</app-header>
		<div class="movie-detail">
			<div class="movie-filter"></div>
			<div class="poster-bg" :style="'backgroundImage:url('+data.img+')'"></div>
			<!--detail-->
			<div class="detail">
				<div class="poster">
					<img :src="data.img" />
				</div>
				<div class="content">
					<div class="title ellipsis">{{data.nm}}</div>
					<div class="title-en-name ellipsis">{{data.enm}}</div>
					<div class="score ellipsis">
						{{data.sc}}
						<span class="snum">({{data.snum}}人评)</span>
					</div>
					<div class="type ellipsis">
						<span>{{data.cat}}</span>
						<div class="type-group">
							<img style="width: 42px;" src="../../assets/3dMax.png" v-if="data.version=='v3d imax'">
							<img style="width: 42px;" src="../../assets/3d.png" v-if="data.version=='v3d'">
						</div>

					</div>
					<div class="src ellipsis">{{data.src}}/{{data.dur}}分钟</div>
					<div class="pubDesc ellipsis">{{data.pubDesc}}</div>
				</div>
			</div>
			<!--右箭头-->
			<div class="arrow-g">
				<img src="../../assets/arrow-g.png" />
			</div>
		</div>
		<!--日期nav-->
		<div id="showDays">
			<ul id="timeline">
				<li class="showDay" v-for="(item,index) in dates" :class="{chosen:active==index}" @click="select(index)">
					{{item.date}}
				</li>
			</ul>
		</div>
<!--....................................................-->
<div class="page-wrap">
			<div class="nav-wrap">
				<div class="item" @click="selectDisplay(index)" v-for="(item,index) in nav">{{item}}<span class="drop"></span></div>
			</div>
		</div>
			<!--下拉列表-->
			<div class="drop_list" v-if="display">
				<!--全城-->
				<div class="page region" v-show="displayWhich==0">
					<!--商区/地铁站-->
					<div id="region-tab">
						<ul>
							<li class="" @click="select('0')" :class="{chosen:tab=='0'}">商区</li>
							<li @click="select('1')" :class="{chosen:tab=='1'}">地铁站</li>
						</ul>
					</div>
					<!--商区列表-->
					<div class="region-list" v-if="tab=='0'">
						<!--商区列表-->
						<div class="region-sidenav">
							<div class="district">
								<div class="district-li" v-for="(item,index) in districtList" @click="leftBtnAction(index)" :class="{chosen:n==index}">
									{{item.name}}({{item.count}})
								</div>
							</div>
						</div>
						<!--商区子级列表-->
						<div class="region-list-item">
							<div class="filter-list">
								<div class="item" v-for="(item,index) in districtListSubItems.subItems" @click="rightBtnAction(index,item)" :class="{chosen:m==index}">
									<span class="item-name">{{item.name}}</span>
									<span class="item-count">{{item.count}}</span>
								</div>
							</div>
						</div>
					</div>
					<!--地铁站列表-->
					<div class="region-list" v-if="tab=='1'">
						<div class="region-sidenav">
    						<div class="district">
	    						<div class="district-li" v-for="(item,index) in subwayList" @click="leftBtnAction(index)" :class="{chosen:n==index}">
	    							{{item.name}}({{item.count}})
	    						</div>
    						</div>
    					</div>
    					<!--地铁站子级列表-->
						<div class="region-list-item">
							<div class="filter-list">
								<div class="item" v-for="(item,index) in subwayListSubItems.subItems" @click="rightBtnAction(index)" :class="{chosen:m==index}">
									<span class="item-name">{{item.name}}</span>
									<span class="item-count">{{item.count}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
		        <!--品牌-->
		        <div class="page brand" v-show="displayWhich==1">
		        	<div class="brand-content">
		        		<div class="item brand-list" v-for="(item,index) in brand" :class="{chosen:o==index}" @click="selectBrand(index)">
		        			<span class="item-name">{{item.name}}</span>
		        			<span class="item-count">{{item.count}}</span>
		        		</div>
		        	</div>
		        </div>     
			    <!--特色-->
			    <div class="page special" v-show="displayWhich==2">
		        	<div class="special-content">
		        		<div class="item-title">特色功能</div>
		        		<div class="item-list">
		        			<div class="item" v-for="(item,index) in service"  :class="{chosen:tese==index}" @click="selectTese(index)">{{item.name}}</div>
		        		</div>
		        		<div class="item-title">特殊厅</div>
		        		<div class="item-list">
		        			<div class="item" v-for="(item,index) in hallType"  :class="{chosen:tesu==index}" @click="selectTesu(index)">{{item.name}}</div>
		        		</div>
		        	</div>
		        	<div class="special-btn"  >
		        		<span class="btn" id="cancel-btn">重置</span>
		        		<span class="btn" id="confirm-btn" @click="confirm">确定</span>
		        	</div>
		        </div>
			</div>






<!--........................................-->
		<!---->
		<div class="list">
			<ul>
				<li v-for="item in cinemaList">
					<div class="title-block">
						<div class="title">
							<span>{{item.nm}}</span>
							<span class="price-block">
                <span class="price">{{item.sellPrice}}</span><span class="q">元起</span>
							</span>
						</div>

						<div class="location-block box-flex">
							<div class="flex ellipsis">{{item.addr}}</div>
							<div class="distance">{{item.distance}}</div>
						</div>

						<div class="label-block">
							<div class="allowRefund" v-if="item.tag.allowRefund">退</div>
							<div class="endorse" v-if="item.tag.endorse">改签</div>
							<div class="snack" v-if="item.tag.snack">小吃</div>
							<div class="vipTag" v-if="item.tag.vipTag">{{item.tag.vipTag}}</div>
							<div class="hallType" v-for="item in  item.tag.hallType">{{item}}</div>
						</div>

						<div class="discount-block" v-if="item.promotion.cardPromotionTag">
							<div class="discount-label normal card">
								<img src="../../assets/card.png" alt="">
							</div>
							<div class="discount-label-text">{{item.promotion.cardPromotionTag}}</div>
						</div>
					</div>
					<div class="min-show-block">
						<span>近期场次：</span>
						<span class="time-line">{{item.showTimes}} </span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { getPlayingDetail, getMovieDetail } from "../../services/movieService";
	import { getFilter } from '../../services/cinemaService'
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				data: {},
				day: [],
				time: new Date().getTime(),
				dates: [],
				cinemaList: [],
				active:0,
				cinemaList: [],
				brand:[],            //品牌
				districtList: [],    //行政区
				hallType:[],         //特殊厅
				service:[],          //服务
				subwayList: [],      //地铁
				timeRanges:[],       //时段
				districtListSubItems:[],     //子级商区列表
				subwayListSubItems:[],       //子级地铁站
				nav:['全城','品牌','特色'],
				n: 0,
				m:0,
				o:0,
				tab: 0,
				display:false,
				displayWhich:0,
				tese:0,
				tesu:0,
				id:30
			}
		},
		computed: {
			...mapState(['cityID']),
			...mapState(['city'])
		},
		methods: {
			cancel() {
				this.$router.back();
			},
			backAction() {
				this.$router.back();
			},
			select(index){
				this.active=index;
				this.time=new Date().getTime()+(86400000*index);  
				getMovieDetail(localStorage.id,this.time,this.cityID).then(data => {
				this.dates = data.showDays.dates;
				this.cinemaList = data.cinemas;
			})
			},
//			.....
navAction(index) {
				this.navIndex = index;
			},
			//进入城市列表页面，选择城市
			goCityList() {
				this.$router.push('/movie/city-list');
			},
			select(tf) {
				this.tab = tf;
			},
			goSearch() {
				this.$router.push('/cinema/SearchCinema');
			},
			confirm(){
				this.display=false;
			},
			leftBtnAction(index) {
				this.n = index;
				this.districtListSubItems=this.districtList[this.n];
				this.subwayListSubItems=this.subwayList[this.n];
			},
			selectBrand(index){
				this.o=index;
				this.display=false;
			},
			rightBtnAction(index,item) {
				this.m = index;
				getFilter(item.id).then((data) => {
				    this.brand=data.brand.subItems;                      //品牌
					this.districtList = data.district.subItems;          //行政区
					this.subwayList = data.subway.subItems;              //地铁站
					this.hallType=data.hallType.subItems;                //特殊厅
					this.service=data.service.subItems;                  //服务
			})
				this.display=false;
			},
			selectDisplay(index){
				this.display=!this.display;
				this.displayWhich=index;
			},
			selectTese(index){
				this.tese=index;
			},
			selectTesu(index){
				this.tesu=index;
			}
		},
		created() {
			getPlayingDetail(localStorage.id).then(data => {
				this.data = data.detailMovie;
			})
			getMovieDetail(localStorage.id,this.time,this.cityID).then(data => {
				this.dates = data.showDays.dates;
				this.cinemaList = data.cinemas;
			})
//			......
//初始化请求数据
			getFilter(this.cityID).then((data) => {
				    this.brand=data.brand.subItems;                      //品牌
					this.districtList = data.district.subItems;          //行政区
					this.subwayList = data.subway.subItems;              //地铁站
					this.hallType=data.hallType.subItems;                //特殊厅
					this.service=data.service.subItems;                  //服务
			})

		}
	}
</script>

<style lang="scss" scoped>
	#detail {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		background-color: #f5f5f5;
		font-size: 14px;
		color: #777;
	}
	/*movie-detail*/
	
	.movie-detail {
		height: 188px;
		position: relative;
		cursor: pointer;
		top: 44px;
		.movie-filter {
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			background-color: #333;
		}
		.poster-bg {
			width: 100%;
			height: 100%;
			z-index: -1;
			overflow: hidden;
			position: absolute;
			-webkit-filter: blur(1.2rem);
			filter: blur(1.2rem);
			background-size: cover;
			background-repeat: no-repeat;
			opacity: .55;
		}
		.detail {
			height: 150px;
			padding: 19px 30px 19px 15px;
			display: flex;
			.poster {
				img {
					width: 110px;
					height: 150px;
					box-sizing: border-box;
				}
			}
			.content {
				flex: 1;
				overflow-x: hidden;
				margin-left: 12.5px;
				line-height: 1;
				color: #fff;
				.title {
					font-size: 20px;
					margin-top: 2px;
					font-weight: 700;
					overflow: hidden;
				}
				.title-en-name {
					margin-top: 10px;
					font-size: 12px;
					color: #fff;
					opacity: .8;
				}
				.score {
					font-size: 18px;
					font-weight: 700;
					color: #fc0;
					margin-top: 11px;
					.snum {
						margin-top: 10px;
						font-size: 12px;
						color: #fff;
						opacity: .8;
					}
				}
				.type {
					margin-top: 10px;
					font-size: 12px;
					color: #fff;
					opacity: .8;
					span {
						vertical-align: top;
					}
					.type-group {
						display: inline-block;
						width: 42px;
						opacity: .85;
					}
				}
				.src {
					margin-top: 10px;
					font-size: 12px;
					color: #fff;
					opacity: .8;
				}
				.pubDesc {
					margin-top: 10px;
					font-size: 12px;
					color: #fff;
					opacity: .8;
				}
			}
		}
		.arrow-g {
			position: absolute;
			width: 10px;
			right: 15px;
			top: 50%;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
		}
	}
	
	#showDays {
		width: 100%;
		background-color: #fff;
		overflow-x: scroll;
		height: 45px;
		position: absolute;
		top: 232px;
		#timeline {
			padding: 0;
			margin: 0;
			white-space: nowrap;
			overflow-x: scroll;
			height: 45px;
			background: url(../../assets/line.png) 0 bottom no-repeat;
			.showDay {
				padding: 0;
				margin: 0;
				position: relative;
				display: inline-block;
				width: 115px;
				line-height: 43px;
				margin-left: 4.5px;
				font-size: 14px;
				text-align: center;
				list-style: none;
				color: #666;
				&.chosen {
					border-bottom: 2px solid #f03d37;
					color: #f03d37;
				}
			}
		}
	}
	
	.list {
		position: absolute;
		top: 317px;
		background: #fff;
		width: 100%;
	}
	
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
		.min-show-block{
			    padding: 0 15px 0 0;
			    margin-right: -15px;
			    line-height: 1.5;
			    font-size: 0;
			    span{
			    	font-size: 12px;
    				color: #999;
			    }
			    .time-line{
			    	display: inline-block;
    				position: relative;
			    }
		}
	}
	
	
	
	
	
	
	
	
	
	/*...........*/
	#drop{
	width: 100%;
	height: 377px;
	position: absolute;
	top: 89px;
	left: 0;
	z-index: 11;
	
}
	li {
		&.chosen {
			color: #f03d37;
			&::after {
				content: "";
				position: absolute;
				display: block;
				bottom: 0;
				left: 0;
				width: 90%;
				border-top: 2px solid #f03d37;
			}
		}
	}
	
	.district .chosen {
		color: #f03d37;
		background: #f5f5f5;
	}
	
	.item{
		&.chosen{
				color: #f03d37 !important;
				border:1px solid #f03d37 !important;
			&::after{
				content: "";
    display: block;
    position: absolute;
    left: 8px;
    top: 19px;
    width: 11.5px;
    height: 8px;
    background-image: url(../../assets/select.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
			}
		}
	}
	.special{
	.item{	
		.chosen{
		background: #fcf0f0;
	    color: #f03d37;
	    border: 1px solid #f03d37;
		}
	 } 
	}
	#cinema {
		width: 100%;
		height: 100%;
	}
	
	.sub-header {
		width: 100%;
		border-bottom: 1px solid #e6e6e6;
		position: absolute;
		left: 0;
		top: 44px;
		color: #777;
		font-size: 14px;
		display: flex;
		align-items: center;
		height: 44px;
		justify-content: space-between;
		background: #f5f5f5;
		.city-icon {
			padding-left: 15px;
			font-size: 15px;
			color: #666;
			display: -webkit-box;
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 70px;
			max-width: 19.2vw;
			&::after {
				content: '';
				display: inline-block;
				width: 0;
				height: 0;
				border: 4px solid #b0b0b0;
				border-left-color: transparent;
				border-right-color: transparent;
				border-bottom-color: transparent;
				transform: translateY(4px);
				margin-left: 4px;
				margin-top: 5px;
			}
		}
		.search-input {
			display: flex;
			flex-grow: 1;
			-webkit-box-pack: center;
			justify-content: center;
			-webkit-box-align: center;
			align-items: center;
			height: 28px;
			font-size: 13px;
			color: #b2b2b2;
			margin-left: 18px;
			border: .5px solid #e6e6e6;
			border-radius: 5px;
			margin-right: 15px;
			background: #fff;
			img {
				display: block;
				width: 14px;
				height: 14px;
				margin-left: 3px;
				margin-right: 4px;
			}
		}
	}
	
	.page-wrap {
		position: absolute;
		left: 0;
		top: 272px;
		width: 100%;
		z-index: 10;
		.nav-wrap {
			width: 100%;
			height: 40px;
			z-index: 10;
			background-color: #fff;
			display: flex;
			.item {
				-webkit-box-flex: 1;
				flex: 1;
				text-align: center;
				line-height: 40px;
				position: relative;
				white-space: nowrap;
				overflow: hidden;
				font-size: 13px;
				text-overflow: ellipsis;
				&::before {
					content: "";
					display: block;
					position: absolute;
					height: 20px;
					top: 10px;
					left: 0;
					border-left: 1px solid #e8e8e8;
				}
				.drop {
					display: inline-block;
					position: absolute;
					top: 18px;
					width: 0;
					height: 0;
					margin-left: 4px;
					border: 4px solid transparent;
					border-top-color: #b0b0b0;
				}
			}
		}
		}
		.drop_list {
			width: 100%;
			height: 337.2px;
			background: #f5f5f5;
			position: absolute;
			top: 40px;
			left: 0;
			z-index: 10;
			.brand{
				height: 285.6px;
				.brand-content{
					.brand-list{
						position: relative;
					    line-height: 44px;
					    height: 44px;
					    padding: 0 15px 0 26px;
					    border-bottom: 1px solid #e5e5e5;
					}
				}
			}
			.page {
				position: relative;
				background-color: #fff;
				overflow: auto;
				z-index: 999;
				font-size: 15px;
				#region-tab {
					height: 44px;
					ul {
						display: flex;
						li {
							position: relative;
							display: inline-block;
							padding: 0 10px;
							width: 50%;
							height: 100%;
							line-height: 44px;
							text-align: center;
							flex: 1;
						}
					}
				}
				.region-list {
					height: 333.2px;
					background: #f5f5f5;
					.region-sidenav {
						width: 35%;
						height: 100%;
						float: left;
						overflow: scroll;
						.district {
							min-height: 100%;
							background: #fff;
							.district-li {
								color: #777;
								height: 44px;
								padding-left: 10px;
								padding-right: 15px;
								line-height: 44px;
								font-size: 14px;
								text-overflow: ellipsis;
								white-space: nowrap;
								overflow: hidden;
							}
							.chosen {
								color: #f03d37;
								background: #f5f5f5;
							}
						}
					}
					.region-list-item {
						width: 65%;
						height: 100%;
						float: right;
						overflow: scroll;
					}
				}
			}
		}
		
		
		
		
		
		
		.filter-list,.brand-content{
							.item {
								position: relative;
								height: 45px;
								line-height: 45px;
								padding: 0 0 0 25px;
								.item-name {
									width: 80%;
									font-size: 14px;
									color: #333;
									text-overflow: ellipsis;
									white-space: nowrap;
									overflow: hidden;
								}
								.item-count {
									float: right;
									width: 20px;
									margin-right: 10px;
									color: #8f9296;
									font-size: 12px;
									text-align: right;
								}
							}
						}
						
						.special{
			height: 343px;
			.special-content{
				height:270px;
				.item-title{
					margin-left: 12px;
				    margin-top: 11px;
				    font-size: 15px;
				}
				.item-list{
					margin: 0 12px 12px;
					.item{
						float: left;
					    width: 21.3%;
					    height: 30px;
					    padding: 3px 0;
					    margin-right: 3%;
					    margin-top: 10px;
					    line-height: 30px;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    text-align: center;
					    border: 1px solid #ccc;
					    border-radius: 5px;
					    font-size: .7rem;
					}
				}
			}
					.special-btn{
						height: 60px;
					    width: 100%;
					    border-top: 1px solid #e5e5e5;
					    margin-top: 10px;
					    background: #fafafa;
					    .btn{
					    	    display: inline-block;
							    height: 34px;
							    width: 21.3%;
							    margin: 13px 11px;
							    border: 1px solid #e5e5e5;
							    border-radius: 6px;
							    text-align: center;
							    line-height: 34px;
							    font-size: 14px;
					    }
					    #confirm-btn{
					    	    float: right;
							    background: #f03d37;
							    border: 1px solid #f03d37;
							    color: #fff;
					    }
					}
				
		}
</style>