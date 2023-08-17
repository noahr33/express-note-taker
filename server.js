const express = require('express')
const path = require('path')
const { readFile, writeFile } = require('fs/promises')
const app = express()
const PORT = 333
const dataPath = path.join(__dirname, 'data', 'db.json')
// const { getAndRenderNotes } = require('./public/assets/js/index.js')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
  })

app.post('/api/notes', (req, res) => {
  const content = readFile(dataPath, "utf-8")
  const note = JSON.parse(content)
  writeFile(dataPath, JSON.stringify(note))
  console.log(note)
})



app.listen(PORT, () => {
    console.log(`Express listening on http://localhost:${PORT}`)
  })