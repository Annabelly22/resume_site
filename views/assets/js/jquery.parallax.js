!function($) {
    var $window = $(window),
        windowHeight = $window.height();

    // Adjust the height on window resize
    $window.resize(function() {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xPos, speedFactor, outerHeight) {
        var $this = $(this),
            firstTop,
            getHeight;

        // Function to calculate element position and dimensions
        function update() {
            $this.each(function() {
                firstTop = $this.offset().top;
            });
        }

        // Choose the appropriate function for height calculation
        getHeight = outerHeight ? function(jqo) {
            return jqo.outerHeight(true);
        } : function(jqo) {
            return jqo.height();
        };

        // Set default values for xPos, speedFactor, and outerHeight
        if (arguments.length < 1 || xPos === null) xPos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.5;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        var scrollTop = $window.scrollTop();

        // The actual function that sets the background position
        function updatePosition() {
            $this.each(function() {
                var $element = $(this),
                    top = $element.offset().top;

                // Only update if the element is in the viewport
                if (top + getHeight($element) < scrollTop || scrollTop + windowHeight < top) {
                    return;
                }

                // Apply the parallax effect
                $this.css("backgroundPosition", xPos + " " + Math.round((firstTop - scrollTop) * speedFactor) + "px");
            });
        }

        // Bind the updatePosition function to scroll and resize events
        $window.bind("scroll", updatePosition).resize(updatePosition);

        // Initial call to set the background position
        update();
        updatePosition();
    };
}(jQuery);
