import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { setGlobalOptions } from "firebase-functions"
import { onDocumentCreated, onDocumentDeleted } from "firebase-functions/firestore"
import { info } from "firebase-functions/logger"
import { onRequest } from "firebase-functions/https"

const _app = initializeApp()
setGlobalOptions({ maxInstances: 10 })

export const onMessageCreated = onDocumentCreated("/messages/{documentId}", (event) => {
  info(event?.data?.data(), { structuredData: true })
})

export const onMessageDeleted = onDocumentDeleted("/messages/{documentId}", (event) => {
  info(event?.data?.data(), { structuredData: true })
})

// API SETUP BEGINS
import express from "express"
const { json } = express
import cors from "cors"
const app = express()
app.use(cors({ origin: true }))
app.set("json spaces", 4)

// http://{host}:{port}/{project_id}/us-central1/api/test
// http://localhost:5001/app-x-x-x/us-central1/api/test
app.post("/users", json(), async (req, res) => {
  try {
    if (req.get("X-API-Key") !== "RAHASIA") {
      return res
        .status(401)
        .send({
          message: "Invalid API key"
        })
    }

    const body = req.body || {}
    const name = body.name || null
    const username = body.username
    const email = body.email

    if (!username || String(username).trim() === "") {
      return res.status(400).send({ message: "Username is required" })
    }
    if (!email || String(email).trim() === "") {
      return res.status(400).send({ message: "Email is required" })
    }

    const usersRef = getFirestore().collection("/users")

    const usernameToCheck = String(username).trim()
    const emailToCheck = String(email).trim().toLowerCase()

    const usernameSnap = await usersRef.where("username", "==", usernameToCheck).limit(1).get()
    if (!usernameSnap.empty) {
      return res.status(409).send({ message: "Username already exists" })
    }

    const emailSnap = await usersRef.where("email", "==", emailToCheck).limit(1).get()
    if (!emailSnap.empty) {
      return res.status(409).send({ message: "Email already exists" })
    }

    const docRef = await usersRef.add({
      name: name,
      username: usernameToCheck,
      email: emailToCheck
    })

    return res
      .status(201)
      .send({
        message: "User created",
        data: {
          id: docRef.id
        }
      })
  } catch (error) {
    return res.status(500).send({
      message: error?.message ?? "Internal Server Error"
    })
  }
})

app.get("/users", json(), async (req, res) => {
  if (req.get("X-API-Key") !== "RAHASIA") {
    return res.status(401).send({ message: "Invalid API key" })
  }

  const id = req.query?.id

  if (!id || String(id).trim() === "") {
    return res.status(400).send({ message: "doc_id is required" })
  }

  const idValue = String(id).trim()
  if (!/^[A-Za-z0-9_-]{1,150}$/.test(idValue)) {
    return res.status(400).send({ message: "Invalid doc_id format" })
  }

  try {
    const snap = await getFirestore().doc(`/users/${idValue}`).get()
    if (!snap.exists) {
      return res.status(404).send({ message: "User not found" })
    }
  } catch (error) {
    return res.status(500).send({ message: error?.message ?? "Internal Server Error" })
  }
  const doc = await getFirestore().doc(`/users/${idValue}`).get()
  const data = doc.data()
  data.id = doc.id
  return res
    .status(200)
    .send({
      data: data
    })
})

export const api = onRequest(app)
// API SETUP ENDS