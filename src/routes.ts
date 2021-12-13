import { Router } from "express";

import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { can, is } from "./middleware/permissions";

import { SessionController } from "./controllers/SessionController";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateRoleController } from "./controllers/CreateRoleController"
import { CreatePermissionController } from "./controllers/CreatePermissionController";
import { CreateUserAccessControlListController } from "./controllers/CreateUserAccessControlListController";
import { CreateRolePermissionController } from "./controllers/CreateRolePermissionController";
import { CreateProductController } from "./controllers/CreateProductController";

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new SessionController().handle);

routes.post("/products", ensuredAuthenticated(), can(["create_product", "list_product"]), new CreateProductController().handle)

routes.get("/products", new GetAllProductsController().handle);

routes.post("/roles", ensuredAuthenticated(), is(["admin"]), new CreateRoleController().handle)

routes.post("/permissions", ensuredAuthenticated(), new CreatePermissionController().handle)

routes.post("/users/acl", ensuredAuthenticated(), new CreateUserAccessControlListController().handle)

routes.post("/roles/:roleId", new CreateRolePermissionController().handle)

export { routes };