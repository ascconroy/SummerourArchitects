console.log("START");

// TODO: Refactor variable conventions to differentiate DOM Objects

function Nav(sel, menu) {

    this.options = {
        animationLength: 200
    };

    this.rootMenu = new Menu("root", menu); 
    this.currentMenu = this.rootMenu; 

    this.Container = document.querySelector(sel);

    this.Spans = [
        this.objectWithClass(
            this.createDOMObject(this.Container,
            "span"), "right"),
        this.objectWithClass(
            this.createDOMObject(this.Container,
            "span"), "middle"),
        this.objectWithClass(
            this.createDOMObject(this.Container,
            "span"), "left")
    ];

    this.BackButton = this.objectWithClass(
            this.createDOMObject(this.Container,
            "div"), "hidden");

    console.log(this.rootMenu);
    this.makeMenu(this.rootMenu, 1);
}

// Create menu
Nav.prototype.makeMenu = function(menu, deeper) {

    // direction:
    // 1 means deeper (in from right)
    // 0 means shallower (in from left)

    // Redirect menu pointer
    this.currentMenu = menu;

    // Create new menu items
    for (var i = 0; i < this.currentMenu.children.length; i++) {
        var child = this.currentMenu.children[i];

        // Child Menu eevent handler
        if (child.children) {
            child.nav = this;
            child.DOMObject.addEventListener("click", child, false);
        }

        this.Spans[0].append(child.DOMObject);
    }

    var width = this.Spans[0].getBoundingClientRect().width;
    this.Container.style.width = width+"px";
       
    // Menu transition

    if (deeper) { 
        // Transition RIGHT & MIDDLE
        this.addClass(this.Spans[0], "transition");
        this.addClass(this.Spans[1], "transition");

        // RIGHT -> MIDDLE (Transition)
        this.removeClass(this.Spans[0], "right");
        this.addClass(this.Spans[0], "middle");

        // MIDDLE -> LEFT (Transition)
        this.removeClass(this.Spans[1], "middle");
        this.addClass(this.Spans[1], "left");

        // LEFT -> RIGHT
        this.removeClass(this.Spans[2], "left");
        this.addClass(this.Spans[2], "right"); 

    } else {

        // Transition MIDDLE & LEFT
        this.removeClass(this.Spans[1], "transition");
        this.removeClass(this.Spans[2], "transition");

        // RIGHT -> MIDDLE (Transition)
        this.removeClass(this.Spans[0], "right");
        this.addClass(this.Spans[0], "middle");

        // MIDDLE -> LEFT (Transition)
        this.removeClass(this.Spans[1], "middle");
        this.addClass(this.Spans[1], "left");

        // LEFT -> RIGHT
        this.removeClass(this.Spans[2], "left");
        this.addClass(this.Spans[2], "right");  
    }

    // Clear right span
    while (this.Spans[2].hasChildNodes())
        this.Spans[2].removeChild(this.Spans[2].firstChild); 

    // Make Back Button
    if (this.currentMenu.parentMenu) {
        // Show back button
        this.BackButton.addEventListener("click", this, false);
        this.BackButton.className = "visible";
    } else {
        // Hide back button
        this.BackButton.removeEventListener("click", this, false);
        this.BackButton.className = "hidden";
    }

    var SpanMiddle = this.Spans[0];
    var SpanLeft   = this.Spans[1];
    var SpanRight  = this.Spans[2];

    this.Spans[0] = SpanRight;
    this.Spans[1] = SpanMiddle;
    this.Spans[2] = SpanLeft;
}

Nav.prototype.createDOMObject = function(Container, tag) {
    var DOMObject = document.createElement(tag);
    Container.append(DOMObject);
    return DOMObject;
}

Nav.prototype.objectWithClass = function(DOMObject, className) {
    DOMObject.className = className;
    return DOMObject;
}

Nav.prototype.addClass = function(DOMObject, pushClass) {
    if (DOMObject.classList)
        DOMObject.classList.add(pushClass);
    else if (!hasClass(DOMObject, pushClass)) DOMObject.className += " " + pushClass;
}

Nav.prototype.removeClass = function(DOMObject, popClass) {
    if (DOMObject.classList)
        DOMObject.classList.remove(popClass);
    else if (hasClass(DOMObject, popClass)) {
        var reg = new RegExp('(\\s|^)' + popClass + '(\\s|$)');
        DOMObject.className=DOMObject.className.replace(reg, ' ');
    }
}

Nav.prototype.hasClass = function(DOMObject, queryClass) {
    if (DOMObject.classList)
        return DOMObject.classList.contains(pushClass);
    else
        return !!DOMObject.className.match(new RegExp('(\\s|^)' + pushClass + '(\\s|$)'));
}

// Click event handler for back button
Nav.prototype.handleEvent = function(e) {
    this.makeMenu(this.currentMenu.parentMenu, 0);
}


Menu.prototype = new NavItem();
function Menu(name, menu) {
    NavItem.call(this, name);

    // new Link("INVALID MENU", "")

    this.children = []; // Array of NavItem
    this.parentMenu = null;

    for (var i = 0; i < menu.length; i++) {

        var item = menu[i];
        name = item.name;

        var href;
        var action;
        var children;

        if (href = item.href)
            this.children.push(new Link(name, href)); 
    
        if (action = item.action)
            this.children.push(new Action(name, action));
    
        if (children = item.children) {
            item = new Menu(name, children);
            item.parentMenu = this;
            this.children.push(item);
        }
    }

    console.log('Menu Constructor:');
    console.log(this.children);
}

Menu.prototype.handleEvent = function(e) {
    this.nav.makeMenu(this, 1);
}

function NavItem(name) {
    this.tag = 'a';
    this.name = name;

    this.DOMObject = document.createElement(this.tag);
    this.DOMObject.innerHTML = name;
}

NavItem.prototype.setIcon = function(src) {
    this.DOMObject.innerHTML = "";
}


Link.prototype = new NavItem();
function Link(name, href) {
    NavItem.call(this, name);
    this.DOMObject.href = href;
}

Action.prototype = new NavItem();
function Action(name, action) {
    NavItem.call(this, name);

    this.DOMObject.addEventListener("click", action, false);
}

window.onload = function() {
    var menu = [
        {
            name: 'Collections',
            children: [
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
            children: [
                {
                    name: 'One',
                    children: [
                        {
                            name: 'These',
                            href: '/'
                        },
                        {
                            name: 'Are',
                            href: '/'
                        },
                        {
                            name: 'All',
                            href: '/'
                        },
                        {
                            name: 'More Options',
                            children: [
                                {
                                    name: 'Third Level',
                                    href: '/'
                                },
                                {
                                    name: 'Wow so deep',
                                    href: '/'
                                },
                                {
                                    name: 'Very OOP!',
                                    href: '/'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Two',
                    children: [
                        {
                            name: 'Please',
                            href: '/'
                        },
                        {
                            name: 'Help',
                            href: '/'
                        },
                        {
                            name: 'Me Pleaes',
                            href: '/'
                        }
                    ]
                },
                {
                    name: 'Three',
                    children: [
                        {
                            name: 'Wow',
                            href: '/'
                        },
                        {
                            name: 'Huge',
                            href: '/'
                        },
                        {
                            name: 'Menu',
                            href: '/'
                        }
                    ]
                },
            ]
        },
        {
            name: 'Press',
            href: '/'
        }
    ];
    var nav = new Nav("nav", menu);
}
