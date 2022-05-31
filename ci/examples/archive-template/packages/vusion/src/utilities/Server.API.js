import path from "path";
import fsp from "fs/promises";
import express from "express";

/*** Multi-Application Server ***/

let isProduction = process.env.NODE_ENV === "production";

async function createServer() {
    let app = express();
    app.use(express.static(path.join(__dirname, "dist")));
    app.use("*", async (req, res) => {
        let url = req.originalUrl;

        // Use a separate HTML file for the "Inbox" app.
        let appDirectory = url.startsWith("/inbox") ? "inbox" : "";
        let htmlFileToLoad;

        if (isProduction) {
            htmlFileToLoad = path.join("dist", appDirectory, "index.html");
        } else {
            htmlFileToLoad = path.join(appDirectory, "index.html");
        }

        try {
            let html = await fsp.readFile(
                path.join(__dirname, htmlFileToLoad),
                "utf8"
            );

            res.setHeader("Content-Type", "text/html");
            return res.status(200).end(html);
        } catch (error) {
            console.log(error.stack);
            return res.status(500).end(error.stack);
        }
    });

    return app;
}

createServer().then(app => {
    app.listen(3000, () => {
        console.log("HTTP server is running at http://localhost:3000");
    });
});