import {ref, computed} from 'vue';
 

export default function useSorteAndSearchPosts(sortedPosts){
    const searchQuery = ref('');
    const sorteAndSearchPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))

    })
    return {
        searchQuery, sorteAndSearchPosts
    }
}
