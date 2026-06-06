ADVANCE_RATE = 0.90


def calcular_adelanto(valor_mensual: float, meses_restantes: int) -> dict[str, float]:
    flujo_total = valor_mensual * meses_restantes
    adelanto_estimado = flujo_total * ADVANCE_RATE
    return {"flujo_total": flujo_total, "adelanto_estimado": adelanto_estimado}
