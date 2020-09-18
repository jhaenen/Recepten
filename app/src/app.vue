<template>
    <div>
        <h1>Hello Vue!</h1>
        <div v-if="respAvailable">
            <div v-bind:key="recipe.id" v-for="recipe in recipes">
                <p>{{recipe.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            recipes: [],
            respAvailable: false
        };
    },
    created() {
        fetch("/recipe")
        .then(resp => resp.json())
        .then(data => {
            this.respAvailable = true;
            this.recipes = data;
        });
    }
};
</script>

<style scoped>
    div {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    h1 {
        text-align: center;
        color: crimson;
    }
</style>