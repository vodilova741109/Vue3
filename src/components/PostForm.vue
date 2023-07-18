<template>
     <form @submit.prevent>
            <h4>Создание поста</h4>
            <my-input 
            v-model="post.title"  
            type="text" 
            placeholder="Название поста"/>
            <my-input
            v-model="post.body"  
            type="text" 
            placeholder="Описание поста"/>
            <my-button
            class="btn-form"
            @click="createPost">
            Создать</my-button>
        </form>     
</template>

<script>
export default {
    data() {
        return {   
            post: {
                title: '',
                body: ''
            }   
        }
    },
    methods:{      
        createPost() {       
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post = {
                title: '',
                 body: '',
            }           
        }   
    },
    // watch: {
    //         post: {
    //             handler(newVal) {
    //                 console.log(newVal);
    //             },
    //             deep: true               
    //         }
            
    //     } 
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
}
.btn-form{
    align-self: flex-end;
    margin-top: 15px;
}

</style>