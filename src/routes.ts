import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { SessionController } from "./controllers/SessionController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { CreateRoleController } from "./controllers/CreateRoleController"

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new SessionController().handle);

routes.get("/products", new GetAllProductsController().handle);

routes.post("/roles", ensuredAuthenticated(), new CreateRoleController().handle)

export { routes };