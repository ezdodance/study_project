const args = require('./getArgs.js').get(process.argv.slice(2));
const fs   = require('fs');
const path = require('path');

//--------------------------------------------------------
// Two path variables to navigate through the filesystem
var sourcePath = process.cwd();
var destPath   = 'c:\\users\\goodnight\\PicStream';

//--------------------------------------------------------
// Retrieving paths from the user input
function retrieve(array, s, d) {
    for (i = 0; i < array.length; i++) {
        if (array[i] == s)
            sourcePath = args.args[i];
        else {
        if (array[i] == d)    
            destPath = args.args[i];
        }
    }
};

if (args.flags.length >= 1) 
    retrieve(args.flags, 's', 'd');
if (args.params.length >= 1)
    retrieve(args.params, 'source', 'dest'); 
    
//---------------------------------------------------------
// Doing some magic here
const processDir = (source, level, callback) => {
    const fileList = fs.readdirSync(source);
    
    fileList.forEach ((file) => {
        let state = fs.statSync(path.join(source, file));

        if (state.isDirectory()) {
            console.log(' '.repeat(level) + file);
            processDir(path.join(source, file), level + 1, callback);
        }
         else {
             callback(source, destPath, file);
        }
    })
}

//-----------------------------------------------------------
//defining callback functions
function transmit(source, destPath, file) {
    if(!fs.existsSync(path.join(destPath, file[0]))) {
        fs.mkdirSync(path.join(destPath, file[0].toUpperCase()));
     }
    fs.copyFileSync(path.join(source, file), path.join(destPath, file[0]) + `\\${file}`);
}

function clean(source, destPath, file) {
    fs.unlinkSync(path.join(source, file));
    if(fs.readdirSync(source).length == 0)
        fs.rmdirSync(source);
}
//===========================================================
// The main program itself
processDir(sourcePath, 1, transmit);
processDir(sourcePath, 1, clean);

