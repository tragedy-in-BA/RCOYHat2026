import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

# Cargar datos
df = pd.read_csv("inquilinos.csv")

# Variable derivada
df["ratio_ingreso"] = df["alquiler"] / df["sueldo"]

# Features
X = df[
    [
        "ratio_ingreso",
        "zona",
        "tipo_inquilino",
        "antiguedad_contrato",
        "tipo_garantia"
    ]
]

# Target
y = df["cumplio_pago"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Variables
numericas = [
    "ratio_ingreso",
    "antiguedad_contrato"
]

categoricas = [
    "zona",
    "tipo_inquilino",
    "tipo_garantia"
]

# Preprocesamiento
preprocessor = ColumnTransformer(
    [
        ("num", StandardScaler(), numericas),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categoricas)
    ]
)

# Modelo
modelo = Pipeline([
    ("prep", preprocessor),
    ("clf", LogisticRegression(max_iter=1000))
])

# Entrenar
modelo.fit(X_train, y_train)

# Evaluar
probs = modelo.predict_proba(X_test)[:, 1]

auc = roc_auc_score(y_test, probs)

print(f"AUC: {auc:.4f}")

joblib.dump(modelo, "modelo.pkl")



