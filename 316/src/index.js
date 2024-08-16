// Select and cache the main element
const mainEl = document.querySelector('main');

// Set the background color using a CSS variable
mainEl.style.backgroundColor = 'var(--main-bg)';

// Add inner HTML content
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

// Add a class to center content
mainEl.classList.add('flex-ctr');

// Select and cache the top menu element
const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

// Menu link data
var menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];

// Create menu links
menuLinks.forEach(link => {
    const anchorEl = document.createElement('a');
    anchorEl.setAttribute('href', link.href);
    anchorEl.textContent = link.text;
    topMenuEl.appendChild(anchorEl);
});


const subMenuEl = document.querySelector('#sub-menu'); // Select and cache the sub-menu element
subMenuEl.style.height = '100%'; // Set the height subMenuEl element to be "100%".
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'; // Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.classList.add('flex-around'); // Add the class of flex-around to the subMenuEl element.
subMenuEl.style.position = 'absolute'; //Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.top = '0'; //Set the CSS top property of subMenuEl to the value of 0.

// Select and cache all <a> elements inside of topMenuEl
const topMenuLinks = topMenuEl.querySelectorAll('a');

// Add event listener to manage the active state
topMenuEl.addEventListener('click', (event) => {
    event.preventDefault();

    // Ensure the clicked element is an <a> tag
    if (event.target.tagName !== 'A') return; //return if the element clicked was not an <a> element.
    //Log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);
  //in which case it should remove it.
    if (event.target.classList.contains("active")) { //add the active class to the <a> element hat was clicked

        event.target.classList.remove("active"); // remove it if it was already active
    } else {
        event.target.classList.add("active");
    }
   // remove the active class from each other < a > element in topMenuLinks - whether the active class exists or not.
    topMenuLinks.forEach((item) => {
        if (item != event.target) {
            item.classList.remove("active");
        }
    });
      // If the clicked <a> element's "link" object within menuLinks has a subLinks property
  //(all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
    if (
        menuLinks.filter(
            (item) => item.text == event.target.textContent && item.subLinks
        ).length !== 0
    ) {
        subMenuEl.style.top = "100%"; // set property to 100% if menuLinks has subLinks property
    } else {
        // Otherwise, set the top property of subMenuEl to 0.
        subMenuEl.style.top = "0";
    }
    // helper function
    const buildSubmenu = (subLinks) => {
        // Clear the current contents of subMenuEl
        subMenuEl.innerHTML = '';
        // Iterate over the subLinks array
        if (!subLinks)
            return
        subLinks.forEach(link => {
            const newA = document.createElement('a');
            // Set href attribute
            newA.setAttribute('href', link.href);
            // Set text content
            newA.textContent = link.text;
            // Append to subMenuEl
            subMenuEl.appendChild(newA);
        })
    };
    menuLinks.forEach((item) => {
        if (item.text == event.target.textContent) {
            buildSubmenu(item.subLinks)
        }
    });
});// Assuming topMenuEl, subMenuEl, and mainEl are already selected and properly configured

// Attach a delegated 'click' event listener to subMenuEl
topMenuEl.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default action of the click event
    // Ensure the clicked element is an <a> tag
    if (event.target.tagName !== 'A') return;
    // Remove 'active' class from all links
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });
    // Add 'active' class to the clicked link
    event.target.classList.add('active');

    // Check if the clicked link has subLinks
    const hasSubLinks = menuLinks.some(
        (item) => item.text === event.target.textContent && item.subLinks
    );

    subMenuEl.style.top = hasSubLinks ? '100%' : '0'; // set top property to 100% if it has sublinks, 0 if it doesnt
  //  If the ABOUT link is clicked, an < h1 > About</ > should be displayed in place of DOM Manipulation
    mainEl.innerHTML = `<h1>${event.target.textContent.charAt(0).toUpperCase() + event.target.textContent.slice(1)}</h1>`;
});













