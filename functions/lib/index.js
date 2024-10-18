"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("firebase-functions/https");
const app_1 = require("firebase-admin/app");
const firebase_functions_1 = require("firebase-functions");
const firestore_1 = require("firebase-functions/firestore");
const logger_1 = require("firebase-functions/logger");
(0, app_1.initializeApp)();
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
(0, firebase_functions_1.setGlobalOptions)({ maxInstances: 10 });
exports.onCreateMessage = (0, firestore_1.onDocumentCreated)("/messages/{documentId}", (event) => {
    var _a;
    (0, logger_1.info)((_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.data(), { structuredData: true });
});
exports.onDeleteMessage = (0, firestore_1.onDocumentDeleted)("/messages/{documentId}", (event) => {
    var _a;
    (0, logger_1.info)((_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.data(), { structuredData: true });
});
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors")({ origin: true });
app.use(cors);
app.use(express_1.default.json());
app.set("json spaces", 4);
// http://{host}:{port}/{project_id}/{location}/api/test
// http://localhost:5001/app-x-x-x/us-central1/api/test
app.post("/test", express_1.default.raw({ type: "application/json" }), (req, res) => {
    const x_api_key = req.get("X-API-Key");
    (0, logger_1.info)(x_api_key, { structuredData: true });
    const body = req.body;
    (0, logger_1.info)(body, { structuredData: true });
    return res
        .status(200)
        .send({
        "message": "Ok."
    });
});
// http://{host}:{port}/{project_id}/{location}/api
exports.api = (0, https_1.onRequest)(app);
//# sourceMappingURL=index.js.map