const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch(err) {
        console.log("Error while getting: " + err);
        res.status(500).json({ message: err });
    }
});

router.post("/", async (req, res) => {
    const recipe = new Recipe({ name: req.body.name });

    try {
        const save = await recipe.save();
        res.json(save);
    } catch(err) { 
        console.log("Error while saving: " + err);
        res.status(500).json({ message: err });
     };
});

router.get("/:recipeID", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeID);
        res.json(recipe);
    } catch(err) {
        console.log("Error while getting(" + req.params.recipeID + "): " + err);
        res.status(404).json({ message: "Entry not found" });
    }
});

router.patch("/:recipeID", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.recipeID, { name: req.body.name, date: Date.now() });
        res.json(recipe);
    } catch(err) {
        console.log("Error while getting(" + req.params.recipeID + "): " + err);
        res.status(404).json({ message: "Entry not found" });
    }
});

router.delete("/:recipeID", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.recipeID);
        res.json(recipe);
    } catch(err) {
        console.log("Error while getting(" + req.params.recipeID + "): " + err);
        res.status(404).json({ message: "Entry not found" });
    }
});

module.exports = router;