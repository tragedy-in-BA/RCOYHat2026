import pytest
from unittest.mock import patch, MagicMock
from httpx import AsyncClient, ASGITransport
from app.main import app


VALID_PAYLOAD = {
    "nombre": "Juan García",
    "email": "juan@test.com",
    "telefono": "+54 9 11 1234 5678",
    "direccion": "Av. Corrientes 1234",
    "ciudad": "Buenos Aires",
    "tipo_inmueble": "departamento",
    "valor_mensual": 150000,
    "moneda": "ARS",
    "fecha_inicio": "2024-01-01",
    "fecha_fin": "2026-01-01",
    "meses_restantes": 18,
    "garantia": "caucion",
    "caucion": "si",
}


@pytest.mark.asyncio
async def test_create_evaluation_returns_201() -> None:
    mock_client = MagicMock()
    mock_client.table.return_value.insert.return_value.execute.return_value = MagicMock(error=None)

    with patch("app.routers.evaluations._get_supabase", return_value=mock_client), \
         patch("app.config.settings.supabase_url", "https://fake.supabase.co"), \
         patch("app.config.settings.supabase_service_key", "fake-key"), \
         patch("app.config.settings.resend_api_key", ""):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/evaluations", json=VALID_PAYLOAD)

    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "pending_review"
    assert "id" in data


@pytest.mark.asyncio
async def test_create_evaluation_rejects_zero_valor() -> None:
    payload = {**VALID_PAYLOAD, "valor_mensual": 0}
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/evaluations", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_create_evaluation_rejects_invalid_email() -> None:
    payload = {**VALID_PAYLOAD, "email": "not-an-email"}
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/evaluations", json=payload)
    assert response.status_code == 422
