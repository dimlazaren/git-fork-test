<template>
    <input
        :class="getBemClass('input', { tableHead })"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="maxlength"
        @input="onInput"
    >
</template>

<script>
    export default {
        props: {
            placeholder: String,
            modelValue: String,
            tableHead: Boolean,
            maxlength: Number,
            hasError: Boolean,
            numeric: Boolean,
        },
        emits: ['update:modelValue'],
        methods: {
            onInput(event) {
                let value = event.target.value;
                if (this.numeric) {
                    value = value.replace(/\D/g, '');
                }
                event.target.value = value;
                this.$emit('update:modelValue', value);
            },
        },
    }
</script>

<style src="./input.less" lang="less"/>
