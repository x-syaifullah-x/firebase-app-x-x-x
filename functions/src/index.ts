/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {
    onRequest,
} from "firebase-functions/https"

import {
    initializeApp,
} from "firebase-admin/app"

import {
    setGlobalOptions,
} from "firebase-functions"

import {
    onDocumentCreated,
    onDocumentDeleted,
} from "firebase-functions/firestore"

import {
    info,
} from "firebase-functions/logger"

initializeApp()

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 })

exports.onCreateMessage = onDocumentCreated("/messages/{documentId}", (event) => {
    info(event?.data?.data(), { structuredData: true })
})

exports.onDeleteMessage = onDocumentDeleted("/messages/{documentId}", (event) => {
    info(event?.data?.data(), { structuredData: true })
})

import express from "express"
const app = express()
const cors = require("cors")({ origin: true })
app.use(cors)
app.use(express.json())
app.set("json spaces", 4)

// http://{host}:{port}/{project_id}/{location}/api/test
// http://localhost:5001/app-x-x-x/us-central1/api/test
app.post("/test", express.raw({ type: "application/json" }), (req, res) => {
    const x_api_key = req.get("X-API-Key")
    info(x_api_key, { structuredData: true })
    const body = req.body
    info(body, { structuredData: true })
    return res
        .status(200)
        .send({
            "message": "Ok."
        })
})

// http://{host}:{port}/{project_id}/{location}/api
exports.api = onRequest(app)