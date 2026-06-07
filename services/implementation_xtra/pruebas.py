# Caso nuevo
import pandas as pd
import joblib

modelo = joblib.load("modelo.pkl")
persona = [precioDeAlquiler,sueldo,meses_restantes,moneda,tipo_garantia,antiguedad_contrato,tipo_inquilino, barrio] 

data = pd.DataFrame({
    "ratio_ingreso": [persona[0]/persona[1]],
    "zona": [persona[7]],
    "tipo_inquilino": [persona[6]],
    "antiguedad_contrato": [persona[5]],
    "tipo_garantia": [persona[4]]
})

def InteresYOferta(data):
    prob = modelo.predict_proba(data)[0, 1]
    score = int(prob * 1000)
    if score > 95:
        calification= "AAA"
    elif score > 90:
        calification= "AA"  
    elif score > 85:
        calification= "A"
    elif score > 80:
        calification= "BBB"
    elif score > 75:
        calification= "BB"
    elif score > 70:
        calification= "B"
    elif score > 60:
        calification= "CCC"
    elif score > 50:
        calification= "CC"
    else:
        calification= "C"

    lista_scores={"AAA":0.05, "AA":0.055, "A":0.06, "BBB":0.07, "BB":0.08, "B":0.09, "CCC":0.11, "CC":0.15, "C":0.2}
    if persona[3] == "USD":
        precioAPropietario = (1- lista_scores[calification]) * 0.03 *persona[0]* persona[2]
        tasaPorMes = persona[0] * (1+0.01)**(1/12)
    return (precioAPropietario, tasaPorMes)





