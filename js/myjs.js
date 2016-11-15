var valueSelect;
var lastIndexLS;
var arrSelect = [];

$(".reaction-1").css("display", "none");
$(".reaction-2").css("display", "none");

/*-----Функция очистки localStorage и списка задач---*/

$("#clean").on('click', function () {
    localStorage.clear();
    $("#list-todo").html("");
});

/*--------- Создаем Select option ---------*/

function createSelectTop() {
    var option;
    arrSelect = [{key: 'select', text: 'Выберите преоритет :'},
        {key: 'import', text: ' Важно'},
        {key: 'normal', text: ' Нормально'},
        {key: 'notImp', text: ' Маловажно'}
    ];

    for (var i = 0; i < arrSelect.length; i++) {
        option = $('<option value = ' + arrSelect[i].key + '>' + arrSelect[i].text + ' </option>');
        $("#priorities").append(option);
    }
    //Ограничение выбора 1-го ел. Selct
    $("#priorities option[value='select']").attr("disabled", "disabled");
}
createSelectTop();

/*------------- Проверка значений---------------*/

$("#button").on('click', function get() {
    var value = $("#field").val();
    var selectIndex = $("#priorities")[0].selectedIndex;
    valueSelect = arrSelect[selectIndex].text;
    inspection(value, selectIndex);

    if (value !== "" && selectIndex > 0) {
        recortTask(value);
    }

    field.value = "";
});

/*----Проверка ввода данных -----*/

function inspection(myValue, myIndex) {

    if (myValue == "") {
        $("#field").addClass("border");
        $(".reaction-1").css("display", "block");
    }

    if (myIndex == 0) {
        $("#priorities").addClass("border");
        $(".reaction-2").css("display", "block");
    }
}

/*------Повторный ввод значения в поле------*/

$("#field").click(function () {
    $(".reaction-1").css("display", "none");
    $("#field").removeClass("border");
});

$("#priorities").click(function () {
    $(".reaction-2").css("display", "none");
    $("#priorities").removeClass("border");
});

/*------Запись ключей------*/

function recortTask(value) {
    //Получаем ключи
    var valueKey;
    var cellId;
    var nextLastIndexLS;
    valueKey = localStorage.getItem("cell_1");

    if (valueKey === null) {
        localStorage.setItem("lastIndex", 1);
        cellId = "cell_" + 1;
        getKeyOption(valueSelect, 1);
    } else {
        lastIndexLS = +localStorage.getItem("lastIndex", lastIndexLS) + 1;
        getKeyOption(valueSelect, lastIndexLS);
        cellId = "cell_" + lastIndexLS;
        localStorage.setItem("lastIndex", lastIndexLS);
        cellId = "cell_" + lastIndexLS;
    }

    recordLSTask(cellId, value);
    showTask(cellId, value);
    showPriority(valueSelect);
}

/*----------- (1) Визулизация ЗАДАЧУ -------------*/

function showTask(id, value) {
    var listToDo = $("#list-todo");
    var elem;
    var num = +localStorage.getItem("lastIndex", lastIndexLS);
    elem = $("<li id = " + id + " class = cell-task>" + " Задача : " + value + "</li>");
    $(elem).appendTo(listToDo);
}

/*------(3-getItem )Визуализирую  ЗАДАЧУ ------*/

function showGLTask() {
    var numberIndex = localStorage.getItem("lastIndex");

    for (var i = 1; i <= numberIndex; i++) {
        showTask("cell_" + i, localStorage.getItem("cell_" + i));
        showPriority(localStorage.getItem("priority_" + i));
    }
}
showGLTask();

/*------(2)Визуализирую  ПРИОРИТЕТ ------*/

function showPriority(value) {
    $(".cell-task").last().append('<span class = "priority">' + "Приоритет :" + value + " ." + '</span>');
    createSelect();
}

/*---Записываем в localStorage-ЗАДАЧУ----*/

function recordLSTask(key, value) {
     localStorage.setItem(key, value);
}

/*----Получем значение option по Index-----*/

function getKeyOption(value, num) {
    var keySelect = "priority_" + num;
    recordLSPriority(keySelect, value);
}

/*----Записіваем в localStorage - ПРИОРИТЕТ----*/

function recordLSPriority(key, value) {
    localStorage.setItem(key, value);
}

/*--1 - Вставляю Select после последнего єл с классом 'priority' Генерирую Select после последнего эл с классом "select-task"---*/

function createSelect() {
    var priority = $(".priority");
    var lastPriority = priority.length - 1;
    var elem = $('<select class="select-task" id="prior_' + lastPriority + '"' + 'onChange = "nextRecord(prior_' + lastPriority + ',' + lastPriority + '  )"></select>');
    $(priority[lastPriority]).after(elem);
    putOption();
}

/*-------------- (1)Генерирую  Option---------------*/

function putOption() {
    for (var e = 0; e < arrSelect.length; e++) {
        $(".select-task").last().append('<option value = ' + arrSelect[e].key + e + '>' + arrSelect[e].text + ' </option>');
    }
}

/*-------- 2 - Генерирую Select при перезагрузке-----*/

function createSelect2() {
    var select;
    var priority = $(".priority");
    for (var i = 0; i < localStorage.length; i++) {
        select = $('<select class="select-task" id = "prior_' + i + '"' + ' onChange = "nextRecord(prior_' + i + ',' + i + ')"></select>');
        $(priority[i]).after(select);
    }
    putOption2();
}

/*-------------- (2 get)Генерирую  Option---------------*/

function putOption2() {
    for (var e = 0; e < arrSelect.length; e++) {
        $(".select-task").append('<option value = ' + arrSelect[e].key + '>' + arrSelect[e].text + ' </option>');
    }
    $(".select-task option[value='select']").attr("disabled", "disabled");
}

/*------------  Изменение ПРИОРИТЕТА ---------------*/

function nextRecord(id, i) {
    var newValue = $(id).val();

    //Получаем index
    for (var t = 0; t < arrSelect.length; t++) {
        var newValueUs = newValue.slice(0, 6);
        if (arrSelect[t].key == newValueUs) {
            var nawIndex = t;
        }
    }

    var nawValuePriority = arrSelect[nawIndex].text;
    var priority = $(".priority");
    var num = i + 1;
    var keySelect = "priority_" + num;

    recordLSPriority(keySelect, nawValuePriority);
    showGLPriority2(id, keySelect, priority[i]);
}

/*------Визуализация нового ПРИОРИТЕТА -------- */

function showGLPriority2(id, key, dell) {
    debugger;
    $(dell).html("Приоритет :" + localStorage.getItem(key));
}