(function() {
    var initCommandBar,
        initTaskList,
        progressIndicator,
        getTasks,
        changeEventHandler,
        openDialog,
        openPanel;

    initCommandBar = function() {
        var elements = document.querySelectorAll(".ms-CommandBar"),
            i = 0;
            len = elements.length,
            btnBurndown = document.getElementById("btnBurndown");
            btnTeam = document.getElementById("btnTeam"),
            panel = document.querySelector(".ms-Panel");
        
        for (i; i < elements.length; i++) {
            new fabric['CommandBar'](elements[i]);
        }

        btnBurndown.onclick = function() {
          openDialog();
        };

        btnTeam.onclick = function() {
          openPanel(panel);
        };
    };

    openDialog = function() {
      var dialog = document.querySelector(".ms-Dialog");
      var dialogComponent = new fabric['Dialog'](dialog);

      dialogComponent.open();
    };

    openPanel = function(panel) {
      
      new fabric['Panel'](panel);
    };

    initTaskList = function() {
        var elements = document.querySelectorAll(".ms-CheckBox"),
            i = 0;
            len = elements.length;

        for (i; i < elements.length; i++) {
          new fabric['CheckBox'](elements[i]);
          elements[i].onchange = changeEventHandler;
        }
    };

    getTasks = function() {
      var tasks = [],
          elements = document.querySelectorAll(".ms-CheckBox input"),
          i = 0;
          len = elements.length;

          for (i; i < elements.length; i++) {
            tasks.push({
              id: elements[i].nextElementSibling.getAttribute('name'),
              checked: elements[i].checked
            });
          }

      return tasks;
    };

    changeEventHandler = function() {
      var tasks = getTasks(),
          completed = tasks.filter(function(x) { return x.checked; });
      
      progressIndicator.setProgressPercent(completed.length/tasks.length);
    };

    initProgressBar = function () {
      var element = document.getElementById("progressIndicator");
      
      progressIndicator = new fabric['ProgressIndicator'](element);
      
      setTimeout(function() {
        changeEventHandler();
      }, 2000);
    };

    initBurndown = function() {
        $('#burndown').highcharts({
            title: {
              text: 'Burndown Chart',
              x: -20 //center
            },
            colors: ['blue', 'red'],
            plotOptions: {
              line: {
                lineWidth: 3
              },
              tooltip: {
                hideDelay: 200
              }
            },
            subtitle: {
              text: 'Sprint 1',
              x: -20
            },
            xAxis: {
              categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
                           'Day 7', 'Day 8', 'Day 9', 'Day 10']
            },
            yAxis: {
              title: {
                text: 'Hours'
              },
              plotLines: [{
                value: 0,
                width: 1
              }]
            },
            tooltip: {
              valueSuffix: ' hrs',
              crosshairs: true,
              shared: true
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
            },
            series: [{
              name: 'Ideal Burn',
              color: 'rgba(255,0,0,0.25)',
              lineWidth: 2,
              data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
            }, {
              name: 'Actual Burn',
              color: 'rgba(0,120,200,0.75)',
              marker: {
                radius: 6
              },
              data: [100, 110, 85, 60, 60, 30, 32, 23, 9, 2]
            }]
          });
    };

    $(function() {
        initCommandBar();
        initTaskList();
        initProgressBar();
        initBurndown();
    });
}());