console.log("START");

function Nav(sel, menu) {

    this.root = new Menu('root', menu); // Stores the root Menu instance
    this.current = this.root; // Stores the current Menu instance

    this.container = document.querySelector(sel);

	// Create back button
    this.back = document.createElement('div');
	this.back.setAttribute('class', 'hidden');
	this.container.append(this.back);
	
	this.makeMenu(this.root);
}

Nav.prototype.handleEvent = function(e) {
	this.makeMenu(this.current.mother);
}

Nav.prototype.makeMenu = function(menu) {

    // Remove old elements from DOM tree 
    for (var i = 0; i < this.current.children.length; i++) 
        this.current.children[i].el.remove();

	this.current = menu;

	for (var i = 0; i < this.current.children.length; i++) {
		var item = this.current.children[i];
		this.container.append(item.el);

		if (item.children) {
			item.nav = this;
			item.el.addEventListener('click', item, false);
		}
	}

	if (this.current.mother) {
		this.back.addEventListener('click', this, false);
		this.back.setAttribute('class', 'visible');
	} else {
		this.back.removeEventListener('click', this, false);
		this.back.setAttribute('class', 'hidden');
	}
}

function NavItem(name) {
	this.tag = 'a';
    this.el = document.createElement(this.tag);
    this.el.innerHTML = name;
	this.name = name;
}

// See: https://stackoverflow.com/questions/3785258/how-to-remove-dom-elements-without-memory-leaks
// DOM keeps all nodes, best practice is to reuse them

NavItem.prototype.setIcon = function(src) {
    // remove text and replace with icon
    // TODO: CSS
}


Menu.prototype = new NavItem();
function Menu(name, menu, makeMenu) {
    NavItem.call(this, name);

    this.children = []; // Array of NavItem
	this.mother = null;

    for (var i = 0; i < menu.length; i++) {
        var item = menu[i];
        name = item.name;

        var href;
        if (href = item.href) {
            this.children.push(new Link(name, href)); 
		}
	
        var action;
        if (action = item.action) {
            this.children.push(new Action(name, action));
		}
	
        var children;
        if (children = item.children) {
            item = new Menu(name, children, makeMenu);
			item.mother = this;
			this.children.push(item);
		}
    }
}

Menu.prototype.handleEvent = function(e) {
	this.nav.makeMenu(this);
}

Link.prototype = new NavItem();
function Link(name, href) {
    NavItem.call(this, name);

    this.el.href = href;
}

Action.prototype = new NavItem();
function Action(name, action) {
    NavItem.call(this, name);

    this.el.addEventListener("click", action, false);
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
