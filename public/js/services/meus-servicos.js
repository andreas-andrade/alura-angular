angular.module('meusServicos', ['ngResource'])

.factory('recursoFoto', function($resource) { // retorna um objeto
    return $resource('v1/fotos/:fotoId', null, {
      update: { // definindo uma funcao
        method: 'PUT'
      }
    });
  })
  .factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) {
    var evento = 'fotoCadastrada';
    var servico = {};
    servico.cadastrar = function(foto) {
      return $q(function(resolve, reject) {
        if (foto._id) {
          recursoFoto.update({ fotoId: foto._id }, foto, function() {
              $rootScope.$broadcast(evento); // grita foto cadastrada! e assim é possivel capturar isto em diretivas
              resolve({
                mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso!',
                inclusao: false
              });
            }, function(erro) {
              console.log(erro);
              reject({
                mensagem: 'Não foi possível alterar a foto ' + foto.titulo
              });
            });
        } else {
          recursoFoto.save(foto, function() {
            $rootScope.$broadcast(evento); // grita foto cadastrada! e assim é possivel capturar isto em diretivas
            resolve({
              mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso!',
              inclusao: true
            });
          }, function(erro) {
            console.log(erro);
            reject({
              mensagem: 'Não foi possível incluir a foto ' + foto.titulo
            });
          });
        }
      });
    };

    return servico;
  });
