// ==UserScript==
// @name         table-to-json-button
// @description  Uses https://github.com/lightswitch05/table-to-json to export all table data on a page, by the click of a button.
// @version      0.1
// @author       Chris Tabor <dxdstudio@gmail.com>
// @support      https://github.com/christabor/tampermonkey/issues
// @homepage     https://github.com/christabor/tampermonkey/
// @run-at       document-end
// @version      0.1
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://raw.githubusercontent.com/lightswitch05/table-to-json/master/lib/jquery.tabletojson.min.js
// ==/UserScript==

$('body').prepend('<a id="table2json" style="font-size:10px;font-family:arial, sans-serif;position:fixed;z-index:99999;top: 10px;left:10px;background-color:#444;color:#fff;padding:4px;margin:2px;" href="javascript:;">ALL table data to JSON</a>');
$('body').find('#table2json').on('click', exportTableData);

function exportTableData(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var tables = [];
    $('table').each(function(k, table){
        var data = $(table).tableToJSON();
        tables.push(data);
    });
    newWindow(tables);
}

function newWindow(data) {
    data = JSON.stringify(data);
    var w = window.open();
    $(w.document.body).html(data);
}
