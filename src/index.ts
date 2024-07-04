import { Elysia } from "elysia";
import { hit } from "./modules/hit";

const app = new Elysia()
	.get("/", () => "an opensource analytics api! ")
	.get("/ping", () => "pong")
	.group("/api", (app: any) => app.use(hit))
	.onError(() => "Unknown Error")
	.listen(3000);
console.log(`app is running at ${app.server?.hostname}:${app.server?.port}`);
