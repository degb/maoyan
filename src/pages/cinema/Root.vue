<template>

	<div class="page" id="cinema">
		<app-header title="影院"></app-header>
		<header class="sub-header">
			<span class="city-icon" @click="goCityList()">
           		{{city}}
        	</span>
			<section class="search-input" @click="goSearch()">
				<img src="../../assets/searchImg.png" />
				<span>影院</span>
			</section>
		</header>
		 	<drop/>
		<keep-alive>
			<cinema/>
		</keep-alive>

		<router-view></router-view>
	</div>

</template>

<script>
	
	import cinema from '../../components/cinema/cinema'
	import drop from '../../components/cinema/drop'
	import { mapState } from 'vuex'
	export default {
//		data() {
//			return {
//				brand:[],            //品牌
//				districtList: [],    //行政区
//				hallType:[],         //特殊厅
//				service:[],          //服务
//				subwayList: [],      //地铁
//				timeRanges:[],       //时段
//				districtListSubItems:[],     //子级商区列表
//				subwayListSubItems:[],       //子级地铁站
//				nav:['全城','品牌','特色'],
//				n: 0,
//				m:0,
//				o:0,
//				tab: true,
//				display:false,
//				displayWhich:0,
//				tese:0,
//				tesu:0
//			}
//		},
		components: {
			'cinema': cinema,
			'drop':drop
		},
		computed: {
			...mapState(['city'])
		},
		methods: {
//			navAction(index) {
//				this.navIndex = index;
//			},
			//进入城市列表页面，选择城市
			goCityList() {
				this.$router.push('/movie/city-list');
			},
//			select(tf) {
//				this.tab = tf;
//			},
			goSearch() {
				this.$router.push('/cinema/SearchCinema');
			}
//			leftBtnAction(index) {
//				this.n = index;
//				this.districtListSubItems=this.districtList[this.n];
//				this.subwayListSubItems=this.subwayList[this.n];
//			},
//			selectBrand(index){
//				this.o=index;
//			},
//			rightBtnAction(index) {
//				this.m = index;
//			},
//			selectDisplay(index){
//				this.display=!this.display;
//				this.displayWhich=index;
//			},
//			selectTese(index){
//				this.tese=index;
//			},
//			selectTesu(index){
//				this.tesu=index;
//			}
		}
//		created() {
//			//初始化请求数据
//			getFilter(this.cityID).then((data) => {
//				
//				    this.brand=data.brand.subItems;                      //品牌
//					this.districtList = data.district.subItems;          //行政区
//					this.subwayList = data.subway.subItems;              //地铁站
//					this.hallType=data.hallType.subItems;                //特殊厅
//					this.service=data.service.subItems;                  //服务
//			})
//
//		}

	}
</script>

<style lang="scss" scoped>
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
			span{
				color: #f03d37 !important;
			}
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
		overflow: hidden;
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
		top: 89px;
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
			top: 129px;
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