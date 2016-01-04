angular.module('alurapic').controller('FotosController', function($scope, recursoFoto) {

  $scope.fotos = [];
  $scope.filtro = '';
  $scope.mensagem = '';

  recursoFoto.query(function (fotos) {
    $scope.fotos = fotos;
  }, function (erro) { // segundo parametro é o erro que pode ocorrer
    console.log(erro);
  });

  $scope.remover = function(foto) {
    recursoFoto.delete({fotoId : foto._id}, function () {
      console.log("Foto " + foto.titulo + " foi removida com sucesso!");
      var indiceDaFoto = $scope.fotos.indexOf(foto);
      $scope.fotos.splice(indiceDaFoto, 1);
      $scope.mensagem = "Foto " + foto.titulo + " foi removida com sucesso!";
    }, function (erro) {
      console.log(erro);
      console.log("Não foi possível remover a foto: " + foto.titulo);
      $scope.mensagem = "Não foi possível remover a foto: " + foto.titulo;
    });

  };
});
