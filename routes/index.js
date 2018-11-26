var express = require('express');
var router = express.Router();
var util = require('./util')
var fs = require('fs');
var wrap = require('word-wrap');
var receipt = require('receipt')
var _ = require('underscore')
/**
 * POST
 * untuk generate file
 * @param {fileName}
 * @param {content}
 */
router.post('/writefile', async (req, res, next) => {
  try {
    await util.writeFile(req.body.fileName, req.body.content)
    res.send(200)
  } catch (error) {
    res.send(400)
  }
});
/**
 * POST
 * untuk generate dan print file
 * @param {fileName}
 * @param {content}
 * @param {printerName}
 */
router.post('/writeprint', async (req, res) => {
  try {
    await util.writeFile(req.body.FileName, req.body.Content)
    if (process.platform == 'darwin' || process.platform == 'linux') {
      await util.printFileMac(req.body.PrinterName, req.body.FileName + '.txt')
    } else if (process.platform == 'win32') {
      await util.printFileWindows(req.body.PrinterName, req.body.FileName + '.txt')
    }
    res.send(200)
  } catch (error) {
    console.log(error)
    res.send(400)
  }
})
/**
 * GET
 * untuk print file saja
 * @param {printerName}
 * @param {fileName}
 */
router.get('/printfile/:printerName/:fileName', async (req, res) => {
  try {
    await util.printFileWindows(req.params.printerName, req.params.fileName)
    res.send(200)
  } catch (error) {
    res.send(400)
  }
})
// async function printMenu(_transaction, printerName) {
//   receipt.config.currency = '';
//   receipt.config.width = 40;
//   receipt.config.ruler = '_';
//   let header = receipt.create([
//     {
//       type: 'text', value: [
//         `${_transaction.merchant.name}`,
//       ], align: 'center'
//     },
//   ])
//   let table = receipt.create([
//     {
//       type: 'text', value: [
//         `TABLE ${_transaction.tableNo}`,
//       ], align: 'center'
//     },
//   ])
//   let _listTransactions = []
//   _transaction.ListTransactionDetail.forEach((e) => {
//     let _detail = {}
//     _detail.item = e.listing.name
//     _detail.qty = e.qty
//     _detail.cost = e.price
//     _detail.remark = e.remark
//     if (e.discount) {
//       _detail.discount = { type: 'absolute', value: e.discount }
//     }
//     _listTransactions.push(_detail)
//   });
//   let list = receipt.create([
//     { type: 'tableMenu', lines: _listTransactions }
//   ])
//   fs.writeFileSync('menu.png',
//     text2png(`${header}\nCustomer  : ${_transaction.user.fullname}\nTelp          : ${_transaction.user.phone}\n${table}\n${list}`, {
//       font: '15px Arial Black',
//       color: 'black',
//       backgroundColor: 'white',
//       lineSpacing: 10,
//       paddingLeft: 25,
//       paddingRight: 25,
//       paddingBottom: 40,
//       paddingTop: 20
//     })
//   );
//   try {
//     if (process.platform == 'darwin' || process.platform == 'linux') {
//       await util.printFileMac(printerName, 'menu.png')
//     } else {
//       await util.printFileWindows(printerName, 'menu.png')
//     }
//   } catch (error) {
//     console.log(error)
//   }
//   return true
// }
router.post('/printMenu', async (req, res) => {
  const _transaction = req.body.data
  //beverage
  let _beverage = Object.assign({}, _transaction)
  _beverage.ListTransactionDetail = _.filter(_transaction.ListTransactionDetail, (obj) => {
    return obj.category.toLowerCase() == 'beverage'
  })
  if (_beverage.ListTransactionDetail.length > 0) {
    await printMenu(_beverage, req.body.beveragePrinter.name)
  }
  //food
  let _food = Object.assign({}, _transaction)
  _food.ListTransactionDetail = _.filter(_transaction.ListTransactionDetail, (obj) => {
    return obj.category.toLowerCase() == 'food'
  })
  if (_food.ListTransactionDetail.length > 0) {
    await printMenu(_food, req.body.foodPrinter.name)
  }
  //all menu
  await printMenu(_transaction, req.body.cashierPrinter.name)
  res.send(200);
})
router.post('/create', async (req, res) => {
  try {
    const _response = await util.createReceipt('', 40, '-')
    res.send(_response)
  } catch (error) {
    res.send(400)
  }
})

module.exports = router;
