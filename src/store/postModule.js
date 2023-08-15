import axios from 'axios'
export const postModule = {
    state: () => ({
            posts: [],            
            isPostLoading:  false,
            selectedSort: '',
            searchQuery: '', 
            page: 1,         
            limit: 10, 
            totalPages: 0,     
            totalPagesWP: 0,        
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'excerpt', name: 'По содержимому'},
            ]   
    }),
    getters: {
        // лайки
        // doubleLikes(state) {
        //     return state.likes * 1
        // },
        // computed свойства из  PostsPageWithStore
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sorteAndSearchPosts(state, getters) { 
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase())) }
    },
    mutations: {
        // изменение лайков
        // incrementLikes(state) {
        //     return state.likes += 1
        // },
        // decrementLikes(state) {
        //     return state.likes -= 1
        // },
        // изменение данных из PostsPageWithStore
        setPosts(state, posts) {
            state.posts = posts;
        },
        setPage(state, page) {
            state.page = page;
        },
        setLoading(state, bool) {
            state.isPostLoading = bool;
        },      
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setTotalPagesWP(state, totalPagesWP){
            state.totalPagesWP = totalPagesWP;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: {
          // пагинация страниц

          async fetchPosts({ state, commit}){
            try {              
                commit('setLoading', true);
                // // setTimeout( async () => {
                //     const response =  await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=40');  
                    //  this.posts = response.data; 
                    // работа с БД WP с лимитом вывода
                    const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts',                     
                    {
                        params: {
                            page: state.page,
                            per_page: state.limit                                                      
                        }                        
                    }); 
                    console.log(response);
                    // или  
                    // const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts/?per_page=11');  
                    // количество постов всего
                //   const  total = +response.headers['x-wp-total']; 
                    // количество страниц всего
                    // commit('setTotalPages', Math.ceil(total/state.limit));
                    // или
                    commit('setTotalPagesWP', +response.headers['x-wp-totalpages']);                   
                     
                    // console.log(this.totalPages, this.totalPagesWP);         

                    // const response =  await axios.get('https://prodomstroim.ru/wp-json/wp/v2/library');   
                    
                    commit('setPosts', response.data.map(post =>({
                        id: post.id,
                        title: post.title.rendered,
                        excerpt: post.excerpt.rendered
                    })));
           
                // }, 1000)
                
            } catch(e) {
                alert('Ошибка');
               
               
            }finally {
                commit('setLoading', false);            }
        },
        // подгрузка постов
        async loadMorePosts({ state, commit}){
            try {
                commit('setPage', state.page + 1)                
                // this.isPostLoading = true;
                
                // // setTimeout( async () => {
                    // const response =  await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=40');  
                    //  this.posts = response.data; 
                    // работа с БД WP с лимитом вывода

                    const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts',                     
                    {
                        params: {
                            page: state.page,
                            per_page: state.limit                                                      
                        }                        
                    }); 
                 
                    // или  
                    // const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts/?per_page=11');  
                        // // количество постов всего
                        const  total = +response.headers['x-wp-total']; 
                        // // количество страниц всего
                        commit('setTotalPages', Math.ceil(  total/state.limit));
                        // или
                        commit('setTotalPagesWP', +response.headers['x-wp-totalpages']); 
                        

                        commit('setPosts', [...state.posts,  ...response.data.map(post =>({
                            id: post.id,
                            title: post.title.rendered,
                            excerpt: post.excerpt.rendered
                        }))]);        
                        
                        console.log(state.posts)
   
                
            } catch(e) {
                alert('Ошибка');
                console.log(e);
            }finally {
                // this.isPostLoading = false;
            }
        } 
    },
    namespaced: true
 
}