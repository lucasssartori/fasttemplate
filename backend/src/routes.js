import { Router } from "express";

const routes = new Router();

routes.post("/sessions", SessionController.store);
