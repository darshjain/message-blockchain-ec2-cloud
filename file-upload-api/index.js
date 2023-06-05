const express = require('express')
const multer = require('multer')
const Web3 = require('web3')
const fs = require('fs')
const app = express()
const upload = multer({ dest: 'uploads/' })

const web3 = new Web3('https://sepolia.infura.io/v3/cd3f7b0fe4ee4580900cb7418739ad9d')

app.post('/upload', upload.single('file'), (req, res) => {
  const { path, originalname } = req.file

  // Read the file content
  const fileContent = fs.readFileSync(path, 'utf-8')

  // Get the timestamp
  const timestamp = Date.now()

  // Store the file content and timestamp in the smart contract
  const contractAddress = '0x927fdBeF99c834b241F7b04b1F021d341fBaa25B'
  const contractABI = JSON.parse(fs.readFileSync('contractAbi.json'))

  const contract = new web3.eth.Contract(contractABI, contractAddress)

  contract.methods.storeFile(fileContent)
    .send({ from: '0x2C17BbFCb04161690949f026A8fA62237795A962', gas: 3000000 })
    .then((result) => {
      console.log(result)
      res.json({ success: true })
    })
    .catch((error) => {
      console.error(error)
      res.json({ success: false, error: error.message })
    })
})

app.listen(3001, () => {
  console.log('API server listening on port 3001')
})
