import Vue from 'vue'
import Router from 'vue-router'

import Movie from '../pages/movie/Root'
import Cinema from '../pages/cinema/Root'
import Shows from '../pages/cinema/shows'
import Mine from '../pages/mine/Root'
import Search from '../pages/common/Search'
import SearchCinema from '../pages/common/SearchCinema'
import CityList from '../pages/common/CityList'
import PlayingDetail from '../pages/common/PlayingDetail'
Vue.use(Router)

export default new Router({
 routes: [
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'Search',
          component: Search,
          props: {
            type: ['cinema', 'movie']
          }
        },
        {
          path: 'city-list',
          component: CityList
        },
        {
        	path:'detail',
        	component:PlayingDetail
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema,
      children: [
        {
          path: 'SearchCinema',
          component: SearchCinema,
          props: {
            type: ['cinema']
          }
        },
        {
          path: 'city-list',
          component: CityList
        },
        {
        	path:'shows',
        	component:Shows
        }
      ]
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})