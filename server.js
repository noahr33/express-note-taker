const express = require('express')
const path = require('path')
const app = express()
const PORT = 333

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
  })

app.listen(PORT, () => {
    console.log(`Express listening on http://localhost:${PORT}`)
  })