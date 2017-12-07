module.exports.jogo = function(application, req, res) {
    
    if(req.session.autorizado !== true) {
        res.render('index', {validacao:[{msg: "Você precisa estar logado para prosseguir"}]});
        return;   
    }
    var msg = '';

    if(req.query.msg != '') {
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(usuario, function(result){
        
        if(result.length > 0) {
            res.render('jogo', {img_casa: req.session.casa, jogo: result[0], msg: msg});
        }
    });

   
};

module.exports.sair = function(application,req, res) {
    req.session.destroy(function(){
        res.render('index', {validacao: {}});
    });
};

module.exports.suditos = function(application,req, res) {

    if(req.session.autorizado !== true) {
        res.render('index', {validacao:[{msg: "Você precisa estar logado para prosseguir"}]});
        return;   
    }
        res.render('aldeoes', {validacao: {}});
    
};

module.exports.pergaminhos = function(application,req, res) {

    if(req.session.autorizado !== true) {
        res.render('index', {validacao:[{msg: "Você precisa estar logado para prosseguir"}]});
        return;   
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.getAcoes(req.session.usuario, function(result){
        res.render('pergaminhos', {acoes: result});
    });

    
    
};

module.exports.ordenarAcaoSudito = function(application,req, res) {

    if(req.session.autorizado !== true) {
        res.render('index', {validacao:[{msg: "Você precisa estar logado para prosseguir"}]});
        return;   
    }

    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros) {
        res.redirect('jogo?msg=A');
        return;
    }
    

    var connection = application.config.dbConnection;
    dadosForm.usuario = req.session.usuario;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.acao(dadosForm);
    res.redirect('jogo?msg=B');
    
};

module.exports.revogarAcao = function(application,req, res) {


    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    var _id = req.query.id_acao;

    jogoDAO.remover_acao(_id, function(err, result){
        res.redirect("/jogo?msg=D")
    });
};
