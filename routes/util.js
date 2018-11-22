var fs = require('fs'),
    childProcess = require('child_process').exec
var util = {
    printFileWindows: function (printerName, fileName) {
        return new Promise((resolve, reject) => {
            childProcess(`print /d:\\\\%COMPUTERNAME%\\${printerName} ${fileName}.txt`, function (err, stdout, stderr) {
                if (err) {
                    console.error(err);
                    reject(false)
                }
                resolve(true)
            })
        })
    },
    writeFile: function (fileName, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${fileName}.txt`, content, function (err) {
                if (err) {
                    reject(false)
                }
                resolve(true)
            })
        })
    }
}

module.exports = util;