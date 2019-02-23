const SAT_HOST='http://localhost:8080';





//正在热映接口
//	   token 用户标识

const PLAYING_API = '/ajax/movieOnInfoList';

//即将上映的接口
//    ci 城市id
//    token 用户标识
//    limit 数据长度

const COMING_API = '/ajax/comingList';
/*
更多正在热映数据的接口
参数：
    token 用户标识
    movieIds  请求的电影id
*/
const MORE_PLAYING_API = '/ajax/moreComingList';



//参数:
//ci        
//token
//limit
//movieIds
const MORE_COMING_API = './ajax/moreComingList';
/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';

//城市页面
const CITY_API='/dianying/cities.json'
//电影院

//day=2018-11-17
//offset=0
//limit=20
//districtId=-1
//lineId=-1
//hallType=-1
//brandId=-1
//serviceId=-1
//areaId=-1
//stationId=-1
//item=
//updateShowDay=true
//reqId=1542442758746
//cityId=10
const CINEMA_API='/ajax/cinemaList';

/*
搜索的接口
参数 
	kw:
    cityId: 30
    stype: 2
*/
const SEARCH_API = '/ajax/search'
/*
获取点击的电影数据
参数 movieId=42964
*/
const DETAIL_MOVIE_API = '/ajax/detailmovie'


//获取影院下拉选择的filter数据
//ci
const FILTER_CINEMA_API='/ajax/filterCinemas'








//获取正在热映的电影的详情信息
// ?movieId=341213
 const PLAYING_DETAIL_API='/ajax/detailmovie'
 
 
// ?forceUpdate=1543022891563
 const MOVIE_DETAIL_API='/ajax/movie'
 
 
// /ajax/cinemaDetail?
//cinemaId=23768
const CINEMA_DETAIL_APT='/ajax/cinemaDetail'
export default{
	SAT_HOST,
	PLAYING_API,
	MORE_PLAYING_API,
	COMING_API,
	MORE_COMING_API,
	MOST_EXPECTED_API,
	CITY_API,
	CINEMA_API,
	SEARCH_API,
	DETAIL_MOVIE_API,
	FILTER_CINEMA_API,
	PLAYING_DETAIL_API,
	MOVIE_DETAIL_API,
	CINEMA_DETAIL_APT
}
