import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from services.calculator import calcular_adelanto, ADVANCE_RATE


def test_advance_rate_is_ninety_percent() -> None:
    assert ADVANCE_RATE == 0.90


def test_calcular_adelanto_basic() -> None:
    result = calcular_adelanto(150_000, 18)
    assert result["flujo_total"] == 2_700_000
    assert result["adelanto_estimado"] == 2_430_000


def test_calcular_adelanto_usd() -> None:
    result = calcular_adelanto(500, 24)
    assert result["flujo_total"] == 12_000
    assert result["adelanto_estimado"] == 10_800


def test_calcular_adelanto_single_month() -> None:
    result = calcular_adelanto(100_000, 1)
    assert result["flujo_total"] == 100_000
    assert result["adelanto_estimado"] == 90_000
