<template>
    <div :class="getBemClass('input', { icon })">
        <input
            class="input__field"
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keypress.enter="$emit('enter-key-press')"
        >
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: String,
            modelValue: String,
            icon: String,
        },
        emits: ['update:modelValue', 'enter-key-press'],
    }
</script>

<style src="./input.less" lang="less"/>
