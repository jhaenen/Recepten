<template>
    <div class="recipe">
        <h2>{{ title }}</h2>
        <p>{{ date }}</p>
    </div>
</template>

<script>
export default {
    name: "recipe",
    props: ['title', 'date']
}
</script>

<style scoped>
    .recipe {
        border: 2px solid;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
</style>