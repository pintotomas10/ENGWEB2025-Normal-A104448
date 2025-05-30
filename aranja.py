import json

def normalizar_campos(musica):
    nova_musica = {}
    for chave, valor in musica.items():
        chave_nova = chave
        if chave == "título":
            chave_nova = "titulo"
        elif chave == "intérprete":
            chave_nova = "interprete"
        elif chave == "país":
            chave_nova = "pais"
        elif chave == "anoEdição":
            chave_nova = "anoEdicao"
        nova_musica[chave_nova] = valor
    return nova_musica

def processar_ficheiro(entrada, saida):
    with open(entrada, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    nova_lista = []

    for chave_edicao, edicao in dados.items():
        nova_edicao = {
            "id": edicao.get("id"),
            "anoEdicao": edicao.get("anoEdição", edicao.get("anoEdicao")),
            "organizacao": edicao.get("organizacao"),
            "vencedor": edicao.get("vencedor", None),
            "musicas": [normalizar_campos(m) for m in edicao.get("musicas", [])]
        }
        nova_lista.append(nova_edicao)

    with open(saida, 'w', encoding='utf-8') as f:
        json.dump(nova_lista, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    processar_ficheiro("dados.json", "dados_mongo_ready.json")
