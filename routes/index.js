var express = require('express');
var router = express.Router();
var util = require('./util')
/**
 * POST
 * untuk generate file
 * @param {fileName}
 * @param {content}
 */
router.post('/writefile', async (req, res, next)=> {
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
router.post('/writeprint', async (req,res)=>{
  console.log(req.body)
  try {
    await util.writeFile(req.body.FileName, req.body.Content)
    if(process.platform=='darwin' || process.platform == 'linux'){
      await util.printFileMac(req.body.PrinterName, req.body.FileName)
    }else if(process.platform=='win32'){
      await util.printFileWindows(req.body.PrinterName, req.body.FileName)
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
router.get('/printfile/:printerName/:fileName', async(req,res)=>{
  try {
    await util.printFileWindows(req.params.printerName, req.params.fileName)
    res.send(200)
  } catch (error) {
    res.send(400)
  }
})
router.post('/create', async (req,res)=>{
  try {
    const _response = await util.createReceipt('',40,'-')
    res.send(_response)
  } catch (error) {
    res.send(400)
  }
})

module.exports = router;
