<template>    
    <div class=""> 
        <h1>Домашняя страница</h1>        
       
    </div>
    
</template>
<script>
import axios from 'axios'
import server from '@/server'

export default {
    components: {
      
    },
    data(){
        return {
           
        }
    },
    methods:{      
       
    },   
    async created() {
       let response = await server.get('wp/v2/posts');
       console.log(response);
    }, 
   
       
}
</script>
<style>

</style>