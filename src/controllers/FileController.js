const File = require('../models/File');
const Box = require('../models/Box');

class FileController {
    async store(req, res) {
        //Criar um arquivo

        // console.log(req.file)
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);
        await box.save();

        req.io.sockets.in(box._id).emit('file', file);
 
        return res.json(file);
        // return res.send('Deu certo turma')

    }
}

module.exports = new FileController();   