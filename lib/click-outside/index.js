export default {
    beforeMount(element, binding) {
        element.__vueClickEventHandler__ = (event) => {
            if (!element.contains(event.target) && element !== event.target) {
                binding.value(event);
            }
        };
        document.addEventListener('click', element.__vueClickEventHandler__);
    },
    unmounted(element) {
        document.removeEventListener('click', element.__vueClickEventHandler__);
    },
};
