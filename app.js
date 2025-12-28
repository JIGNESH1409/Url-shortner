import {createServer} from "http";
import {readFile,writeFile} from "fs/promises";

import path from "path";
import crypto from "crypto";

const PORT=3002;
const DATA_FILE=path.join("data","links.json");

const ServeFile= async (res,filepath,contenttype)=>{
            const data=await readFile(filepath);
            res.writeHead(200,{"Content-Type":contenttype});
            res.end(data);

}

const LoadFile=async(link)=>{
    // write links file (keep as-is, ensure UTF-8)
    await writeFile(DATA_FILE,JSON.stringify(link)+"\n",'utf8');
}

// replaced loadLinks with robust version
const loadLinks= async()=>{
    try{
         const data = await readFile(DATA_FILE,'utf8');
         if(!data || data.trim()===""){
             return {};
         }
         return JSON.parse(data);
    }
    catch (error){
        if(error.code==="ENOENT"){
            console.log("Creating new links file...");
            await writeFile(DATA_FILE,JSON.stringify({})+"\n",'utf8');
            return {};
        }
        console.error("Failed to load links:", error.message);
        throw error;
    }
}

const server = createServer(async(req,res)=>{
    if(req.method==="GET"){
        if(req.url==="/"){
            try{
                await ServeFile(res,path.join(".","public","index.html"),"text/html");
           
            }
            catch (error){
                console.error("Error serving file:", error.message);
                res.writeHead(404,{"Content-Type":"text/html"});
                res.end("<h1>404 - File not found</h1>");
            }

            
        }
        else if(req.url==="/links"){
            // fixed header name and content-type
            const link = await loadLinks();
            res.writeHead(200,{"Content-Type":"application/json"});
            return res.end(JSON.stringify(link));
        }
        else{
            // ...existing code...
            const link = await loadLinks();
            const shorturl = decodeURIComponent(req.url.slice(1));
            if(link[shorturl]){
                res.writeHead(302,{"Location":link[shorturl]});
                return res.end();
            } else {
                res.writeHead(404,{"Content-Type":"text/html"});
                res.end("<h1>404 - Short URL not found</h1>");
            }
        }
    }

    if(req.method==="POST" && req.url==="/short"){
        const link = await loadLinks();
        let body ="";
        req.on("data",(chunk)=>{
            body+=chunk;
        })
        req.on("end",async()=>{
            try {
                const {url,urlshorten}=JSON.parse(body);

                if(!url){
                    res.writeHead(400,{"Content-Type":"text/plain"});
                    res.end("Bad Request: URL is required");
                    return;
                }

                const finalshort = urlshorten || crypto.randomBytes(4).toString("hex");

                // if duplicate, return proper server response (no alert)
                if(link[finalshort]){
                    res.writeHead(400,{"Content-Type":"text/plain"});
                    res.end("Short URL already exists. Please choose a different one.");
                    return;
                }

                link[finalshort]=url;

                await LoadFile(link);

                // return created short id so client can react if desired
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(JSON.stringify({short: finalshort, url}));

            } catch (error) {
                console.error("Error processing request:", error.message);
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("Invalid request format");
            }
        })
    }
})

server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})

