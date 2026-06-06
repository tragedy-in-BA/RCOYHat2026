from fastapi import APIRouter, HTTPException
from app.models import EvaluationCreate, EvaluationResponse
from app.config import settings
import resend
import uuid

router = APIRouter(prefix="/evaluations", tags=["evaluations"])


def _get_supabase() -> object:
    from supabase import create_client
    return create_client(settings.supabase_url, settings.supabase_service_key)


@router.post("", response_model=EvaluationResponse, status_code=201)
async def create_evaluation(body: EvaluationCreate) -> EvaluationResponse:
    row_id = str(uuid.uuid4())

    row = body.model_dump(mode="json")
    row["id"] = row_id
    row["status"] = "pending_review"

    if settings.supabase_url and settings.supabase_service_key:
        client = _get_supabase()
        result = client.table("evaluations").insert(row).execute()  # type: ignore[union-attr]
        if hasattr(result, "error") and result.error:
            raise HTTPException(status_code=500, detail="DB insert failed")

    if settings.resend_api_key:
        resend.api_key = settings.resend_api_key
        resend.Emails.send({
            "from": "RCO <noreply@rco.com.ar>",
            "to": [settings.team_email],
            "subject": f"Nueva evaluación — {body.nombre}",
            "html": (
                f"<p><strong>Propietario:</strong> {body.nombre} ({body.email})</p>"
                f"<p><strong>Teléfono:</strong> {body.telefono}</p>"
                f"<p><strong>Inmueble:</strong> {body.direccion}, {body.ciudad}</p>"
                f"<p><strong>Valor mensual:</strong> {body.moneda} {body.valor_mensual:,.0f}</p>"
                f"<p><strong>Garantía:</strong> {body.garantia}</p>"
                f"<p><strong>ID:</strong> {row_id}</p>"
            ),
        })

    return EvaluationResponse(id=row_id, status="pending_review")
