import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        content: "Waiting for you to submit band and song name data...",
        band: "",
        song: ""
     });
  });

app.post("/lyrics", async (req, res) => {
    try {
        console.log(req.body)
        const result = await axios.get(API_URL + req.body.band + "/" + req.body.song);
        const lyricString = result.data.lyrics;
        const bandName = req.body.band;
        const songName = req.body.song;
        res.render("index.ejs", { 
            content: lyricString,
            band: capitalize(bandName + " -"),
            song: capitalize(songName)
         });
    } catch (error) {
        res.render("index.ejs", { 
            content: JSON.stringify(error.response.data),
            band: "Try another band",
            song: "and song."
         });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function capitalize(s)
{
    return String(s[0]).toUpperCase() + String(s).slice(1);
}