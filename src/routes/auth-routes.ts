import { Router } from "express";
import { SchemaMiddleware } from "@/middlewares/schema-middleware";
import { AuthController } from "@/controllers/auth-controller";
import { signupSchema } from "@/schema/auth-schema";

const router = Router();
const schemaMiddleware = new SchemaMiddleware();
const authController = new AuthController();

router.post("/v1/signup",schemaMiddleware.validate(signupSchema), authController.signup);

export default router;