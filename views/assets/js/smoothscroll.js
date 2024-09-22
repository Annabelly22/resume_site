// Check if jQuery is loaded
window.jQuery || alert("The jQuery library must be included before the smoothscroll.js file. The plugin will not work properly.");

// SmoothScroll function
(function($) {
    var $scrollTo = $.scrollTo = function(target, duration, settings) {
        $(window).scrollTo(target, duration, settings);
    };

    function getCoordinates(val) {
        return typeof val === "object" ? val : { top: val, left: val };
    }

    // Default settings
    $scrollTo.defaults = {
        axis: "xy",
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };

    $scrollTo.window = function() {
        return $(window)._scrollable();
    };

    // Define scrollable elements
    $.fn._scrollable = function() {
        return this.map(function() {
            var elem = this;
            if (!elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) === -1) return elem;
            var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
            return /webkit/i.test(navigator.userAgent) || doc.compatMode === "BackCompat" ? doc.body : doc.documentElement;
        });
    };

    // ScrollTo function
    $.fn.scrollTo = function(target, duration, settings) {
        if (typeof duration === "object") {
            settings = duration;
            duration = 0;
        }
        if (typeof settings === "function") {
            settings = { onAfter: settings };
        }
        if (target === "max") target = 9
