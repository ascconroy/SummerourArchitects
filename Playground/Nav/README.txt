TODO:

NavStream should initialize using just the DOM contents of <nav>, making the
user create the menu using ul and li tags. <ul> means Menu instance, Li means
Action or Link or both depending on whether it has an href or an onclick
attribute.

Provide a function hook for when a link is clicked. Include this in the onclick
attribute.

Implement an optional options argument for the initial NavStream call. Takes an
object {
    animationLength: (milliseconds, used to set the style.transitionLength of the
    spans and the back button,
    init: function()
}

Place 'use strict' at the top of all of your scripts

Make it so the script can load in the head of the page, not at the bottom.
Include a wait for window load with compatibility for all browsers
