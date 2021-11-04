const path = require('path');
const { mkdir, rm, readdir, copyFile } = require('fs/promises');

const copyFolder = async (folderName) => {
    let initPath = path.join(__dirname, folderName);
    let copyPath = initPath + '-copy';

    await rm(copyPath, { recursive: true, force: true});
    await mkdir(copyPath, { recursive: true});
    
    try {
        const files = await readdir(initPath);
        for (const file of files) {
            await copyFile(path.join(initPath, file), path.join(copyPath, file));
        }
    } catch (error) {
        console.log(error.message);
    }
}

copyFolder('files');

