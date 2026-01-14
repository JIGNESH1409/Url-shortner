
import { LoadFile } from "../model/Shortner.model.js";

export const UpdateShortnerController = async (req, res) => {
    try {
        const link = await LoadFile();
        return res.render("index", { link, host: req.headers.host });
    } catch (error) {
        console.error("Error loading links:", error.message);
        return res.status(500).send("Internal server error");
    }
};