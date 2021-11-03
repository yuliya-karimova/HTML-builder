const path = require('path');
const { readdir, stat } = require('fs/promises');

async function showAllFiles(folderName) {
    let dirPath = path.join(__dirname, folderName);
    try {
        const files = await readdir(dirPath, {withFileTypes: true});
        for (const file of files) {
            if (file.isFile()) {
                let filePath = path.join(__dirname, folderName, file.name);
                let fileSize = ((await stat(filePath)).size / 1024).toFixed(3);
                console.log(`${path.basename(filePath, path.extname(filePath))} - ${path.extname(filePath).slice(1)} - ${fileSize}kb`)                
            } 
        }
    } catch (error) {
        console.log(error.message);
    }
}

console.log('Files in secret-folder:');
showAllFiles('secret-folder');