<template>
    <div>
        <h1>{{ siteName }}</h1>
        <div v-if="respAvailable">
            <recipe v-bind:key="recipe.id" v-for="recipe in recipes" v-bind:title="recipe.name" v-bind:date="formatDate(recipe.date)"/>
        </div>
        
    </div>
</template>

<script>
import recipe from "./components/recipe.vue"

export default {
    name: "App",
    components: {
        recipe
    },
    data() {
        return {
            siteName: "Haenen Recepten",

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
    },
    methods: {
        formatDate: function(dateString) {
            const date = new Date(dateString);
            return date.toDateString();
        }
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