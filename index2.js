import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import axios from "axios";

import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

const app = express();
const port = 3000;

import { exec } from "child_process";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const htmlFilePath = path.join(__dirname, "src", "add.html");
// Set 'views' directory for any views, and the default engine to 'ejs'
app.set("views", __dirname + "/src");
app.set("view engine", "ejs");

// app.use(cors());
app.use(express.static(__dirname + "/src"));

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
});

// app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Proxy route
app.get("/ima-sdk", cors(corsOptions), async (req, res) => {
  try {
    // Open the default web browser with the HTML file

    let data = await axios
      .get("https://commondatastorage.googleapis.com/gtv-videos-bucket")
      .then((res) => {
        let XMLdata = res.data;
        const parser = new XMLParser();
        let { ListBucketResult } = parser.parse(XMLdata);
        let { Contents: contents } = ListBucketResult;

        let videoObject = contents.filter((content) =>
          content.Key.includes("Video.mp4")
        );
        return videoObject.map((item) => item.Key);
      });
    res.render("add", { data });
    // exec(`xdg-open ${htmlFilePath}`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error opening HTML file: ${error.message}`);
    //     return;
    //   }
    //   console.log("HTML file opened in default web browser");
    // });
  } catch (error) {
    console.error("Error fetching IMA SDK:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
