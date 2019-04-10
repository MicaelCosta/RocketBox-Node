const mongoose = require('mongoose');

//Schema é como se fosse a tabela
const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, {
    timestamps: true //Cria automatica datas de criação e update
});

module.exports = mongoose.model('Box', Box);