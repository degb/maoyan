//import Tabs from './tabs/Tabs'
//import TabItem from './tabs/TabItem'
import Header from './header/Header'
import Content from './content/Content'
import Scroll from './scroll/Scroll'
import SearchCinema from '../components/search/SearchCinema'
import SearchMovie from '../components/search/SearchMovie'

export default {
    //编写插件
    install(Vue){
        // console.log('install方法调用了');
        
//      Vue.component(Tabs.name, Tabs);
//      Vue.component(TabItem.name, TabItem);
        Vue.component(Header.name, Header);
        Vue.component(Content.name, Content);
         Vue.component(Scroll.name, Scroll);
         Vue.component(SearchCinema.name,SearchCinema);
         Vue.component(SearchMovie.name,SearchMovie);
         
         
        
    }
}