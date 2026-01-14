import crypto from "crypto";
import { loadLinks, LoadFile } from "../model/Shortner.model.js";

export const postShortnerController = async (req, res) => {
    const { url, urlshorten } = req.body;
    if (!url) return res.status(400).send("URL is required");

    const finalshort = urlshorten || crypto.randomBytes(4).toString("hex");

    const links = await LoadFile();
    if (Array.isArray(links) && links.some(l => l.shortcode === finalshort)) {
        return res.status(400).send("Custom shortcode already in use");
    }

    await loadLinks({ url, shortcode: finalshort });
    return res.redirect("/");
};
