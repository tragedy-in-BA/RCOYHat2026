from pydantic import BaseModel, EmailStr, field_validator
from typing import Literal, Optional
from datetime import date


class EvaluationCreate(BaseModel):
    nombre: str
    email: EmailStr
    telefono: str
    direccion: str
    ciudad: str
    tipo_inmueble: Literal["empresa", "profesional", "persona fisica"]
    valor_mensual: float
    moneda: Literal["ARS", "USD"]
    fecha_inicio: date
    fecha_fin: date
    meses_restantes: Optional[int] = None
    garantia: Literal["propietario", "caucion", "recibo", "aval", "deposito"]
    caucion: Literal["si", "no"] = "no"
    sueldo: float
    antiguedad_contrato: int
    contrato_pdf_path: Optional[str] = None
    dni_path: Optional[str] = None

    @field_validator("valor_mensual")
    @classmethod
    def valor_must_be_positive(cls, v: float) -> float:
        if v <= 0:
            raise ValueError("valor_mensual must be positive")
        return v

    @field_validator("sueldo")
    @classmethod
    def sueldo_must_be_positive(cls, v: float) -> float:
        if v <= 0:
            raise ValueError("sueldo must be positive")
        return v


class OfertaResult(BaseModel):
    calificacion: str
    precio_propietario: float
    tasa_mensual: float


class EvaluationResponse(BaseModel):
    id: str
    status: str
    oferta: Optional[OfertaResult] = None
