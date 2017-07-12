console.log("Hey");

function Nav(sel, menu) {
    this.el = document.querySelector(sel);

    // Construct tree of NavItems

    this.root; // Stores the root Menu instance
    this.current; // Stores the current Menu instance
    this.back = document.createElement('div');
}

// @param Menu menu
Nav.prototype.makeMenu(menu) {
    for (var i = 0; i < menu.length; i++) {
        var item = menu[i];
        var name = item.name;

        var link;
        if (link = item.link)
            item = new Link(name, link); 

        var action;
        if (action = item.action)
            item = new Action(name, action);

        var menu;
        if (menu = item.menu)
            item = new Menu(name, menu);
    }
   
    // Remove old elements from DOM tree 
    for (var i = 0; i < this.current.children.length; i++) 
        this.current.children[i].removeEl();

    // Set back button to make container menu
    this.back.addEventListener('click', function() { 
        this.makeMenu(menu.container);
    }, false);

    // Point current to a new menu
    this.current = menu; 
    
    // set back button to makeMenu(menu.container)
    // append(new NavItem) for each in menu.children (constructor returns DOM Object)
    // remove each old NavItem.el for each in Nav.current
}

function NavItem(name) {
    this.el = document.createElement('div');
    this.el.innerHTML = name;

    // Tester
    this.el.addEventListener("click", function(event) {
        console.log('clicked!'); 
    }, false);
}

// See: https://stackoverflow.com/questions/3785258/how-to-remove-dom-elements-without-memory-leaks
// DOM keeps all nodes, best practice is to reuse them

NavItem.prototype.getEl = function() {
    return this.el;
}

NavItem.prototype.removeEl = function() {
    this.el.remove();
}

NavItem.prototype.setEl = function(el) {
    this.el.remove();
    this.el = el; 
}

NavItem.prototype.setIcon = function(src) {
    // remove text and replace with icon
    // TODO: CSS
}


// Menu is NavItem
function Menu(name, menu) {
    NavItem.call(this, name);

    this.children = []; // Array of NavItem
    this.container; // Menu
}
Menu.prototype = new NavItem();

// Link is NavItem
function Link(name, href) {
    NavItem.call(this, name);

    this.el.href = href;
}
Link.prototype = new NavItem();

// Action is NavItem
function Action(name, action) {
    NavItem.call(this, name);

    this.el.addEventListener("click", action, false);
}
Action.prototype = new NavItem();


window.onload = function() {
    var menu = [
        {
            name: 'Collections',
            menu: [
                {
                    name: 'Industrial',
                    href: '/'
                },
                {
                    name: 'Residential',
                    href: '/'
                },
                {
                    name: 'Commercial',
                    href: '/'
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
            href: '/'
        }
    ];
    var nav = new Nav("nav", menu);
}
