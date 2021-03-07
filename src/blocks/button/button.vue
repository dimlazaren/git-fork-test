<template>
    <button class="button" type="button" :disabled="disabled"><slot/></button>
</template>

<script>
    export default {
        props: {
            disabled: Boolean,
        },
    }
</script>

<style src="./button.less" lang="less"/>
