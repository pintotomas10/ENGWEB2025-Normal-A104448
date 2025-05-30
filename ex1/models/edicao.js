const mongoose = require('mongoose')

const musicaSchema = new mongoose.Schema({
  id: String,
  link: String,
  titulo: String,
  pais: String,
  compositor: String,
  interprete: String,
  letra: String // opcional, pode não existir em todos
}, { _id: false }) // Desativa o _id automático em subdocumentos

const edicaoSchema = new mongoose.Schema({
  _id: String, // Exemplo: "ed1975"
  anoEdicao: Number,
  organizacao: String,
  vencedor: String,
  musicas: [musicaSchema]
}, { versionKey: false })

module.exports = mongoose.model('edicao', edicaoSchema)
