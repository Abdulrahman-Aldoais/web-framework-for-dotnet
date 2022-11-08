﻿// Generated by IcedCoffeeScript 108.0.11
(function() {
  "use strict";
  var appSettings;

  appSettings = {
    appName: "Web Framework Admin",
    appShortName: "WF Admin",
    appLogoName: "<b>WF</b> Admin",
    appVersion: "v1.0",
    appCopyright: "Super-powered by <a href='http://www.bndy.net' target='_blank'>Bndy.Net</a> &copy; 2015-" + (new Date().getFullYear()) + ", based on AdminLTE",
    appNotification: {
      url: "/admin/api/getnotifications",
      interval: 0.5,
      more: "#",
      moreLabel: "View all"
    },
    appMenu: {
      url: "/admin/api/getmenus"
    }
  };

  window.appSettings = appSettings;

  if (typeof dialog !== "undefined") {
    dialog.set({
      title: appSettings.appShortName,
      shade: [0.2, "#000"],
      shadeClose: false,
      shift: 0,
      maxmin: true,
      fix: true,
      btn: ["OK", "Cancel"],
      closeBtn: 1,
      tips: [1, "#f0ad4e"],
      tipsTime: 3000,
      loadingIcon: 1,
      loadingShade: [0.6, "#fff"],
      useAlertify: true,
      wait: 0
    });
  }

  $(function() {
    if ($.fn.wysihtml5) {
      $("textarea.html").wysihtml5();
    }
    if ($.fn.datepicker) {
      $(".date").datepicker({
        todayHighlight: true,
        autoclose: true
      });
    }
    if (typeof moment !== "undefined" && moment !== null) {
      $(".daterange").daterangepicker({
        ranges: {
          "Today": [moment(), moment()],
          "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
        }
      }, function(start, end) {});
    }
    if ($.fn.iCheck) {
      $("input:checkbox, input:radio").iCheck({
        checkboxClass: "icheckbox_minimal",
        radioClass: "iradio_minimal",
        increaseArea: "20%"
      });
    }
    if ($.fn.slimScroll) {
      $('.slim-scroll').each(function() {
        return $(this).slimScroll({
          height: $(this).height()
        });
      });
    }
    $("form.readonly").find("input,select,button").each(function() {
      var tag, tagType, val, wrapper;
      tag = $(this)[0].tagName;
      tagType = $(this).attr("type");
      val = "";
      switch (tag) {
        case "INPUT":
          $(this).attr("readonly", true);
          $(this).attr("disabled", true);
          switch (tagType) {
            case "radio":
            case "checkbox":
              wrapper = $(this).parent();
              if (wrapper.parent().hasClass("checkbox" || wrapper.parent().hasClass("radio"))) {
                wrapper = wrapper.parent();
              }
              if ($(this).is(":checked")) {
                val = wrapper.text();
                wrapper.after("<div class='form-control-static'>" + val + "</div>");
              }
              return wrapper.remove();
            case "file":
              wrapper = $(this).parents('.form-group');
              return wrapper.remove();
            default:
              val = $(this).val();
              $(this).after("<div class='form-control-static'>" + val + "</div>");
              return $(this).remove();
          }
          break;
        case "SELECT":
          val = $(this).val();
          $(this).after("<div class='form-control-static'>" + val + "</div>");
          return $(this).remove();
      }
    });
    $("form.readonly:not(:visible)").show();
  });

}).call(this);
