console.log('Hello');

// Global Event

(function (document, window, index) {

    var defaults = {
        direction: 0,
        animate: true,
        transition: 500      
    }

    var navBar = function(el, options) {
        var navEl = document.querySelector(el);
        document.querySelector();
    }

    // constructor
    function Nav(navElement, menu) {
        this.nav = navElement;
    };

    Nav.prototype.drawMenu = function(menu) {
        // use menu.contents	
    };

    function Menu(contents) {
        this.contents = [];
    }

    window.onload = function() {
        console.log("hello!");
        var menu = [
            ];
        var nav = navBar("nav", {
            direction: 0,
            menu: [
                {
                    name: 'Collections',
                    contents: [
                        {
                            name: 'Industrial',
                            link: '/'
                        },
                        {
                            name: 'Residential',
                            link: '/'
                        },
                        {
                            name: 'Commercial',
                            link: '/'
                        }
                    ]
                },
                {
                    name: 'Test',
                    action: function() {
                        console.log('action!');
                    }
                },
                {
                    name: 'Press',
                    link: '/'
                }
            ],
            animate: true,
            transition: 284,
            init: function() {
                console.log('init!');
            }
        });
    }
