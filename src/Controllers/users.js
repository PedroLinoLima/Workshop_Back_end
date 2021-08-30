const User = require("../Models/User");
const bcrypt = require("bcryptjs")

module.exports = {
    async store(req,res) {
        const {name, email, password} = req.body;

        //verificar se o usuário já existe
        let user = await User.findOne({
            where: {
                email: email
            }
        })

        if(user) {
            return res.status(400).send({error: "Este e-mail já está sendo utilizado por outro usuário"});
        }

        //gerar o hash da senha
        const passwordHashed = bcrypt.hashSync(password);

        //inserir o usuário no banco
        user = await User.create({
            name: name,
            email: email,
            password: passwordHashed
        })

        //gerar um token


        //retornar o usuário
        res.send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    }
}