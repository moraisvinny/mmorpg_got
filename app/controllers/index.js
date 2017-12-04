module.exports.index = function(application, req, res) {
    res.render('index', {validacao:{}});
}

module.exports.autenticar = function(application, req, res) {

    var dadosForm = req.body;

    req.assert('usuario', 'Usuario não deve ser nulo').notEmpty();
    req.assert('senha', 'Senha não pode ser nula').notEmpty();

    var erros = req.validationErrors();

    if(erros) {
        res.render("index", {validacao:erros});
        return;
    }
    res.send("Tudo ok para criar a sessão");
}