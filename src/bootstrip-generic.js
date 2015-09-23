// ==UserScript==
// @name         clean-misc-pages
// @description  Add custom cleanup/styling for any website in the list, and strips down the look and html for each site, also adding Bootstrap 3 styling/conventions. Also adds some basic styling and nice looking fonts from Google.
// @run-at       document-end
// @require      http://code.jquery.com/jquery-latest.js
// @resource     bootcss https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css
// @resource     gfonts https://fonts.googleapis.com/css?family=Oswald:400,300,700|Open+Sans:400,300italic,400italic,700,700italic

// ==/UserScript==

function isInDomains() {
    var acceptable_domains = [
        'www.zerohedge.com',
        'www.reddit.com'
    ];
    var in_domains = false;
    $.each(acceptable_domains, function(k, domain){
        if(window.location.hostname == domain) {
            in_domains = true;
            return false;
        }
    });
    return in_domains;
}

function bootstrapify(opts) {
    var table_types = {
        basic: 'table',
        involved: 'table table-striped',
        complex: 'table table-striped table-bordered',
    }

    function styleForms() {
        $('button, input[type="submit"]').addClass('btn btn-md btn-primary');
        $('input, select, textarea').addClass('form-control input-md');
        $('form').addClass('form form-inline');
    }

    function styleContainer() {
        // Add bootstrap container classes
        $('body').wrapInner('<div class="container-fluid"><div class="row"><div class="col-md-12"></div></div></div>');
        // Custom wrapper width
        if(opts.width_mode) {
            $('body').addClass(opts.width_mode + '-mode');
        }
    }

    function normalizeNav() {
        // Normalize to bootstrap nav, if possible.
        $('nav, header, footer, [role="navigation"]').find('ul')
        .addClass('nav navbar-nav navbar-default');
    }

    if(opts.nav) normalizeNav();
    if(opts.wrap) styleContainer();
    if(opts.style_forms) styleForms();
    if(opts.style_tables) $('table').addClass(opts.table_classes ? opts.table_classes : table_types.basic);
    if(opts.style_images) $('figcaption, img').addClass('img-thumbnail');
}

function stripAllStyles() {
    $('head, body').find('link, style').remove();
}

if(isInDomains()) {

    var other_styles = [
        "body {padding: 2em;}",
        "h1 {font-size: 40px; font-weight: 100;border:none;}",
        "h2 {font-size: 20px; border: none; border-top: 2px solid #fff; padding-top: 0.7em;}",
        "h3 {font-size: 16px; text-transform: uppercase;}",
        "h4 {font-size: 14px;}",
        "body, ul, ol, p, .btn {font-family: 'Open Sans', sans-serif;}",
        "ul, ol, dl, p {line-height: 32px; font-size: 18px;}",
        "h1, h2, h3, h4 {font-family: 'Oswald', sans-serif;}",
    ].join('\n');

    // Add all customer override styles
    GM_addStyle(other_styles);

    // ONE OFF CUSTOMIZED WEBPAGES ---------------------------------------------
    if(window.location.hostname == 'www.zerohedge.com') {
        $('#header, #sidebar-left, #sidebar-right, #section1, br').remove();
        // Remove ALL IDs.
        $('[id]').attr('id', '');
        $('body').app
    }
    else if(window.location.hostname == 'www.reddit.com') {
        // Start from scratch - Reddit is a mess.
        // stripAllStyles();

        $('iframe, .promoted, .promotedlink, .footer-parent, .debuginfo, .header-img').remove();
        var reddit_styles = [
            "body {padding: 0;}",
            "h1 {font-size: 20px; font-weight: 100;border:none;}",
            "h2 {font-size: 18px; border: none; border-top: 2px solid #fff; padding-top: 0.7em;}",
            "h3 {font-size: 16px; text-transform: uppercase;}",
            "h4 {font-size: 14px;}",
            "body, ul, ol, p, .btn {font-family: 'Open Sans', sans-serif;}",
            "ul, ol, dl, p, .link .title {line-height: 14px; font-size: 9px !important;}",
            "h1, h2, h3, h4 {font-family: 'Oswald', sans-serif;}",
            ".content {margin: 7px 5px 0px 115px;}",
            ".side { width: 160px !important; margin: 0;}",
            ".listing-page .content {margin: 4em 0 0 0;}"
        ].join('\n');
        // Add all customer override styles
        GM_addStyle(reddit_styles);
    }

    console.info('Cleaning domain: ' + window.location.hostname);
    var bootcss = GM_getResourceText('bootcss');
    var gfonts = GM_getResourceText('gfonts');

    GM_addStyle(bootcss);
    GM_addStyle(gfonts);

    bootstrapify({
        nav: false,
        wrap: true,
        style_tables: true,
        style_images: true,
        style_forms: true
    });
}
