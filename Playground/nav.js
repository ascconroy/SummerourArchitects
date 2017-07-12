console.log("Hey");

var navTag = "nav",
    navItemTag = "a";

function Nav(sel, menu) {
    this.navEl = document.querySelector(sel);
    this.makeMenu(menu, null);
}

Nav.prototype.makeMenu = function(menu, root) {
    console.log(menu);

    // Create back button
    if (root) {
        var backButton = document.createElement(navItemTag);
        backButton.innerHTML = "back";

        backButton.addEventListener("click", this.makeMenu(root, null), false);

        this.navEl.appendChild(backButton);
    }

    // Create links
    for (var i = 0; i < menu.length; i++) {
        var navItem = document.createElement(navItemTag);
        var navObject = menu[i];
        navItem.innerHTML = navObject.name;

        var action;
        if (action = navObject.action) {
            navItem.addEventListener("click", action, false); 
        }
        
        var href;
        if (href = navObject.href) {
            navItem.href = href;
        }

        var subMenu;
        if (subMenu = navObject.menu) {
            navItem.addEventListener("click", this.makeMenu(subMenu, menu), false);
        }

        this.navEl.appendChild(navItem);
    }
}



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
