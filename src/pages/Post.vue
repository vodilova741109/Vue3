<template>    
    <div > 
        <h1>Пост {{ $route.params.id }}</h1>
        <!-- <div ><strong>Название:</strong>{{ this.post.title }}</div> -->
            <!-- <div ><strong>Описание:</strong>{{ post.excerpt }}</div> -->
           <!-- <div><strong>Описание:</strong> <span v-html="post.excerpt"></span></div> -->
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

</style>