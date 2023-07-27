export default {
    mounted(el, binding) {

        let options = {
            // root: document.querySelector('.scroll-list'),
            rootMargin: '5px',
            threshold: 0.5
        }

        // функция обратного вызова
        let callback = (entries, observer) => {
            //  проверка может быть на кол-во постов или кол-во страниц или this.page < this.totalPages или this.page < this.totalPagesWP
            if (entries[0].isIntersecting) {
                binding.value();
            }
        }

        // наблюдатель
        let observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: 'intersection'
}