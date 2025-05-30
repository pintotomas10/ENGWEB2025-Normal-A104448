const express = require('express');
const router = express.Router();
const EdicaoController = require('../controllers/edicao');

// GET /edicoes → todas as edições (ano, organizador, vencedor)
router.get('/', function(req, res, next) {
  const { org } = req.query;

  if (org) {
    // Se houver ?org=XXXX, aplicar filtro manualmente
    EdicaoController.getAllEdicoes()
      .then(data => {
        const filtrado = data.filter(e => e.organizacao === org);
        res.status(200).jsonp(filtrado);
      })
      .catch(error => res.status(500).jsonp(error));
  } else {
    // Sem filtro: devolve tudo
    EdicaoController.getAllEdicoes()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
  }
});

/* GET edicao by ID. */
router.get('/:id', function(req, res, next) {
  Edicao.getEdicaoById(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

/* GET lista Paises Organizadores/Vencedores sem repetição ordem alfabética */
router.get('/paises', function(req, res, next) {
  const { papel } = req.query;

  if (papel === 'org') {
    getOrganizadores()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
  } else if (papel === 'venc') {
    getVencedores()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.status(500).jsonp(error));
  } else {
    res.status(400).jsonp({ error: "Parâmetro 'papel=org' ou 'papel=venc' é obrigatório." });
  }
});

/* GET Interpretes sem repetiçoes por ordem alfabetica*/
router.get('/interpretes', function(req, res, next) {
  getInterpretes()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error));
});

/* POST new edicao */
router.post('/', function(req, res, next) {
  Edicao.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

/* PUT change Edicao */
router.put('/:id', function(req, res, next) {
  Edicao.update(req.params.id, req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error));
});

/* DELETE edicao */
router.delete('/:id', function(req, res, next) {
  Edicao.delete(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

module.exports = router;