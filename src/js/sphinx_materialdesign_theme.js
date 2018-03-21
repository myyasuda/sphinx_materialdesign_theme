import "../scss/sphinx_materialdesign_theme.scss";
import "material-design-lite";
import "babel-polyfill";
import ScrollSpy from "./scrollspy";
import AdjustHeight from "./adjust-height";

$(function() {
    $('body').fadeIn(0);
    $('.page-content > blockquote:first-child').remove();
   
    const styleColorTextPrimary = () => {
        $('h1, h2, h3, h4, h5, h6, .toc-backref, .contents, .toctree-wrapper, .contents a, .toctree-wrapper a').addClass('mdl-color-text--primary');
    }

    function collapse() {
        $('.mdl-layout__drawer nav .nav-toggle a').click(function() {
            const $toggle = $(this);
            const id = $toggle.attr('data-toggle');
            $(`ul${id}`).toggleClass('show').animate({height: "toggle", opacity: "toggle"});
            $toggle.parent().toggleClass('show');
        });
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

    styleMdlCodeBlock();
    styleColorTextPrimary();
    collapse();
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
