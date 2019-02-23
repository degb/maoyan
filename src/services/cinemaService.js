import http from '../utils/http'
import API from '../api'


//请求正在热映的电影数据
export function getCinemaList(city){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CINEMA_API,
            method: 'GET',
            data: {
                day:'2018-11-17',
				offset:0,
				limit:100,
				districtId:-1,
				lineId:-1,
				hallType:-1,
				brandId:-1,
				serviceId:-1,
				areaId:-1,
				stationId:-1,
				item:'',
				updateShowDay:true,
				reqId:1542442758746,
				cityId:city
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}



//请求正在热映的电影数据
export function getFilter(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.FILTER_CINEMA_API,
            method: 'GET',
            data: {
				cityId:30
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}



//请求正在热映的电影数据
export function getShows(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CINEMA_DETAIL_APT,
            method: 'GET',
            data: {
				cinemaId:96
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}