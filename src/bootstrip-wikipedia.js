function replaceDeprecated() {
    // Replace deprecated tags with modern style equivalents.
    // Relies on custom css file.
    $('center').replaceWith('<span class="centered"></span>');
}

function cleanBasic() {
    // Delete empty tags
    $('div:empty, p:empty, ol:empty, ul:empty, table:empty').remove();

    // Try to clean/remove elements that may be common enough to exist
    $('.related-links-container, .related-links, #comments, .bottom-share-module, .bottom-share').remove();

    // Remove old deprecated tags
    $('font').children().unwrap();

    // Remove empty html tags
    $('font:empty, div:empty, p:empty, li:empty, ol:empty').remove();

    // Remove some common ids
    $.each([
        '#footer', '#header', '#content', '#main-content', '#nav',
        '#navigation', '#masthead', '#ad', '#ads', '#google-ads',
        '#googleads'
    ], removeID);
}

function removeID(k, id) {
    $(id).attr('id', '');
}

function removeClass(k, klass) {
    $(klass).removeClass(klass);
}

function removeAttributeFromTag(tag, attr) {
    $(tag).attr(attr, '');
}

function removeAttributesFromTag(tag, attrs) {
    $.each(attrs, function(k, attr){
        removeAttributeFromTag(tag, attr);
    });
}

function removeAttribute(k, attr) {
    $('[' + attr + ']').attr(attr, '');
}

// ==UserScript==
// @name         bootstrIp wikipedia
// @description  Strip down the look and html for Wikipedia, and add Bootstrap 3 styling/conventions. Also adds some basic styling and nice looking fonts from Google.
// @namespace    bootstripWikipedia
// @version      0.1
// @match        https://en.wikipedia.org/*
// @author       Chris Tabor <dxdstudio@gmail.com>
// @support      https://github.com/christabor/tampermonkey/issues
// @homepage     https://github.com/christabor/tampermonkey/
// @run-at       document-end
// @require      http://code.jquery.com/jquery-latest.js
// @resource     bootcss https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css
// @resource     gfonts https://fonts.googleapis.com/css?family=Oswald:400,300,700|Open+Sans:400,300italic,400italic,700,700italic

// ==/UserScript==

var bootcss = GM_getResourceText('bootcss');
var gfonts = GM_getResourceText('gfonts');

var temp = $('#content').html();
var search = $('#searchform');

search = search.html();

GM_addStyle(bootcss);
GM_addStyle(gfonts);

var other_styles = [
    "body {padding:1em 0; background-color:#f1f1f1;}",
    // ".container {background-color:#fff; box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);}",
    "h1 {font-size: 40px; font-weight: 100;border:none;}",
    "h2 {font-size: 20px; border: none; border-top: 2px solid #fff; padding-top: 0.7em;}",
    "h3 {font-size: 16px; text-transform: uppercase;}",
    "h4 {font-size: 14px;}",
    ".subdued {font-size: 10px; opacity: 0.6;}",
    ".subdued:hover {opacity: 1;}",
    ".centered {text-align:center;}",
    "body, ul, ol, p, .btn {font-family: 'Open Sans', sans-serif;}",
    "ul, ol, dl {font-size: 0.8em;line-height: 1.4em;}",
    "li, dd {margin-bottom: 6px;}",
    "p {line-height: 26px; font-size: 12px;}",
    "h1, h2, h3, h4 {font-family: 'Oswald', sans-serif;}",
    "dt, dd {margin-bottom: 0.4em;}",
    ".table, table {width: auto;}",
    '.alert {padding: 8px;}',
    ".well {border: none; padding: 10px;}",
    ".alert, .table {display: inline-block;}",
    ".well .pull-right {margin: 10px 0 10px 10px;}",
    ".well .pull-left {margin: 10px 10px 10px 0;}",
    "img, video {height: auto; max-width: 100%;}",

    // Wikipedia specific overrides below
    "#toc {margin: 0; width: 100%; border: none;}",
    "#toc .tocnumber, #toc .toctext {font-size: 80%;}",
    "blockquote {border-color: #ccc;}",
    "div.thumbinner, html .thumbimage {border:none;}",
    "#mainsearch input[type=\"submit\"] {margin-left: 4px;}",
    ".container-fluid h1:first-of-type {margin-top: 0;}",
    // ".infobox, #toc {max-width: 20%;min-width: 100px;}",
    "div.reflist ol.references, .refbegin li {font-size: 9px;}",
    ".infobox table, #toc table, table table {width: 100%;max-width:100%;}",
    "table.ombox, table.ambox, table.cmbox {margin: 1em 0;}"
].join('\n');

// Add all customer override styles
GM_addStyle(other_styles);

// Gut the outer elements, keep the main content and search.
$('body').empty().append('<div id="site-sifter" class="container-fluid"><div class="row"><div class="col-md-2" id="left-col"></div><div class="col-md-10" id="main-col">' + temp + '</div></div></div>');
$('#firstHeading').append(search).attr('id', '').attr('class', '');
$('#toc').appendTo('#left-col');

// Initial cleanup
cleanBasic();
replaceDeprecated();

// Add all subdued items
$('#siteSub, .mw-editsection').addClass('subdued');

// Misc cleanup/style changes
$('#toc').addClass('pull-left well').closest('div').addClass('clearfix');
$('.vertical-navbox').addClass('pull-right well').closest('div').addClass('clearfix');
$('.infobox').addClass('well');

$('.mw-editsection').html('edit').addClass('btn btn-xs btn-default');
$('.hatnote').addClass('alert alert-info subdued');
$('table.ombox-notice').addClass('alert');

// Input related stuff
$('#simpleSearch').wrap('<form id="mainsearch" class="pull-right"></form>').attr('id', '');
$('input, textarea, select').addClass('input-sm form-control');

$('form').addClass('form form-inline');
$('button, input[type="submit"]').addClass('btn btn-xs btn-primary');
$('.plainlinks li a').addClass('btn btn-xs btn-default');

// Table stuff
$('table').addClass('table table-striped').removeClass('wikitable');

// Images etc
$('.gallery img, .thumbimage img').addClass('img-thumbnail');

// Convert close button images to character
$('[alt="close"]').replaceWith('&times;');

var toRemove = [
    '#mw-hidden-catlinks',
    '.mw-editsection-bracket',
    '#siteSub', '#mw-navigation', '#jump-to-nav', '#footer'
]
$('#searchInput').unwrap();
$(toRemove.join(' ')).remove();

$('.tright').addClass('pull-right inline-pad');
$('.lright').addClass('left-right inline-pad');

// List styling
$('.hlist').find('ul').addClass('list-inline');

// Add bs3 style labels.
$('.mw-editsection a, .NavToggle').addClass('label label-default').css({
    'font-size': '10px',
    'text-transform': 'uppercase',
    'color': 'white',
    'margin': '1px 4px'
});

// Remove ALL inline css -- use with caution!
$('*').attr('style', '');
