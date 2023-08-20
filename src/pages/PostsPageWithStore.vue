<template>    
    <div>    
        <h2>{{ $store.state.isAuth ? "Пользователь авторизован" : "Пользователь не авторизован"}}</h2>
        <h1>Страница с постами Store</h1> 
        <h3>Всего страниц: {{ $store.state.post.totalPagesWP }}</h3>
        <!-- <h2>{{ $store.getters.doubleLikes}}</h2> -->
        <!-- <div class="">
            <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
            <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>

        </div>         -->
        <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск ..."/>
        <div class="app__btns">
            <my-button class="dialog__btn"
            @click="showDialog"
            >Создать пост</my-button>
            <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
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
    <div v-intersection="loadMorePosts" class="observer"></div>    
          
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
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'    

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
        
    },   
  
    mounted() {
        this.fetchPosts();   
    },
    computed: {       
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
         // sortedPosts() { return [...this.posts].sort((post1, post2) =>  post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))},
        // sorteAndSearchPosts() {return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))}
    },
    watch: {      
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