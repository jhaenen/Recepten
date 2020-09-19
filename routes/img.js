const express = require("express");

const router = express.Router();

router.get("/:img", (req, res) => {
    res.sendFile(serverRoot + "/app/dist/img/" + req.params.img);
});

module.exports = router;