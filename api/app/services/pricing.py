from pathlib import Path
import joblib
import pandas as pd
from app.models import EvaluationCreate, OfertaResult

_MODEL_PATH = Path(__file__).parent / "modelo.pkl"
_modelo = joblib.load(_MODEL_PATH)

GARANTIA_MAP: dict[str, str] = {
    "propietario": "Propietaria",
    "caucion": "Seguro de caucion",
    "recibo": "Propietaria",
    "aval": "Bancaria",
    "deposito": "Propietaria",
}

SCORE_RATES: dict[str, float] = {
    "AAA": 0.05,
    "AA": 0.055,
    "A": 0.06,
    "BBB": 0.07,
    "BB": 0.08,
    "B": 0.09,
    "CCC": 0.11,
    "CC": 0.15,
    "C": 0.20,
}


def _score_to_calificacion(score: int) -> str:
    if score > 950:
        return "AAA"
    if score > 900:
        return "AA"
    if score > 850:
        return "A"
    if score > 800:
        return "BBB"
    if score > 750:
        return "BB"
    if score > 700:
        return "B"
    if score > 600:
        return "CCC"
    if score > 500:
        return "CC"
    return "C"


def calcular_oferta(body: EvaluationCreate) -> OfertaResult:
    ratio_ingreso = body.valor_mensual / body.sueldo
    tipo_garantia = GARANTIA_MAP.get(body.garantia, "Propietaria")

    data = pd.DataFrame({
        "ratio_ingreso": [ratio_ingreso],
        "zona": [body.ciudad],
        "tipo_inquilino": [body.tipo_inmueble],
        "antiguedad_contrato": [body.antiguedad_contrato],
        "tipo_garantia": [tipo_garantia],
    })

    prob: float = _modelo.predict_proba(data)[0, 1]
    score = int(prob * 1000)
    calificacion = _score_to_calificacion(score)
    rate = SCORE_RATES[calificacion]

    meses = body.meses_restantes or 1
    precio_propietario = (1 - rate) * 0.03 * body.valor_mensual * meses
    tasa_mensual = body.valor_mensual * (1 + 0.01) ** (1 / 12)

    return OfertaResult(
        calificacion=calificacion,
        precio_propietario=precio_propietario,
        tasa_mensual=tasa_mensual,
    )
