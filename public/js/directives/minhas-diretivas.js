angular.module('minhasDiretivas', [])
  .directive('meuPainel', function() {

    var ddo = {};

    ddo.restrict = "AE";
    ddo.transclude = true;

    ddo.scope = {
      titulo: '@'
    };

    ddo.templateUrl = 'js/directives/meu-painel.html';

    return ddo;
  })
  .directive('minhaFoto', function() {

    var ddo = {};

    ddo.restrict = "AE";

    ddo.scope = {
      titulo: '@',
      url: '@'
    };

    ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';

    return ddo;
  })
  .directive('meuBotaoPerigo', function() {
    var ddo = {};

    ddo.restrict = "E";

    ddo.scope = {
      nome: '@',
      acao: '&'
    };

    ddo.template = '<button type="button" class="btn btn-danger btn-block" ng-click="acao(foto)">{{ nome }}</button>';

    return ddo;
  })
  .directive('meuFocus', function () {
    var ddo = {};
    ddo.restrict = "A";

    // ddo.scope = {
    //   focado: '='
    // };

    ddo.link = function (scope, element) {
        // scope.$watch('focado', function () {
        //   if (scope.focado){
        //     element[0].focus();
        //     scope.focado = false;
        //   }
        // });
        scope.$on('fotoCadastrada', function () {
          element[0].focus();
        });
    };

    return ddo;
  })

  //diretiva bonus

  .directive('meusTitulos', function () {
    var ddo = {};
    ddo.restrict = 'E';
    ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
    ddo.controller = function ($scope, recursoFoto) {
      recursoFoto.query(function (fotos) {
        $scope.titulos = fotos.map(function (foto) {
          console.log(foto.titulo);
          return foto.titulo;
        });
      });
    }; // fim do controller
    return ddo;
  });
