import fs from "fs";
import path from "path";
import express from "express";

const createServer = async () => {
  const app = express();
  let vite;

  const isDev = process.env.NODE_ENV !== "production";

  console.log(
    "process.env.NODE_ENV",
    process.env.NODE_ENV,
    process.env.NODE_ENV !== "production"
  );

  if (isDev) {
    vite = await (
      await import("vite")
    ).createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(path.resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    let template, render;

    try {
      if (isDev) {
        console.log(123123);
        template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = fs.readFileSync(
          path.resolve("dist/client/index.html"),
          "utf-8"
        );
        render = (await import("./dist/server/entry-server.cjs")).render;
      }

      const [appHtml, store] = await render({ path: url });
      const data = `<script>window.__SSR_DATA__=${JSON.stringify(
        store.getState()
      )}</script>`;

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--ssr-state-->`, data);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      if (isDev) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

  app.listen(5174);
};

createServer().then(() => {
  console.log("http://localhost:5174");
});
