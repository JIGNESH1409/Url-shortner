import { getLinkbyShorturl } from "../model/Shortner.model.js";

export const RendertoshortUrlController = async (req, res) => {
    const { shortcode } = req.params;
    const link = await getLinkbyShorturl(shortcode);

    if (!link) return res.status(404).send("Short url not found")

    res.redirect(link.url);

}

