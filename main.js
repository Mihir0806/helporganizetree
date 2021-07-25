let fs=require("fs");
let path =require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

let helpObj=require("./command/help");
let treeObj=require("./command/tree");
let organizeObj=require("./command/organize");

let inputarr=process.argv.slice(2);
let command=inputarr[0];
if(command != "help"){
    path=inputarr[1];
}
switch(command){
    case "help":helpObj.help();
                break;
    case "tree":treeObj.tree(inputarr[1]);
                break;
    case "organize":organizeObj.organize(inputarr[1]);
                break;
    default: console.log("Wrong input, try again");
                break;
}