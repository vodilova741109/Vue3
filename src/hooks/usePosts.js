import axios from "axios";
import {ref, onMounted} from 'vue'; 

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostLoading = ref(true)
    const fetching = async () => {
             // пагинация страниц     
             try {
                // // setTimeout( async () => {
                    //     const response =  await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=40');  
                        //  this.posts = response.data; 
                        // работа с БД WP с лимитом вывода
                        const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts',                     
                        {
                            params: {
                                page: 1,
                                per_page: limit                                                      
                            }                        
                        }); 
                        // или  
                        // const response =  await axios.get('https://fondfbr.ru/wp-json/wp/v2/posts/?per_page=11');  
                        // количество постов всего                
                        totalPages.value = +response.headers['x-wp-totalpages'];    
                        // console.log(this.totalPages, this.totalPagesWP);         
    
                        // const response =  await axios.get('https://prodomstroim.ru/wp-json/wp/v2/library');            
                        posts.value = response.data.map(post =>({
                            id: post.id,
                            title: post.title.rendered,
                            excerpt: post.excerpt.rendered
                        }));                 
               
                    // }, 1000)
                    
                } catch(e) {
                    alert('Ошибка');
                }finally {
                    isPostLoading.value = false;
                }
        
    }
    onMounted(fetching)
    return {
        posts, isPostLoading, totalPages
    }
}