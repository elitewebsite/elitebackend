const fs = require("fs");

const deletFolder = async () => {
    return new Promise((resolve) => {
        fs.rmSync("./tmp", { recursive: true, force: true })
        resolve();
    })
}

module.exports=deletFolder;