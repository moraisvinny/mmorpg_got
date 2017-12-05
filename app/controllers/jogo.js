module.exports.jogo = function(application, req, res) {
    
    if(req.session.autorizado) {
        res.render('jogo');
    } else {
        res.render('', {validacao:[{msg: "Você precisa estar logado para prosseguir"}]});
    }
    
};

module.exports.sair = function(application,req, res) {
    req.session.destroy(function(){
        res.render('index', {validacao: {}});
    })
}