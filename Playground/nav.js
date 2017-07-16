function Nav(sel, menu) {

    this.rootMenu = new Menu("root", menu); 
    this.currentMenu = this.rootMenu; 

    this.Container = document.querySelector(sel);

    this.Spans = [
        this.objectWithClass(
            this.createDOMObject(this.Container,
            "span"), "left"),
        this.objectWithClass(
            this.createDOMObject(this.Container,
            "span"), "middle"),
        this.objectWithClass(
            this.createDOMObject(this.Container,
            "span"), "right")
    ];

    this.BackButton = this.objectWithClass(
            this.createDOMObject(this.Container,
            "div"), "hidden");

    this.makeMenu(this.rootMenu, 1);
}

// Create menu
Nav.prototype.makeMenu = function(newMenu, deeper) {

    // Before:
    // Spans[0] -> PARENT MENU (LEFT)
    // Spans[1] -> CURRENT MENU (MIDDLE)
    // Spans[2] -> BLANK (NEW MENU) (RIGHT) 

	var width;

    if (deeper) {
        this.removeClass(this.Spans[0], "transition");
        this.addClass(this.Spans[1], "transition");
        this.addClass(this.Spans[2], "transition");

        this.clearMenu(this.Spans[2]);
        this.fillMenu(this.Spans[2], newMenu);
		
		width = this.Spans[2].getBoundingClientRect().width;

        this.swapClass(this.Spans[0], "left", "right");
        this.swapClass(this.Spans[1], "middle", "left");
        this.swapClass(this.Spans[2], "right", "middle");

        var temp = this.Spans[1];
        this.Spans[1] = this.Spans[2]; 
        this.Spans[2] = this.Spans[0];
        this.Spans[0] = temp; 

    } else {

        this.addClass(this.Spans[0], "transition");
        this.addClass(this.Spans[1], "transition");
        this.removeClass(this.Spans[2], "transition");

        if (newMenu.parentMenu)
            this.fillMenu(this.Spans[2], newMenu.parentMenu);

		width = this.Spans[0].getBoundingClientRect().width;

        this.swapClass(this.Spans[0], "left", "middle");
        this.swapClass(this.Spans[1], "middle", "right");
        this.swapClass(this.Spans[2], "right", "left");
       
        var temp = this.Spans[1];
        this.Spans[1] = this.Spans[0];
        this.Spans[0] = this.Spans[2];
        this.Spans[2] = temp; 
    }

    var width = 
    this.Container.style.width = width+"px";

    // Make Back Button
    if (newMenu.parentMenu) {
        // Show back button
        this.BackButton.addEventListener("click", this, false);
        this.removeClass(this.BackButton, "hidden");
    } else {
        // Hide back button
        this.BackButton.removeEventListener("click", this, false);
        this.addClass(this.BackButton, "hidden");
    }

    this.currentMenu = newMenu;
}

Nav.prototype.clearMenu = function(Container) {
    while (Container.hasChildNodes())
        Container.removeChild(Container.firstChild); 
}

Nav.prototype.fillMenu = function(Container, menu) {
    this.clearMenu(Container);
    for (var i = 0; i < menu.children.length; i++) {
        var child = menu.children[i];

        // Child Menu event handler
        if (child.children) {
            child.nav = this;
            child.DOMObject.addEventListener("click", child, false);
        }

        Container.append(child.DOMObject);
    }

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

Nav.prototype.swapClass = function(DOMObject, popClass, pushClass) {
    this.addClass(DOMObject, pushClass);
    this.removeClass(DOMObject, popClass);
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
