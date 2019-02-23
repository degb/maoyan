import http from '../utils/http'
import API from '../api'


//请求正在热映的电影数据
export function getPlayingList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data: {
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            
            let newData = data.movieList.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve({
                data: newData,
                ids: data.movieIds
            });
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


//请求更多正在热映的电影数据
export function getMorePlayingList(ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds: ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}




//请求即将上映的电影数据
export function getComingList(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data: {
                ci: ci,
                token: '',
                limit: 10
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败，提醒用户
                return;
            }
            //请求成功
            //过滤数据
            let newData = data.coming.map(item=>{
                let {comingTitle,id,img,nm,wish,rt,showInfo,star,showst} = item;
                img = img.replace(/w.h/, '128.180');
                return {comingTitle,id,img,nm,wish,rt,showInfo,star,showst};
            })
            //对数据进行分类
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            resolve({
            	dataResult:newData,
                data: dataMap,
                ids: data.movieIds
            });
        })
        .catch(error=>{
            //请求失败
        })
    })
}


//请求更多即将上映的电影数据
export function getMoreComingList(ci,ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORE_COMING_API,
            method: 'GET',
            data: {
            	ci:ci,
                token: '',
                limit:10,
                movieIds: ids
            }
        })

        
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {comingTitle,id,img,nm,wish,rt,showInfo,star,showst} = item;
                img = img.replace(/w.h/, '128.180');
                return {comingTitle,id,img,nm,wish,rt,showInfo,star,showst};
            })
            
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 请求最受期待的电影数据
export function getMostExpectedData(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOST_EXPECTED_API,
            method: 'GET',
            data: {
                ci: ci,
                limit: 10,
                offset: 0,
                token: ''
            }
        })
        .then(({data, status})=>{
           if(status != 200){
                //请求失败
                return;
            }
           let newData = data.coming.map(item=>{
              let {id, nm, img, comingTitle,wish,wishst} = item;
               comingTitle=comingTitle.split(' ')[0];
                return {id, nm, img, comingTitle,wish,wishst};
          })
            //请求成功
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
        })
    })
}
// 请求更多最受期待的电影数据
export function getMoreMostExpectedData(num){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOST_EXPECTED_API,
            method: 'GET',
            data: {
                ci: 30,
                limit: 10,
                offset: num,
                token: ''
            }
        })
        .then(({data, status})=>{
           if(status != 200){
                //请求失败
                return;
           }
           let newMoreData = data.coming.map(item=>{
              let {id, nm, img, comingTitle,wish,wishst} = item;
               comingTitle=comingTitle.split(' ')[0];
                return {id, nm, img, comingTitle,wish,wishst};
          })
            //请求成功
            resolve(newMoreData);
        })
        .catch(error=>{
            //请求失败
        })
    })
}




// 请求正在播放详情页
export function getPlayingDetail(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.PLAYING_DETAIL_API,
            method: 'GET',
            data: {
                movieId: id,
            }
        })
        .then(({data, status})=>{
           if(status != 200){
                //请求失败
                return;
           }
                data.detailMovie.img = data.detailMovie.img.replace(/w.h/, '128.180');
                data.detailMovie.snum=(data.detailMovie.snum/10000).toFixed(1);
            //请求成功
            resolve(data);
        })
        .catch(error=>{
            //请求失败
        })
    })
}


// 请求电影详情
export function getMovieDetail(id,time,ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIE_DETAIL_API,
            method: 'POST',
            data: {
                movieId: id,
//				day: 2018-11-25,
				offset: 0,
				limit: 20,
				districtId: -1,
				lineId: -1,
				hallType: -1,
				brandId: -1,
				serviceId: -1,
				areaId: -1,
				stationId: -1,
				updateShowDay: true,
				reqId: time,
				cityId: ci,
				forceUpdate:15431484
            }
        })
        .then(({data, status})=>{
        	console.log(data);
           if(status != 200){
                //请求失败
                return;
           }
//          var arr1=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
//        	var arr2=['今天','明天','后天'];
//          var dateStr=new Date().getDay();
//        
//          for(var j=3;j<7;j++){
//          	for(var k=0;k<6;k++){
//          		arr2.push(arr1[dateStr+k]);
//          	}
//	               
//          }
//        data.showDays.dates.map(item=>{
//        	item.date=item.date.split('-');
//        	item.date=item.date[1]+'月'+item.date[2]+'日';
//          })
//        	for(let i=0;i<7;i++){
//        		data.showDays.dates[i].date=arr2[i]+data.showDays.dates[i].date;
//        	}
        	console.log(data);
          	
            //请求成功
            resolve(data);
        })
        .catch(error=>{
            //请求失败
        })
    })
}