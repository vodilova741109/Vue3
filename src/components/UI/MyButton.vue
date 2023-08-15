<template>
    <button class="btn">
        <slot></slot>
    </button>
   
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>

.btn {
 
   padding: 10px 15px;
   background: none;
   color: teal;
   border:  1.5px solid teal;
   border-radius: 5px;
   margin: 0 5px;
}

</style>