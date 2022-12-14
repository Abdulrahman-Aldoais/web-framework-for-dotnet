// Generated by IcedCoffeeScript 108.0.11
(function() {
  app.controller("LayoutCtrl", [
    "$scope", "$interval", "$http", function($scope, $interval, $http) {
      var getNotification;
      $scope.appSettings = appSettings;
      $scope.appNotifications = [];
      getNotification = function() {
        return $http.get($scope.appSettings.appNotification.url).success(function(data) {
          angular.forEach(data, function(item) {
            return $scope.appNotifications.push(item);
          });
          if (data.length > 0) {
            return dialog.error("You have " + data.length + " messages.");
          }
        });
      };
      if ($scope.appSettings.appNotification.url) {
        getNotification();
        $interval(function() {
          return getNotification();
        }, $scope.appSettings.appNotification.interval * 60 * 1000);
      }
      $scope.appMenus = [];
      if ($scope.appSettings.appMenu.url) {
        $http.get($scope.appSettings.appMenu.url).success(function(data) {
          $scope.appMenus = data;
          if ($scope.appMenus.length > 0) {
            return $scope.menuClick($scope.appMenus[0], null);
          }
        });
      }
      $scope.onNotificationClick = function(item) {
        $scope.appNotifications.splice($scope.appNotifications.indexOf(item), 1);
        return dialog.alert(item.content, null, {
          title: item.title
        });
      };
      $scope.activedMenus = [];
      $scope.menuClick = function(menu, $event) {
        var m, _i, _len, _ref;
        if (menu.url && menu.url.indexOf("#") < 0) {
          _ref = $scope.activedMenus;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            m = _ref[_i];
            m.actived = false;
          }
          menu.actived = true;
          if ($scope.activedMenus.indexOf(menu) < 0) {
            $scope.activedMenus.push(menu);
          }
        }
        if ($event && $($event.target).parents(".with-sidebar-horizontal").length) {
          return $event.stopPropagation();
        }
      };
      $scope.search = function() {
        if ($scope.searchKeywords) {
          return $scope.menuClick({
            text: "Search",
            url: "/admin/home/search?q=" + $scope.searchKeywords
          }, null);
        }
      };
      $scope.destoryMenu = function(menu) {
        $scope.activedMenus.splice($scope.activedMenus.indexOf(menu), 1);
        if (menu.actived) {
          return $scope.activedMenus[0].actived = true;
        }
      };
      $scope.tools = [
        {
          text: "Call Me",
          icon: "fa fa-phone fa-fw",
          onclick: function() {
            return dialog.alert("You clicked `" + this.text + "` tool.");
          }
        }, {
          text: "Task",
          icon: "fa fa-calendar fa-fw",
          onclick: function() {
            return dialog.alert("You clicked `" + this.text + "` tool.");
          }
        }
      ];
      $scope.logout = function() {
        return dialog.confirm("Are you sure you want to log out?", function() {
          dialog.success("Logged out");
          return location.href = "/admin/account/logout";
        });
      };
    }
  ]);

}).call(this);
