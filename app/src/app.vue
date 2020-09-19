<template>
    <div id="content">
        <h1 id="banner">{{ siteName }}</h1>
        <div v-if="respAvailable" style="margin: 0 5px">
            <div v-if="!isMobile">
                <div v-for="items in itemPairs" v-bind:key="items[0].id" class="row">
                    <div v-bind:key="recipe.id" v-for="recipe in items" class="col-4">
                        <recipe v-bind:title="recipe.name" v-bind:date="formatDate(recipe.date)"/>
                    </div>
                </div>
            </div>
            <div v-if="isMobile">
                <div v-bind:key="recipe.id" v-for="recipe in recipes" class="col-12">
                    <recipe v-bind:title="recipe.name" v-bind:date="formatDate(recipe.date)"/>
                </div>
            </div>
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
            respAvailable: false,
            isMobile: (document.documentElement.clientWidth < 1000),
            chunkSize: 3
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
    mounted() {
        this.$nextTick(function() {
            window.addEventListener('resize', this.getWindowWidth);
            this.getWindowWidth();
        });
    },
    computed: {
        itemPairs() { return _.chunk(this.recipes, 3); }
    },
    methods: {
        formatDate: function(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("nl-NL", { weekday: "short", year: "numeric", month: 'long', day: 'numeric' });
        },

        getWindowWidth(event) {
            if(document.documentElement.clientWidth < 1000) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    }
};
</script>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
    }

    #content {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    #banner {
        text-align: center;
        color: crimson;
    }

    .row::after {
        content: "";
        clear: both;
        display: table;
    }

    [class*="col-"] {
        float: left;
    }

    .col-1 {width: 8.33%;}
    .col-2 {width: 16.66%;}
    .col-3 {width: 25%;}
    .col-4 {width: 33.33%;}
    .col-5 {width: 41.66%;}
    .col-6 {width: 50%;}
    .col-7 {width: 58.33%;}
    .col-8 {width: 66.66%;}
    .col-9 {width: 75%;}
    .col-10 {width: 83.33%;}
    .col-11 {width: 91.66%;}
    .col-12 {width: 100%;}
</style>