from firebase_functions import https_fn, logger

from firebase_admin import initialize_app
firebase_app = initialize_app()

from flask import Flask, request, jsonify
from flask_cors import CORS
flask_app = Flask(__name__)
cors = CORS(flask_app)

# http://{host}:{port}/{project_id}/us-central1/api/test
@flask_app.route("/test", methods=["POST"])
def world():
    try:
        x_api_key = request.headers["X-API-Key"]
        logger.info(x_api_key)
        body = request.get_json()
        logger.info(body)
        username = body["username"]
        logger.info(username)
        return jsonify({"message": "OK."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# http://{host}:{port}/{project_id}/us-central1/api
@https_fn.on_request()
def api(request):
    from functions_wrapper import entrypoint
    return entrypoint(flask_app, request)
