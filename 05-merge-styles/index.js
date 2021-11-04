const path = require('path');
const { readdir, readFile, appendFile, writeFile } = require('fs/promises');

const createStyleBundle = async (initFolder, targetFolder) => {
    let initPath = path.join(__dirname, initFolder);
    let targetPath = path.join(__dirname, targetFolder);
    let targetFile = path.join(targetPath, 'bundle.css');
    await writeFile(targetFile, '', (error) => { if (error) throw error })
    
    try {
        const files = await readdir(initPath, {withFileTypes: true});
        for (const file of files) {
            let filePath = path.join(initPath, file.name);              
            if (file.isFile() && path.extname(filePath) === '.css') {
                let data = await readFile(filePath, "utf8", (error) => { if (error) throw error });
                appendFile(targetFile, `${data}\n\n`, (error) => { if (error) throw error });
            }
        }
    } catch (error) {
        throw error
    }
}

createStyleBundle('styles', 'project-dist')