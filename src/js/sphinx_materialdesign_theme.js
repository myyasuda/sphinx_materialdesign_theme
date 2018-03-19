import "../scss/sphinx_materialdesign_theme.scss";
import "material-design-lite";
import "babel-polyfill";
import ScrollSpy from "./scrollspy";
import AdjustHeight from "./adjust-height";

$(function() {
    $('body').fadeIn(0);
    $('.page-content > blockquote:first-child').remove();

    $('input[type="submit"]').addClass('mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent');
    
    const styleColorTextPrimary = () => {
        $('h1, h2, h3, h4, h5, h6, .toc-backref, .contents, .toctree-wrapper, .contents a, .toctree-wrapper a, .mdl-layout__drawer nav a.current').addClass('mdl-color-text--primary');
    }

    styleMdlDownloadLink();
    styleMdlCodeBlock();
    styleColorTextPrimary();
    styleDrawer();
    quickSearchClickEvent();

    const spy = new ScrollSpy({
        contentSelector: '.page-content .section',
        navSelector: '.localtoc a',
        scrollSelector: 'main' ,
        className: 'current',
        offsetTop: 64});

    const adjust = new AdjustHeight();

    $('.mdl-layout__content').focus();
});

function styleDrawer() {
    $('.mdl-layout__drawer nav li:has(ul)').addClass('has-children').children('a').each(function (index) {
        const $a = $(this);
        $a.addClass('has-children')
            .parent()
            .before($('<div class="nav-toggle"><a class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">keyboard_arrow_down</i></a></div>').click(function() {
                const $toggle = $(this);
                $(`ul#globalnav-${index}`).animate({ height: 'toggle', opacity: 'toggle'});
                $toggle.toggleClass('is-open');
            }))
            .children('ul').attr('id', `globalnav-${index}`);
    });
    $('.mdl-layout__drawer nav ul.current').addClass('is-open').parent().prev().addClass('is-open');
}

function styleMdlDownloadLink() {
   $('a.download').prepend('<i class="material-icons">file_download</i>');
}

function styleMdlCodeBlock() {
    $('pre').hover(function() {
        $(this).attr('click-to-copy', 'click to copy...');
    });
    $('pre').click(function(){
        var result = copyClipboard(this);
        if (result) {
            $(this).attr('click-to-copy', 'copied!');
        }
    });
}

function copyClipboard(selector) {
    var body = document.body;
	if(!body) return false;

    var $target = $(selector);
    if ($target.length === 0) { return false; }

    var text = $target.text();
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    var result = document.execCommand('copy');
    document.body.removeChild(textarea);
    return result;
}

function quickSearchClickEvent() {
    const $breadcrumb = $('.breadcrumb');

    $('#waterfall-exp').focus(() => {
        if ($(window).width() <= 1024) {
            $breadcrumb.hide(); 
        }
    }).blur(() => {
        if ($(window).width() <= 1024) {
            $breadcrumb.show(); 
        }
    });
}