console.log("START");

// TODO: Refactor variable conventions to differentiate DOM Objects

function Nav(sel, menu) {

    this.options = {
        animationLength: 200
    };

    this.rootMenu = new Menu("root", menu); 
    this.currentMenu = this.root; 

    this.Container = document.querySelector(sel);

    this.Spans = new Object[3] {
        objectWithClass(
            createDOMObject(this.container,
            "span"), "right"),
        objectWithClass(
            createDOMObject(this.container,
            "span"), "middle"),
        objectWithClass(
            createDOMObject(this.container,
            "span"), "left")
    } 

    this.BackButton = objectWithClass(
                        createDOMObject(this.container,
                        "div"), "hidden");

    this.makeMenu(this.root);
}

// Create menu
Nav.prototype.makeMenu = function(menu, direction) {

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

    this.addClass(this.Spans[0], "transition");
    this.addClass(this.Spans[1], "transition");

    this.swapClass

    // If supermenu exists
    if (this.currentMenu.parentMenu) {
        // Show back button
        this.BackButton.addEventListener("click", this, false);
        this.BackButton.className = "visible";
    } else {
        // Hide back button
        this.BackButton.removeEventListener("click", this, false);
        this.BackButton.className = "hidden";
    }
  
    // swap oldMenu and newMenu 
    var current = this.newMenu;
    this.newMenu = this.oldMenu;
    this.oldMenu = current;

    console.log(this.oldMenu);
    console.log(this.newMenu);

    var nav = this; // scope workaround
    setTimeout(function() {

        nav.newMenu.setAttribute("class", "new");

        while (nav.newMenu.hasChildNodes())
            nav.newMenu.removeChild(nav.newMenu.firstChild); 

    }, this.options.animationLength);
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
        DOMObject.classList.remove(pushClass);
    else if (hasClass(DOMObject, pushClass)) {
        var reg = new RegExp('(\\s|^)' + pushClass + '(\\s|$)');
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
            item = new Menu(name, children, makeMenu);
            item.parentMenu = this;
            this.children.push(item);
        }
    }
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
