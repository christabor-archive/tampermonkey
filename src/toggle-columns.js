// ==UserScript==
// @name         toggle-columns
// @description  Add event handlers for toggling off any column by clicking. Useful for copy-pasting large tables, or just hiding extraneous content.
// @run-at       document-end
// @require      http://code.jquery.com/jquery-latest.js

// ==/UserScript==

function toggleColumn(e) {
    // Toggle any column on or off.
    var idx = $(this).index();
    console.log(idx);
    $('table').find('tr').each(function(k, row){
        $(row).find('td').eq(idx).remove();
        $(row).find('td').each(function(k, td){
            // Wrap quotes
            $(td).text('{{{' + $(td).text() + '}}}');
        });
    });
    $(this).parent().find('td').eq(idx).slideToggle();
}

// Invalid tables
$('tr').first().on('click', 'td', toggleColumn);
