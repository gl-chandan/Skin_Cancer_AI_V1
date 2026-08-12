import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)

DISEASE_NAMES = {

    "ACK":
        "Actinic Keratosis",

    "BCC":
        "Basal Cell Carcinoma",

    "MEL":
        "Melanoma",

    "NEV":
        "Nevus",

    "SCC":
        "Squamous Cell Carcinoma",

    "SEK":
        "Seborrheic Keratosis"
}


def generate_explanation(
    prediction,
    confidence
):

    disease_name = DISEASE_NAMES.get(
        prediction,
        prediction
    )

    prompt = f"""
You are a medical AI assistant.

Predicted skin lesion:
{disease_name}

Model confidence:
{confidence:.2f}%

Provide:

1. What this condition generally is.
2. Typical risk level.
3. Symptoms or changes to monitor.
4. When a dermatologist should be consulted.

Requirements:
- Keep under 150 words.
- Use simple language.
- Do NOT claim certainty.
- Mention that this is not a medical diagnosis.
"""

    try:

        response = (
            client.chat.completions.create(
                model=
                "llama-3.3-70b-versatile",

                messages=[
                    {
                        "role":
                        "system",

                        "content":
                        "You are a helpful medical AI assistant."
                    },
                    {
                        "role":
                        "user",

                        "content":
                        prompt
                    }
                ],

                temperature=0.3,
                max_tokens=250
            )
        )

        return (
            response
            .choices[0]
            .message.content
        )

    except Exception as e:

        print(
            "Groq Error:",
            str(e)
        )

        return f"""
Diagnosis: {disease_name}

Model Confidence: {confidence:.2f}%

The machine learning model successfully classified the lesion.

The AI explanation service is currently unavailable.

This result is not a medical diagnosis and should not replace professional medical advice.
"""