<template>    
    <div class="app"> 
        <h1>Страница с постами</h1>
        <my-button class="dialog__btn"
        @click="showDialog"
        >Создать пост</my-button>
        <my-dialog v-model:show="dialogVisible" >
            <post-form
         @create="createPost"/>
        </my-dialog>
       
         <post-list 
         :posts="posts"
         @remove="removePost"/>
       
    </div>
    
</template>
<script>

import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from './components/UI/MyButton.vue'
export default {
    components: {
       PostList, PostForm,
        MyButton
    },
    data(){
        return {
            posts: [
                {id: 1, title: 'JavaScript', body: 'Описание поста 1' },
                {id: 2, title: 'JavaScript', body: 'Описание поста 2' },
                {id: 3, title: 'JavaScript', body: 'Описание поста 3' },
                {id: 4, title: 'JavaScript', body: 'Описание поста 4' }
            ], 
            dialogVisible: false,          
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
.dialog__btn{
    margin: 15px 0;
}
</style>