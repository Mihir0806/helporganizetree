let fs=require("fs");
let path=require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function fn(dirPath) {
    let currpath;
    if (dirPath == undefined) {
        currpath = process.cwd();
        return;
    } 
    else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) 
        {

            currpath = path.join(dirPath, "organized_files");
            if (fs.existsSync(currpath) == false) {
                fs.mkdirSync(currpath);
            }

        } 
        else 
        {
            console.log("Kindly enter the correct path");
            return;
        }
    }
    organizeHelper(dirPath, currpath);
}
function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src);

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to --> ", category);
            sendFiles(childAddress, dest, category);
        }
    }
}
function sendFiles(srcPath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcPath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcPath, destFilePath);
    fs.unlinkSync(srcPath);
    console.log(fileName, "copied to ", category);

}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}
module.exports = {
    organize: fn
}