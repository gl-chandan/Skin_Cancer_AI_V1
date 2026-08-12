import json
import torch
import torch.nn as nn

from torchvision import models

device = torch.device("cpu")

NUM_CLASSES = 6

# Load labels
with open("label_mapping.json", "r") as f:
    idx2label = json.load(f)

idx2label = {
    int(k): v
    for k, v in idx2label.items()
}

# Load model ONCE
model = models.efficientnet_b0()

model.classifier[1] = nn.Linear(
    model.classifier[1].in_features,
    NUM_CLASSES
)

model.load_state_dict(
    torch.load(
        "best_skin_model.pth",
        map_location=device
    )
)

model.eval()

print("Model loaded into memory.")