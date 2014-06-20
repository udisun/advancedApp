'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', '$http', '$filter', '$modal',
    function($scope, Global, $http, $filter, $modal) {
    $scope.global = Global;
    $scope.global.test = true;
    $scope.abc = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];
    $scope.expertises = [];
    $scope.medicalActs = [];
    $scope.treatments = [];
    $scope.listExpertise = [];
    $scope.medicalProblems = [];
    $scope.listMedicalProblem = [];
    $scope.listExpertise = [];
    $scope.cities = [];
    $scope.doctors = {};
    $scope.slide = true;
    $scope.global.selectedIndex = [-1, -1, -1];
    $scope.currentTab = 'one.tpl.html';
    $scope.tabs = [{
      title: 'התמחויות',
      url: 'one.tpl.html'
        }, {
      title: 'בעיות רפואיות',
      url: 'two.tpl.html'
        }, {
      title: 'טיפולים',
      url: 'three.tpl.html'
        }];
    $scope.currentPage = 1;
    $scope.pageSize = 6;
    var flag = 0;

    function makeMatrix(list) {
      var tmp = [];
      for (var i = 0; i < list.length; i++) {
        if (i % 4 == 0) tmp.push([]);
        tmp[tmp.length - 1].push(list[i]);
      }
      return tmp;
    };

    $scope.changeSlide = function() {
      $scope.slide = !$scope.slide;
    };

    $scope.changeSlidebySearch = function() {
      if ($scope.slide)
        $scope.slide = !$scope.slide;
      else $scope.searchEl($scope.global.toSearch)
    };

    function findByChar(list, char, flag) {
      if (list) {
        var tmp = [];
        for (var i = 0; i < list.length; i++) {
          if ((list[i].name).substring(0, 1) == char) {
            tmp.push(list[i]);
          }
        }
        if (flag)
          tmp = makeMatrix(tmp);
        return tmp;
      }
      return;
    }

    $scope.init = function() {
      if (!flag) {
        $http.get('/doctors/specialities').success(function(data, status, headers, config) {

          if (data) {
            angular.forEach(data, function(t) {
              $scope.expertises.push(t);

            });
          }

        });

        flag = 1;
      }

    }

    $scope.onClickTab = function(tab) {
      $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
      return tabUrl === $scope.currentTab;
    }

    $scope.setMod = function(txt) {
      $scope.global.medicalProblem = txt;
    }

    function callback() {
      setTimeout(function() {
        $("#se").removeAttr("style").hide().fadeIn();
      }, 1000);
    };

    $scope.search = function() {
      if ($scope.slide) {
        $("#se").effect("fade", {
          percent: 0
        }, 1000, callback);
      }

    }

    $scope.openContact = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/partials/contact.html',
        controller: 'contactController'
      });
    }

    $scope.searchByAbc = function(char) {
      if ($scope.currentTab == $scope.tabs[0].url) {
        $scope.listExpertise = [];
        $scope.listExpertise = findByChar($scope.expertises, char, 1);
      } else if ($scope.currentTab == $scope.tabs[1].url) {
        $scope.listMedicalProblem = [];
        $scope.listMedicalProblem = findByChar($scope.medicalProblems, char, 1);
      } else {
        $scope.listTreatments = [];
        $scope.listTreatments = findByChar($scope.treatments, char, 1);
      }
    }

    $scope.searchEl = function(txt, index, item, tid) {
      if (index == 1) {
        $scope.expertise = txt;

      };

      //item used to show only one select caregory
      for (var i = 0; i < 3; i++) {
        if (item != i)
          $scope.global.selectedIndex[i] = -1;
      };
      if (index == 1) {
        // $http.get('/elastic?r=' + txt).success(function(data, status, headers, config) {
        //     if (data) {
        //         $scope.doctors = data;
        //         $scope.doctorsLength = $scope.doctors.hits.hits.length;
        //     }
        // });

        $http.get('/doctors/speciality/' + tid).success(function(data, status, headers, config) {
          if (data) {
            $scope.doctors = data;
            console.log($scope.doctors);
          }
        });

      }

      if (index == 2) {
        $http.get('/elastic_sub?par=' + $scope.expertise + '&sub=' + txt).success(function(data, status, headers, config) {
          if (data) {
            $scope.doctors = data;
            $scope.doctorsLength = $scope.doctors.hits.hits.length;
          }
        });
      }
      $scope.global.selectedIndex2 = "-1";
    }
    $scope.goto = function(item) {
      if (item || ($scope.global.toSearch.length > 2 && $scope.slide)) {
        $scope.slide = false;
        $scope.search();
      }
      if (item)
        $scope.global.toSearch = item;
    }

    $scope.docName = function(doctor) {
      var name = [doctor.field_pronoun[0]];
      if (doctor.field_pronoun[0] == "פרופ") {
        name[0] += "'"
      } else if (doctor.field_pronoun[0] == "ד" && doctor.field_pronoun[1] == "ר") {
        name[0] = doctor.field_pronoun.join('"');
      }
      name[1] = doctor.field_first_name.join(" ");
      name[2] = doctor.field_last_name.join(" ");
      return name.join(" ");
    }

    $scope.expName = function(doctor) {
      angular.forEach($scope.medicalProblems, function(t) {
        if (doctor.field_sub_experience == t.tid)
          $scope.sub_name = t.name;
      });
      angular.forEach($scope.expertises, function(t) {
        if ($scope.expertise == t.tid)
          $scope.par_name = t.name;
      });

    }

    }
]);