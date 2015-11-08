// ==UserScript==
// @name         wikilist2json
// @description  Convert wikipedia lists to json, using the h2 and uls provided on most articles.
// @version      0.1
// @author       Chris Tabor <dxdstudio@gmail.com>
// @support      https://github.com/christabor/tampermonkey/issues
// @homepage     https://github.com/christabor/tampermonkey/
// @run-at       document-end
// @version      0.1
// @require      http://code.jquery.com/jquery-latest.js
// @match        https://en.wikipedia.org/*
// ==/UserScript==

if($('ul').length > 0) {
    $('body').prepend('<a id="ul2json" style="font-size:10px;font-family:arial, sans-serif;position:fixed;z-index:99999;top: 10px;left:10px;background-color:#444;color:#fff;padding:4px;margin:2px;" href="javascript:;">ALL UL data to JSON</a>');
    $('body').find('#ul2json').on('click', exportULData);
}

function exportULData(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var lists = [];

    $('#mw-content-text h2').each(function(k, h2){
        var heading = $(h2).text().trim();
        // Get the next list only
        var _data = $(h2).next('ul').eq(0).find('li');
        var data = {};
        if(_data) {
            _data.each(function(k, li){
                var res = $(li).text().split(' – ');
                data[res[0]] = res[1];
            });
            lists.push(data);
        }
    });
    newWindow(lists);
}

function newWindow(data) {
    data = JSON.stringify(data);
    var w = window.open();
    $(w.document.body).html(data);
}
