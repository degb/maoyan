import API from '../api'
import http from '../utils/http'
//获取城市
export function getCityList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CITY_API,
            method: 'GET'
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
            }else{
                //请求成功
                // 取得首字母，按字母先分类
                let map = {};
                data.cts.map(item=>{
                    let letter = item.py[0];
                    if(!map[letter]){
                        map[letter] = [];
                    }
                    map[letter].push(item);
                })
             
                let keys = Object.keys(map);
                //排序
                // 选择排序
                for(let i = 0; i < keys.length; i++){
                    for(let j = i+1; j < keys.length; j++){
                        if(keys[i] > keys[j]){
                            let tmp = keys[i];
                            keys[i] = keys[j];
                            keys[j] = tmp;
                        }
                    }
                }
                
                //组装数据
                let newData = keys.map(item=>{
                    return {
                        key: item, 
                        value: map[item]
                    }
                })
                resolve({
                    keys: keys,
                    data: newData
                });
            }
        })
        .catch(error=>{
            //请求失败
        })
    })
}


// 搜索影院和电影的接口
export function getCinemaAndMovie(ci,kw,stype){
    return new Promise((resolve, reject)=>{
        http({
            url: API.SEARCH_API,
            method: 'GET',
            data: {
                cityId: ci,
                kw: kw,
                stype: -1
            }
        })
        .then(({data, status})=>{
        	let newCinemaData;
        	let newMovieData;
        	let movieTotal;
        	let cinemaTotal;
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            // 获取影院
            if(data.cinemas){
            	 newCinemaData = data.cinemas.list.map(item=>{
                let {id, nm, sellPrice, addr, sell, snack, vipDesc, distance} = item;
                return {id, nm, sellPrice, addr, sell, snack, vipDesc, distance};
              })
            	 cinemaTotal=data.cinemas.total;
            }else{
            	 newCinemaData=null;
            	 movieTotal='';
            }
            // 获取电影
           if(data.movies){
           	 newMovieData = data.movies.list.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased, wish, rt, cat, enm} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased, wish, rt, cat, enm};
            })
           	  movieTotal=data.movies.total;
           }else{
           		 newMovieData=[];
           		 cinemaTotal='';
           }
            resolve({
                newCinemaData,
                newMovieData,
                movieTotal,
                cinemaTotal
            });
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


//获取点击的电影数据
export function getDetailMovie(movieId){
    return new Promise((resolve, reject)=>{
        http({
            url: API.DETAIL_MOVIE_API,
            method: 'GET',
            data: {
                movieId: movieId
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                return;
            }
            resolve(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })
}










