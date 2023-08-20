<template>    
    <div> 
        <h1>Страница с постами Composition</h1> 
        <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск ..."
        />
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
    <div v-intersection="loadMorePosts" class="observer"></div>       
    </div>
    
</template>
<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MyLoading from '@/components/UI/MyLoading.vue'
import MyInput from '@/components/UI/MyInput.vue'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSorteAndSearchPosts from '@/hooks/useSorteAndSearchPosts'
import { useLoadMorePosts} from '@/hooks/useLoadMorePosts'

import { usePosts } from '@/hooks/usePosts'




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
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'excerpt', name: 'По содержимому'},
            ]      
        }
    },
    setup(props){       
        const {posts, totalPages, isPostLoading} = usePosts(10);  
        const {page} = useLoadMorePosts(10);   
        const {selectedSort, sortedPosts} = useSortedPosts(posts);
        const {searchQuery, sorteAndSearchPosts} = useSorteAndSearchPosts(sortedPosts);
        return {        
            posts,   
            page,   
            totalPages,
            isPostLoading,
            selectedSort,
            sortedPosts,
            searchQuery, 
            sorteAndSearchPosts
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
    }, 

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