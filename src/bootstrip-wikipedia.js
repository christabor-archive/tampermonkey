// ==UserScript==
// @name         bootstrIp wikipedia
// @description  Strip down the look and html for Wikipedia, and add Bootstrap 3 styling/conventions. Also adds some basic styling and nice looking fonts from Google.
// @namespace    bootstripWikipedia
// @version      0.1
// @match        https://en.wikipedia.org/*
// @author       Chris Tabor <dxdstudio@gmail.com>
// @support      https://github.com/christabor/tampermonkey/issues
// @homepage     https://github.com/christabor/tampermonkey/
// @run-at       document-start

// @require      http://code.jquery.com/jquery-latest.js
// @resource     bootcss https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css
// @resource     gfonts https://fonts.googleapis.com/css?family=Oswald:400,300,700|Open+Sans:400,300italic,400italic,700,700italic

// ==/UserScript==

$('body').hide();

var bootcss = GM_getResourceText('bootcss');
var gfonts = GM_getResourceText('gfonts');

var temp = $('#content').html();
var search = $('#searchform');

search = search.html();

GM_addStyle(bootcss);
GM_addStyle(gfonts);

var other_styles = [
    "h1 {font-size: 40px}",
    "h2 {font-size: 20px}",
    "h3 {font-size: 14px; text-transform: uppercase;}",
    "h4 {font-size: 12px}",
    "#site-sifter p {font-size: 11px; line-height: 24px;}",
    ".subdued {font-size: 10px; opacity: 0.6;}",
    "body, ul, ol, p, .btn {font-family: 'Open Sans', sans-serif;}",
    "h1, h2, h3, h4 {font-family: 'Oswald', sans-serif;}",
    ".alert, .table {display: inline-block;}",

    // Wikipedia specific overrides below
    "#toc {margin: 10px 10px 10px 0;}"
].join('\n');

// Add all customer override styles
GM_addStyle(other_styles);

$('body').empty().append('<div id="site-sifter" class="container"><div class="row"><div class="col-md-12">' + temp + '</div></div></div>');
$('#firstHeading').append(search);

// Add all subdued items
$('#siteSub, .mw-editsection').addClass('subdued');

// Misc cleanup/style changes
$('#toc').addClass('pull-left');
$('.mw-editsection').html('edit').addClass('btn btn-xs btn-default');
$('.hatnote').addClass('alert alert-info subdued');
$('table.ombox-notice').addClass('alert');

// Input related stuff
$('#simpleSearch').wrap('<form id="mainsearch" class="pull-right"></form>').attr('id', '');
$('input, textarea, select').addClass('input-sm form-control');

$('form').addClass('form form-inline');

// Table stuff
$('table').addClass('table');

// Images etc
$('.gallery img').addClass('img-thumbnail');

$('body').show();
