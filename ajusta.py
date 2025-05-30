import json

with open('eurovision.json', 'r', encoding='utf-8') as f:
    dados = json.load(f)

# Se os dados estão neste formato: { "ed1956": {...}, "ed1957": {...} }
# transforma num array:
if isinstance(dados, dict):
    nova_lista = []
    for k, v in dados.items():
        v["_id"] = k
        nova_lista.append(v)

    with open('eurovision_array.json', 'w', encoding='utf-8') as f_out:
        json.dump(nova_lista, f_out, ensure_ascii=False, indent=2)
