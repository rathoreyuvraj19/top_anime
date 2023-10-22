import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const response = await axios.get("https://api.jikan.moe/v4/top/anime");
  const x = response.data.data;
  if (x.rank !== null) {
    x.sort((a, b) => {
      return a.rank - b.rank;
    });
  }
  res.render("index.ejs", {
    title: "Top Animes",
    content: x,
  });
});

app.get("/upcoming", async (req, res) => {
  const response = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=upcoming"
  );
  const x = response.data.data;
  if (x.rank !== null) {
    x.sort((a, b) => {
      return a.rank - b.rank;
    });
  }
  res.render("upcoming.ejs", {
    title: "Top Upcoming Animes",
    content: x,
  });
});

app.get("/favorite", async (req, res) => {
  const response = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=favorite"
  );
  const x = response.data.data;
  if (x.rank !== null) {
    x.sort((a, b) => {
      return a.rank - b.rank;
    });
  }
  res.render("favorite.ejs", {
    title: "Top favorite Animes",
    content: x,
  });
});

app.get("/airing", async (req, res) => {
  const response = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=airing"
  );
  const x = response.data.data;
  if (x.rank !== null) {
    x.sort((a, b) => {
      return b.score - a.score;
    });
  }
  res.render("airing.ejs", {
    title: "Top Currently Airing Animes",
    content: x,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
