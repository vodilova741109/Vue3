<template>    
    <div class="app"> 
        <h1>Страница с постами</h1> 
        <my-input
        v-model="searchQuery"
        placeholder="Поиск ..."/>
        <div class="app__btns">
            <my-button class="dialog__btn"
            @click="showDialog"
            >Создать пост</my-button>
            <my-select
             v-model="selectedSort"
             :options="sortOptions"
            ></my-select>
        </div>           
        <my-dialog v-model:show="dialogVisible" >
            <post-form
         @create="createPost"/>
        </my-dialog>       
         <post-list v-if="!isPostLoading"
         :posts="sorteAndSearchPosts"
         @remove="removePost"/>
    <my-loading v-else >
        <h4>Идет загрузка</h4>        
    </my-loading>
     <!-- // временно закомментировала подгузку страниц -->
    <!-- <div ref="observer" class="observer"></div> -->   
    <div class="page__wrapper">
        <div         
        v-for="pageNumder in totalPagesWP"
        :key="pageNumder"
        class="page"
        :class="{'current-page':pageNumder === page}"
        @click="changePage(pageNumder)">
        {{ pageNumder }}            
        </div>
    </div>
       
    </div>
    
</template>
<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from './components/UI/MyButton.vue'
import axios from 'axios'
import server from '@/server'
import MyLoading from './components/UI/MyLoading.vue'
import MyInput from './components/UI/MyInput.vue'
export default {
    components: {
       PostList, PostForm,
        MyButton,
        MyLoading,
        MyInput
    },
    data(){
        return {
            posts: [], 
            dialogVisible: false,  
            isPostLoading:  false,
            selectedSort: '',
            searchQuery: '', 
            page: 1,         
            limit: 10, 
            totalPagesWP: 0,           
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'excerpt', name: 'По содержимому'},
            ]      
        }
    },
    methods:{      
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
        changePage(pageNumder) {
          this.page = pageNumder;        
        },
        // пагинация страниц
        async fetchPosts(){
            try {
                
                this.isPostLoading = true;
                // // setTimeout( async () => {
                //     const response =  await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=40');  
                    //  this.posts = response.data; 
                    // работа с БД WP с лимитом вывода
                    const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts',                     
                    {
                        params: {
                            page: this.page,
                            per_page: this.limit                                                      
                        }                        
                    }); 
                    // или  
                    // const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts/?per_page=11');  
                    // количество постов всего
                    this.total = +response.headers['x-wp-total']; 
                    // количество страниц всего
                    this.totalPages = Math.ceil(this.total/this.limit);
                    // или
                    this.totalPagesWP = +response.headers['x-wp-totalpages'];    
                    // console.log(this.totalPages, this.totalPagesWP);         

                    // const response =  await axios.get('https://prodomstroim.ru/wp-json/wp/v2/library');            
                    this.posts = response.data.map(post =>({
                        id: post.id,
                        title: post.title.rendered,
                        excerpt: post.excerpt.rendered
                    }));                 
           
                // }, 1000)
                
            } catch(e) {
                alert('Ошибка');
            }finally {
                this.isPostLoading = false;
            }
        },
        // временно закомментировала подгузку страниц 
        // async loadMorePosts(){
        //     try {
        //            this.page +=1;
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
        this.fetchPosts();   
        // временно закомментировала подгузку страниц 
        // let options = {
        //     // root: document.querySelector('.scroll-list'),
        //     rootMargin: '5px',
        //     threshold: 0.5
        // }
        // // функция обратного вызова
        // let callback = (entries, observer) => {
        //     if(entries[0].isIntersecting){
        //         this.loadMorePosts();
        //     }
        // }
        // // наблюдатель
        // let observer = new IntersectionObserver(callback, options); 
        // observer.observe(this.$refs.observer); 
    },
    computed: {
        sortedPosts() { return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))},
        sorteAndSearchPosts() {return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))}
        
    },
    watch: {  
        page() {
            this.fetchPosts();
        }
    }
       
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
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