// ...existing code...
import { postShortnerController } from "../controllers/PostShortner.controller.js";
import {RendertoshortUrlController} from "../controllers/RendertoshortUrl.controller.js";
import {UpdateShortnerController} from "../controllers/UpdateShortner.controller.js";
import express from "express";
const router = express.Router();



router.get('/', UpdateShortnerController);

router.post('/', postShortnerController)

router.get("/:shortcode", RendertoshortUrlController);

const shorturlRouter = router;

export { shorturlRouter };
// ...existing code...