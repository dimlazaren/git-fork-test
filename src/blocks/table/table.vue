<template>
    <div class="table">
        <div :class="getBemClass('table__row', { head: true })">
            <div v-for="column in columns" :class="getBemClass('table__cell', { head: true })">
                {{ column.label }}
            </div>
        </div>
        <div v-for="row in rows" :class="getBemClass('table__row', { body: true })">
            <div v-for="column in columns" :class="getBemClass('table__cell', { body: true })">
                <slot :name="`cell:${ column.code }`" :row="row">
                    {{ row[column.code] }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rows: {
                type: Array,
                default: () => [],
            },
            columns: {
                type: Array,
                default: () => [],
            },
        },
    }
</script>

<style src="./table.less" lang="less"/>
