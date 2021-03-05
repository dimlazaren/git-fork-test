<template>
    <input
        class="input"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script>
    export default {
        props: {
            placeholder: String,
            modelValue: String,
        },
        emits: ['update:modelValue'],
    }
</script>

<style src="./input.less" lang="less"/>
