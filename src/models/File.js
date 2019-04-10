const mongoose = require('mongoose');

//Schema é como se fosse a tabela
const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true, //Cria automatica datas de criação e update
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

File.virtual('url').get(function(){
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`
});

module.exports = mongoose.model('File', File);