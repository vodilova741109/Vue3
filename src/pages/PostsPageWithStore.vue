<template>    
    <div>    
        <h2>{{ $store.state.isAuth ? "Пользователь авторизован" : "Пользователь не авторизован"}}</h2>
        <h1>Страница с постами</h1> 
        <h3>Всего страниц: {{ $store.state.post.totalPagesWP }}</h3>
        <!-- <h2>{{ $store.getters.doubleLikes}}</h2> -->
        <!-- <div class="">
            <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
            <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>

        </div>         -->
        <!-- <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск ..."/> -->
        <div class="app__btns">
            <my-button class="dialog__btn"
            @click="showDialog"
            >Создать пост</my-button>
            <!-- <my-select
             v-model="selectedSort"
             :options="sortOptions"
            ></my-select> -->
        </div>   
        
        <!-- <my-dialog v-model:show="dialogVisible" >
            <post-form
         @create="createPost"/>
        </my-dialog>        -->
         <post-list v-if="!isPostLoading"
         :posts="sorteAndSearchPosts"
         @remove="removePost"/>
    <my-loading v-else >
        <h4>Идет загрузка</h4>        
    </my-loading>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div ref="observer" class="observer"></div> -->
    <!-- // временно закомментировала пагинация -->
    <!-- <div class="page__wrapper">
        <div         
        v-for="pageNumder in totalPages"
        :key="pageNumder"
        class="page"
        :class="{'current-page':pageNumder === page}"
        @click="changePage(pageNumder)">
        {{ pageNumder }}            
        </div>
    </div> -->
       
    </div>
    
</template>
<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/UI/MyButton.vue'

import MyLoading from '@/components/UI/MyLoading.vue'
import MyInput from '@/components/UI/MyInput.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    components: {
       PostList, PostForm,
        MyButton,
        MyLoading,
        MyInput
    },
    data(){
        return {
            dialogVisible: false,  
        }
    },
    methods:{  
        ...mapMutations({
            setPage: 'post/setPage'

        }),    
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
            
        }),  
        createPost(post) {         
          this.posts.push(post);
          this.dialogVisible = false;
        }, 
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        // временно закомментировала пагинация
        // changePage(pageNumder) {
        //   this.page = pageNumder;        
        // },
        // пагинация страниц
        // async fetchPosts(){
        //     try {
              
        //         this.isPostLoading = true;
        //         // // setTimeout( async () => {
        //         //     const response =  await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=40');  
        //             //  this.posts = response.data; 
        //             // работа с БД WP с лимитом вывода
        //             const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts',                     
        //             {
        //                 params: {
        //                     page: this.page,
        //                     per_page: this.limit                                                      
        //                 }                        
        //             }); 
        //             // или  
        //             // const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts/?per_page=11');  
        //             // количество постов всего
        //             this.total = +response.headers['x-wp-total']; 
        //             // количество страниц всего
        //             this.totalPages = Math.ceil(this.total/this.limit);
        //             // или
        //             this.totalPagesWP = +response.headers['x-wp-totalpages'];    
        //             // console.log(this.totalPages, this.totalPagesWP);         

        //             // const response =  await axios.get('https://prodomstroim.ru/wp-json/wp/v2/library');            
        //             this.posts = response.data.map(post =>({
        //                 id: post.id,
        //                 title: post.title.rendered,
        //                 excerpt: post.excerpt.rendered
        //             }));                 
           
        //         // }, 1000)
                
        //     } catch(e) {
        //         alert('Ошибка');
        //     }finally {
        //         this.isPostLoading = false;
        //     }
        // },
        // подгрузка постов
        // async loadMorePosts(){
        //     try {
        //         this.page +=1;
        //         // this.isPostLoading = true;
        //         // // setTimeout( async () => {
        //         //     const response =  await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=40');  
        //             //  this.posts = response.data; 
        //             // работа с БД WP с лимитом вывода
        //             const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts',                     
        //             {
        //                 params: {
        //                     page: this.page,
        //                     per_page: this.limit                                                      
        //                 }                        
        //             }); 
        //             // или  
        //             // const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts/?per_page=11');  
        //             // количество постов всего
        //             this.total = +response.headers['x-wp-total']; 
        //             // количество страниц всего
        //             this.totalPages = Math.ceil(this.total/this.limit);
        //             // или
        //             this.totalPagesWP = +response.headers['x-wp-totalpages'];    
        //             // console.log(this.totalPages, this.totalPagesWP);         

        //             // const response =  await axios.get('https://prodomstroim.ru/wp-json/wp/v2/library');            
        //             this.posts =[...this.posts,  ...response.data.map(post =>({
        //                 id: post.id,
        //                 title: post.title.rendered,
        //                 excerpt: post.excerpt.rendered
        //             }))]
        //         // }, 1000)
                
        //     } catch(e) {
        //         alert('Ошибка');
        //     }finally {
        //         // this.isPostLoading = false;
        //     }
        // }    
    },   
  
    mounted() {
        // this.fetchPosts();    
        // закомментировала, когда создала свою диррективу, код перенесен в саму диррективу
        // let options = {
        //     // root: document.querySelector('.scroll-list'),
        //     rootMargin: '5px',
        //     threshold: 0.5
        // }

        // // функция обратного вызова
        // let callback = (entries, observer) => {
        //     //  проверка может быть на кол-во постов или кол-во страниц или this.page < this.totalPages или this.page < this.totalPagesWP
        //     if(entries[0].isIntersecting && this.posts.length < this.total){
        //         this.loadMorePosts();
        //     }
        // }

        // // наблюдатель
        // let observer = new IntersectionObserver(callback, options); 
        // observer.observe(this.$refs.observer); 
    },
    computed: {
        // sortedPosts() { return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))},
        // sorteAndSearchPosts() {return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))}
        ...mapState({
            posts: state => state.post.posts,            
            isPostLoading:  state => state.post.isPostLoading,     
            selectedSort:  state => state.post.selectedSort,     
            searchQuery: state => state.post.searchQuery,     
            page: state => state.post.page,            
            limit: state => state.post.limit,     
            totalPages: state => state.post.totalPages,               
            sortOptions: state => state.post.sortOptions,     

        }),
        ...mapGetters({
            sortedPosts: '/post/sortedPosts',
            sorteAndSearchPosts: 'post/sorteAndSearchPosts'
        }),
    },
    watch: {
        // временно закомментировала пагинацию, так как работает подгрузка постов
        // page() {
        //     this.fetchPosts();
        // }
    }
       
}
</script>
<style>

.dialog__btn {
    margin: 15px 0;
}
h4 {
    color: #6ebeff;
    font-size: 20px;
}
.app__btns {
 display: flex;
 justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
    min-width: 100%;
    flex-wrap: wrap;
}
.page {
    border: 1px solid black;
    padding: 10px;
    margin-right: 2px;
}
.current-page {
    border: 3px solid teal;
    color: teal;
}
.observer {
    height: 5px;
    visibility: hidden; 
}
</style>