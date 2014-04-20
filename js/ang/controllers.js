'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
        controller('mainCTRL', function($scope) {


            $(document).idle({
                onIdle: function() {

                    $('.dynaDiv').animate({height: '360px'});
                    $('.midSized').animate({width: '44%'});
                },
                idle: 300000
            });


            $scope.format = ' h:mm:ss a';
            $scope.blood_1 = 100;
            $scope.blood_2 = 120;
            var stop;
            $scope.fight = function() {
                stop = $timeout(function() {
                    if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
                        $scope.blood_1 = $scope.blood_1 - 3;
                        $scope.blood_2 = $scope.blood_2 - 4;
                        $scope.fight();
                    } else {
                        $timeout.cancel(stop);
                    }
                }, 100);
            };

            $scope.stopFight = function() {
                $timeout.cancel(stop);
            };

            $scope.resetFight = function() {
                $scope.blood_1 = 100;
                $scope.blood_2 = 120;
            };
            $scope.resetApp = function() {

                $('.dynaDiv').animate({height: '360px'});
                $('.midSized').animate({width: '44%'});

            };



            $('.dynaDiv').click(function(event) {
                if (event.target.id === 'videoButton') {
                    return;
                }
                if (event.target.id === 'selfieButton') {
                    return;
                }
                if (event.target.id === "resetButton") {
                    return;
                }

                $('.dynaDiv').not(this).animate({height: '150px'});
                $(this).animate({height: '1000px'});
                if ($(this).hasClass("midSized")) {
                    $(this).animate({width: '79%'});
                    $('.midSized').not(this).animate({width: '9%', height: '1000px'});
                } else {
                    $('.midSized').animate({width: '44%', height: '150px'});
                }



            });
        })
        .controller('promotionCTRL', function($scope) {
            var counter = 0;
            $scope.myInterval = 5000;
            $scope.products = [
                {sliderImage: 'img/promos/ps1.png'
                    , bigSlider: 'img/promos/pb1.png'
                }, {sliderImage: 'img/promos/ps2.jpg'
                    , bigSlider: 'img/promos/pb2.jpg'
                } 
            ];

            $scope.changeProduct = function() {
                $scope.promoPivot = 'expanded';

            };
            $scope.showSelector = function() {

                $scope.promoPivot = 'expandedMini';
            };

            $(function() {

                $("#Promotions").resize(function( ) {
                    if ($(this).height() <= 150) {
                        $scope.$apply(function() {
                            $scope.promoPivot = 'mini';

                        });

                    } else if ($(this).height() === 360) {
                        $scope.$apply(function() {
                            $scope.promoPivot = 'normal';

                        });

                    }
                });


            });

        }).controller('nioxinCTRL', function($scope, $http, $modal) {

    $http.get('js/data/products.json').success(function(items) {

        $scope.products = items.salonTech;



    })
    $scope.expandProducts = function() {

        $scope.productsPivot = 'nioxinProducts';
    };


    $scope.openModal = function(product) {

        var modalInstance = $modal.open({
            templateUrl: 'partials/products/nioxinModal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function() {
                    return product;
                }
            }
        });

    };
    var ModalInstanceCtrl = function($scope, $modalInstance, items) {


        $scope.currentItem = items;
        $scope.changeBuy = function() {
            $scope.nioxinMPivot = 'buyThis';
        };
        $scope.changeShare = function() {
            $scope.nioxinMPivot = 'shareThis';
        };

        $scope.changeVid = function(vid) {

            $scope.currentVideo = vid.url;

        };


        $scope.ok = function() {

            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $(function() {
        $("#nioxin").resize(function( ) {
            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.productsPivot = 'mini';
                });
            } else if ($(this).height() === 360) {
                $scope.$apply(function() {
                    $scope.productsPivot = 'normal';

                });

            }
        });
    });

}).controller('repcharge', function($scope, $http, $modal) {
    $scope.productFilter = {};

    $http.get('js/data/products.json').success(function(data) {
        $scope.products = data.repProducts;
        $scope.cats = data.repChargeCat;
    });

    $scope.showproducts = function(cat) {
        $scope.repchargePivot = 'products';
        $scope.productFilter.category = cat;

    };

    $scope.showCat = function() {
        $scope.repchargePivot = 'expanded';


    };

    $scope.setFilter = function(filter) {

        $scope.productFilter.category = filter;
    };


    $scope.open = function(product) {

        var modalInstance = $modal.open({
            templateUrl: 'partials/repcharge/repModal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function() {
                    return product;
                }
            }
        });

    };
    var ModalInstanceCtrl = function($scope, $modalInstance, items) {
        $scope.changeBuy = function() {
            $scope.repMPivot = 'buyThis';
        };
        $scope.changeShare = function() {
            $scope.repMPivot = 'shareThis';
        };
        $scope.item = items;

        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {

            $modalInstance.dismiss('cancel');
        };
    };

    $(function() {

        $("#repechage").resize(function( ) {
            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.repchargePivot = 'mini';

                });

            } else if ($(this).height() === 360) {
                $scope.$apply(function() {
                    $scope.repchargePivot = 'normal';

                });

            }
        });


    });

}).controller('wellaCTRL', function($scope, $http, $modal) {

    $scope.expand = function() {
    };

    $scope.paulMitchell;
    $scope.desin = {};
    $scope.openSelfie = function() {

        var modalInstance = $modal.open({
            templateUrl: 'partials/wella/modal.html',
            controller: ModalInstanceCtrl
        });

    };

    var ModalInstanceCtrl = function($scope, $modalInstance) {


        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $(function() {


        $("#wella").resize(function( ) {

            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.wellaPivot = 'miniHeight';

                });

            } else if ($(this).width() <= 150) {
                $scope.$apply(function() {
                    $scope.wellaPivot = 'miniWidth';
                });

            } else if ($(this).height() === 360) {
                $scope.$apply(function() {
                    $scope.wellaPivot = 'normal';

                });

            } else {
                $scope.$apply(function() {
                    $scope.wellaPivot = 'expanded';
                });

            }
        });


    });







}).controller('paulCTRL', function($scope, $http, $modal, $timeout) {

    $scope.expand = function() {
    };

    $scope.paulMitchell;
    $scope.desin = {};
    $scope.openVideo = function() {
        console.log('this hsould open it');
        var modalInstance = $modal.open({
            templateUrl: 'partials/paul/modal.html',
            controller: ModalInstanceCtrl

        });

    };

    var ModalInstanceCtrl = function($scope, $modalInstance) {


        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };


    $http.get('js/data/products.json').success(function(data) {
        $scope.paulItem = data.paulMitchell;
        console.log(data.paulMitchell);

    });


    $(function() {


        $("#paulMitchell").resize(function( ) {

            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.paulMitchell = 'miniHeight';

                });

            } else if ($(this).width() <= 150) {
                $scope.$apply(function() {
                    $scope.paulMitchell = 'miniWidth';
                });

            } else if ($(this).width() < 600) {
                $scope.$apply(function() {
                    $scope.paulMitchell = 'normal';

                });

            } else {
                $scope.$apply(function() {
                    $scope.paulMitchell = 'expanded';

                });

            }
        });


    });
});