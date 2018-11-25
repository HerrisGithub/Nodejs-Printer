var fs = require('fs'),
    childProcess = require('child_process').exec,
    receipt = require('receipt')
var util = {
    printFileWindows: function (printerName, fileName) {
        return new Promise((resolve, reject) => {
            childProcess(`print /d:\\\\%COMPUTERNAME%\\${printerName} ${fileName}`, function (err, stdout, stderr) {
                if (err) {
                    console.error(err);
                    reject(false)
                }
                resolve(true)
            })
        })
    },
    printFileMac: function (printerName, fileName) {
        return new Promise((resolve, reject) => {
            printerName = printerName.replace(/ /g,'_')
            childProcess(`lp -d ${printerName} ${fileName}`, function (err, stdout, stderr) {
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
    },
    createReceipt: (currency, width, ruler, )=>{
        receipt.config.currency = currency;
        receipt.config.width = width;
        receipt.config.ruler = ruler;

        const output = receipt.create([
            { type: 'text', value: [
                'MY AWESOME STORE',
                '123 STORE ST',
            ], align: 'center' },
            { type: 'empty' },
            { type: 'properties', lines: [
                { name: 'Order Number', value: 'XXXXXXXXXXXX' },
                { name: 'Date', value: 'XX/XX/XXXX XX:XX' }
            ] },
            { type: 'table', lines: [
                { item: 'Product 1', qty: 1, cost: 1000 },
                { item: 'Product 2 with a really long name', qty: 1, cost: 17500, discount: { type: 'absolute', value: 1000 } },
                { item: 'Another product wth quite a name', qty: 2, cost: 900 },
                { item: 'Product 4', qty: 1, cost: 80, discount: { type: 'percentage', value: 0.15 } },
                { item: 'This length is ridiculously lengthy', qty: 14, cost: 8516 },
                { item: 'Product 6', qty: 3, cost: 500 },
                { item: 'Product 7', qty: 3, cost: 500, discount: { type: 'absolute', value: 500, message: '3 for the price of 2' } }
            ] },
            { type: 'empty' },
            { type: 'text', value: 'Some extra information to add to the footer of this docket.', align: 'center' },
            { type: 'empty' },
            { type: 'properties', lines: [
                { name: 'GST (10.00%)', value: 'AUD XX.XX' },
                { name: 'Total amount (excl. GST)', value: 'AUD XX.XX' },
                { name: 'Total amount (incl. GST)', value: 'AUD XX.XX' }
            ] },
            { type: 'empty' },
            { type: 'properties', lines: [
                { name: 'Amount Received', value: 'AUD XX.XX' },
                { name: 'Amount Returned', value: 'AUD XX.XX' }
            ] },
            { type: 'empty' },
            { type: 'text', value: 'Final bits of text at the very base of a docket. This text wraps around as well!', align: 'center', padding: 5 }
        ]);
        return output
    }
}

module.exports = util;