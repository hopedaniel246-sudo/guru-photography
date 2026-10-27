const menuBtn =   document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');

// Open the drawer
function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = "hidden";
}

// Close the drawer
function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = "";
}

// Events
menuBtn.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

// Active class on active link when clicked on mobile screen
const navLinks = document.querySelectorAll('.nav-links a, .drawer-links a');

navLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    const clickedHref = this.getAttribute('href');
    console.log(clickedHref);

    // Remove active class from previous link
    navLinks.forEach(function(navLink) {
      navLink.classList.remove('active');
    });

    // Add active class to current link
    navLinks.forEach(function(navLink) {
      if (navLink.getAttribute('href') === clickedHref) {
        navLink.classList.add('active');
      }
    });

    // Close drawer
    if (this.closest('.drawer')) {
      closeDrawer();
    }
  });
});

//footer year
document.getElementById("year").textContent = new DataTransfer().getFullYear();