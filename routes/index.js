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
  try {
    await util.writeFile(req.body.fileName, req.body.content)
    await util.printFileWindows(req.body.printerName, req.body.fileName)
    res.send('selamat')
  } catch (error) {
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
router.post('/print', (req,res)=>{
  console.log(req.body)
  return req.body
})

module.exports = router;
