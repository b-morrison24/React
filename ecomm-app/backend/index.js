const express = require("express")
const app = express()
const port = 3001

app.get("/", (req, resp) => {
    resp.send("Hello Worlds")
});

app.listen(port, () => {
    console.log(`E-comm app listening on port ${port}!`);
});