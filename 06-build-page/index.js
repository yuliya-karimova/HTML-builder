const path = require('path');
const { readdir, mkdir, rm, readFile, copyFile, appendFile, writeFile } = require('fs/promises');

const createDir = async (distPath) => {
    await rm(distPath, { recursive: true, force: true});
    await mkdir(distPath, { recursive: true});
}

const bundleHTML = async (initPath, distPath) => {
    let htmlContent = await readFile(path.join(initPath, 'template.html'), 'utf-8');
    try {
        const files = await readdir(path.join(initPath, 'components'), { withFileTypes: true});
        for (const file of files) {
            let filePath = path.join(initPath, 'components', file.name);
            if (file.isFile() && path.extname(filePath) === '.html') {
                let fileName = path.basename(filePath, path.extname(filePath));
                let fileContent = await readFile(filePath, 'utf-8');
                htmlContent = htmlContent.replaceAll(`{{${fileName}}}`, `${fileContent}`);
            }
        }
    } catch (error) {
        console.log(error.message);
    }
    writeFile((path.join(distPath, 'index.html')), htmlContent);
}

const bundleStyle = async (initPath, distPath) => {
    try {
        let styleBundlePath = path.join(distPath, 'style.css');
        await writeFile(styleBundlePath, '');
        const files = await readdir(path.join(initPath, 'styles'), {withFileTypes: true});
        for (const file of files) {
            let filePath = path.join(initPath, 'styles', file.name);     
            if (file.isFile() && path.extname(filePath) === '.css') {
                let data = await readFile(filePath, "utf8");
                appendFile(styleBundlePath, `${data}\n\n`);
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

const copyDir = async (initPath, distPath) => {
    await mkdir(distPath);
    try {
        const items = await readdir(initPath, {withFileTypes: true});
        for (const item of items) {
            if (item.isDirectory()) {
                copyDir(path.join(initPath, item.name), path.join(distPath, item.name));
            } else if (item.isFile()) {
                copyFile(path.join(initPath, item.name), path.join(distPath, item.name));
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

const copyAssets = (initPath, distPath) => {
    let assetsInitPath = path.join(initPath, 'assets');
    let assetsDistPath = path.join(distPath, 'assets');
    
    copyDir(assetsInitPath, assetsDistPath);
}

const bundlePage = async () => {
    let initPath = path.join(__dirname);
    let distPath = path.join(initPath, 'project-dist');
    await createDir(distPath);
    bundleHTML(initPath, distPath);
    bundleStyle(initPath, distPath);
    copyAssets(initPath, distPath);
}

bundlePage();