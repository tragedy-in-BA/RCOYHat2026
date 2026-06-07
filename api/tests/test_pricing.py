import pytest
from unittest.mock import patch, MagicMock
import numpy as np
from datetime import date
from app.models import EvaluationCreate, OfertaResult
from app.services.pricing import calcular_oferta, _score_to_calificacion, SCORE_RATES

VALID_RATINGS = set(SCORE_RATES.keys())

BASE_BODY = EvaluationCreate(
    nombre="Test",
    email="test@test.com",
    telefono="+54 9 11 0000 0000",
    direccion="Corrientes 1234",
    ciudad="Palermo",
    tipo_inmueble="comercial",
    valor_mensual=450000,
    moneda="ARS",
    fecha_inicio=date(2024, 1, 1),
    fecha_fin=date(2026, 1, 1),
    meses_restantes=18,
    garantia="caucion",
    sueldo=2500000,
    antiguedad_contrato=12,
)


def test_calcular_oferta_returns_oferta_result() -> None:
    result = calcular_oferta(BASE_BODY)
    assert isinstance(result, OfertaResult)
    assert result.calificacion in VALID_RATINGS
    assert result.precio_propietario > 0
    assert result.tasa_mensual > 0


def test_calcular_oferta_precio_formula() -> None:
    result = calcular_oferta(BASE_BODY)
    rate = SCORE_RATES[result.calificacion]
    expected = (1 - rate) * 0.03 * BASE_BODY.valor_mensual * (BASE_BODY.meses_restantes or 1)
    assert abs(result.precio_propietario - expected) < 0.01


@pytest.mark.parametrize("prob,expected", [
    (0.96, "AAA"),
    (0.91, "AA"),
    (0.86, "A"),
    (0.81, "BBB"),
    (0.76, "BB"),
    (0.71, "B"),
    (0.61, "CCC"),
    (0.51, "CC"),
    (0.40, "C"),
])
def test_score_to_calificacion_thresholds(prob: float, expected: str) -> None:
    score = int(prob * 1000)
    assert _score_to_calificacion(score) == expected


def test_calcular_oferta_uses_mocked_model() -> None:
    mock_model = MagicMock()
    mock_model.predict_proba.return_value = np.array([[0.05, 0.96]])

    with patch("app.services.pricing._modelo", mock_model):
        result = calcular_oferta(BASE_BODY)

    assert result.calificacion == "AAA"
    rate = SCORE_RATES["AAA"]
    expected_precio = (1 - rate) * 0.03 * BASE_BODY.valor_mensual * (BASE_BODY.meses_restantes or 1)
    assert abs(result.precio_propietario - expected_precio) < 0.01
