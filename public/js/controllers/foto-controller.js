angular.module('alurapic')
  .controller('FotoController', function($scope, cadastroDeFotos, recursoFoto, $routeParams) {

    $scope.foto = {};
    $scope.mensagem = '';

    if ($routeParams.fotoId) { recursoFoto.get({ fotoId: $routeParams.fotoId }, function(foto) { // passando o ID da foto para a url /edit/:fotoId
        $scope.foto = foto;
      }, function(erro) {
        console.log(erro);
        $scope.mensagem = 'Não foi possível obter a foto';
      });
    }

    $scope.submeter = function() {

      if ($scope.formulario.$valid) {
        cadastroDeFotos.cadastrar($scope.foto)
          .then(function(dados) {
            $scope.mensagem = dados.mensagem;
            if (dados.inclusao)
              $scope.foto = {};
            // $scope.focado = true;
            // $scope.$broadcast('fotoCadastrada'); // grita foto cadastrada! e assim é possivel capturar isto em diretivas
          })
          .catch(function(dados) {
            $scope.mensagem = dados.mensagem;
          });
      }
    };
  });
