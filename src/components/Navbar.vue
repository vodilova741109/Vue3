<template>  
    <div class="navbar">      
        <div @click="$router.push('/')" >Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')" >Посты</my-button>
            <my-button @click="$router.push('/store')" >Store</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 10px;">О нас</my-button>
        </div> 
        <!-- простые ссылки, реализовано через кнопки -->
        <!-- <router-link to="/post">Посты</router-link>
        <router-link to="/about">О нас</router-link>  -->
    </div>
</template>
<script>   

</script>
<style scoped>
.navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns {
    margin-left: auto;
}

</style>