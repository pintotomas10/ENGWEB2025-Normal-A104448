var Edicao = require('../models/edicao.js')

module.exports.getAllEdicoes = () => {
    return Edicao
      .find({}, { _id: 1, anoEdicao: 1, organizacao: 1, vencedor: 1 })
      .exec();
  };
  
module.exports.getEdicaoById = id => {
    return Edicao
        .findById(id)
        .exec()
}

module.exports.getOrganizadores = async () => {
  return Edicao.aggregate([
    {
      $group: {
        _id: "$organizacao",
        anos: { $push: "$anoEdicao" }
      }
    },
    {
      $project: {
        _id: 0,
        pais: "$_id",
        anos: 1
      }
    },
    { $sort: { pais: 1 } } // Ordena alfabeticamente pelo nome do país
  ]).exec();
};

module.exports.getVencedores = async () => {
    return Edicao.aggregate([
      {
        $group: {
          _id: "$vencedor",
          anos: { $push: "$anoEdicao" }
        }
      },
      {
        $project: {
          _id: 0,
          pais: "$_id",
          anos: 1
        }
      },
      { $sort: { pais: 1 } }
    ]).exec();
};

module.exports.getInterpretes = async () => {
    return Edicao.aggregate([
      { $unwind: "$musicas" },
      {
        $group: {
          _id: { nome: "$musicas.interprete", pais: "$musicas.pais" }
        }
      },
      {
        $project: {
          _id: 0,
          interprete: "$_id.nome",
          pais: "$_id.pais"
        }
      },
      { $sort: { interprete: 1 } }
    ]).exec();
  };

module.exports.insert = edicao => {
    var newEdicao = new Edicao(edicao)
    return newEdicao.save()
}

module.exports.update = (id, edicao) => {
    return Edicao
        .findByIdAndUpdate(id, edicao, { new: true })
        .exec()
}

module.exports.delete = id => {
    return Edicao
        .findByIdAndDelete(id, { new: true })
        .exec()
}