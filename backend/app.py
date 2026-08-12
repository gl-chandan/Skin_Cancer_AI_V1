import os

from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

from fastapi.middleware.cors import (
    CORSMiddleware
)

from predictor import predict_image

from ai_explainer import (
    generate_explanation
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@app.get("/")
def home():

    return {

        "message":
        "Skin Cancer AI Backend Running"

    }


@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as f:

        f.write(
            await file.read()
        )

    result = predict_image(
        file_path
    )

    predicted_class = result[
        "prediction"
    ]

    confidence = result[
        "confidence"
    ]

    explanation = generate_explanation(
        predicted_class,
        confidence
    )

    return {

        "prediction":
            predicted_class,

        "confidence":
            confidence,

        "ai_explanation":
            explanation

    }