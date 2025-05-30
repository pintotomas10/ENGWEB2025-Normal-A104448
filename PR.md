# Persistência de dados
Para garantir a persistência de dados, foi utilizada uma base de dados MongoDB.  
Foram realizadas as seguintes alterações ao dataset original usando os ficheiros `data.py`, `ajusta.py` e `aranja.py`:
- Substitui "id" da edição por "_id" (requisito de MongoDB);
- Converte "anoEdição" para inteiro;
- Corrige "organizacao" para "organização" (acentuação correta);
- Garante presença do campo "vencedor" — se estiver ausente, coloca null;
- Garante que o output é um array de objetos, pronto para mongoimport.

# Setup de bases de dados

```bash
docker start mongoEW
docker cp out.json mongoEW:/tmp
docker exec mongoEW mongoimport -d eurovisao -c edicoes /tmp/out.json --jsonArray
docker exec -it mongoEW sh
mongosh
use eurovisao
show collections
```
A importação utilizou o ficheiro `eurovision.json`, gerado a partir do original com os comandos descritos na secção seguinte.

# Instruções de como executar as aplicações desenvolvidas
### Execução da Api (`porta 25000`)

```bash
cd ex1
npm i
npm start
```

### Execução da Interface Web (`porta 25001`)

```bash
cd ex2
npm i
npm start
```

Abrir no browser:

- API: `http://localhost:25000/edicoes`
- Interface Web: `http://localhost:25001`

# Testes à API
Os testes foram realizados no Postman.


# 🏷️ Identificação

**Nome:** Tomás Pinto Rodrigues 
**Número de Aluno:** 104448