<template>
    <div class="post">
        <div>
            <div ><strong>ID:</strong>{{ post.id }} likes: {{ $store.state.likes }}</div>
            <div ><strong>Название:</strong>{{ post.title }}</div>
            <!-- <div ><strong>Описание:</strong>{{ post.excerpt }}</div> -->
           <div><strong>Описание:</strong> <span v-html="post.excerpt"></span>
            </div>
        </div>
        <div class="post__btns">
            <my-button             
            @click= "$emit('remove', post)"
            >Удалить</my-button>
            <my-button   style="margin-top: 10px;"       
            @click= "$router.push(`/posts/${post.id}`)"
            >Открыть</my-button>
        </div>
          
       </div>
</template>
<script>

export default {  
    props: {
        post: {
            type: Object,
            required: true
        }
    }   
}
</script>

<style scoped>
.post {
    margin-top: 15px;
    padding: 15px;
    border: 2px solid teal;   
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>