const express = require("express")
const hyperid = require("hyperid")
const path = require("path")
const { writeFile } = require("fs/promises")
const { readFileSync } = require("fs")
const app = express()
const PORT = process.env.PORT || 333
const instance = hyperid()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// page routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"))
})

// gets notes
app.get("/api/notes", (req, res) => {
  let notes = readFileSync("./db/db.json", "utf-8")
  res.json(JSON.parse(notes))
})
//  posts notes
app.post("/api/notes", (req, res) => {
  const newNote = {
    ...req.body,
    id: instance(),
  }
  let notes = readFileSync("./db/db.json", "utf-8")
  const notesJSON = JSON.parse(notes)
  notesJSON.push(newNote)

  writeFile("./db/db.json", JSON.stringify(notesJSON), (err) => {
    if (err) {
      throw err
    }
  })

  res.json(notes)
})

app.listen(PORT, () => {
  console.log(`Express listening on http://localhost:${PORT}`)
})
