<template>    
    <div class="app"> 
        <h1>Страница с постами</h1> 
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
         :posts="sortedPosts"
         @remove="removePost"/>
    <my-loading v-else >
        <h4>Идет загрузка</h4>        
    </my-loading>
       
    </div>
    
</template>
<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from './components/UI/MyButton.vue'
import axios from 'axios'
import server from '@/server'
import MyLoading from './components/UI/MyLoading.vue'
export default {
    components: {
       PostList, PostForm,
        MyButton,
        MyLoading
    },
    data(){
        return {
            posts: [], 
            dialogVisible: false,  
            isPostLoading:  false,
            selectedSort: '',
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
        async fetchPosts(){
            try {
                this.isPostLoading = true;
                // // setTimeout( async () => {
                //     const response =  await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=40');  
                //      this.posts = response.data; 
                    // работа с БД WP
                    const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts/?per_page=11');      
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
        }  
    },   
  
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))}

    },
    watch: {
        // selectedSort(newVal) {           
        //     this.posts.sort( (post1, post2) => {
        //         return post1[newVal]?.localeCompare(post2[newVal])
        //     })
        // },
        
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
</style>