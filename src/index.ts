import cors from "cors";
import express, { Request, Response } from "express";
import formData from "express-form-data";
import methodOverride from "method-override";
import path from "path";
import appRoute from "./routes/index";
import server from "./configs/server";

const app = express();

app.use(cors());

app.use(formData.parse({ uploadDir: path.join(__dirname, '../tmp'), autoClean: true }));
app.use(formData.format());
app.use(formData.stream());

app.use(methodOverride((req: Request, res: Response) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;

        delete req.body._method;
        return method;
    }
}));

app.use(appRoute);

app.listen(server.port, server.host, () => {
    console.info(`server : http://${server.host}:${server.port}/`);
});

