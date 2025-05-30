import json

def converter_ano_para_inteiro(ficheiro_entrada, ficheiro_saida):
    with open(ficheiro_entrada, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    for edicao in dados:
        if "anoEdicao" in edicao:
            try:
                edicao["anoEdicao"] = int(edicao["anoEdicao"])
            except ValueError:
                print(f"Erro a converter anoEdicao em {edicao['_id']}")

    with open(ficheiro_saida, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    converter_ano_para_inteiro("eurovision.json", "eurovision_ano_numerico.json")
