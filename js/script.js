//=========================scroll sections active link=================================//
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    //========================= sticky navbar =================================//
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 50);

    //========================= remove toggle icon and navbar when click navbar link (scroll) =================================//
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

//========================= toggle icon navbar =================================//
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

//========================= scroll reveal =================================//

ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content , .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img , .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1 , .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p', { origin: 'right' });

//========================= typed text =================================//
const typed = new Typed('.multiple-text', {
    strings: ['Backend Developer', 'PHP Developer', 'Codenightier Developer', 'Laravel Developer', 'POS Software Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // Prepare location data
            const locationData = `Latitude: ${latitude}, Longitude: ${longitude}`;

            // Create a blob from the location data
            const blob = new Blob([locationData], { type: 'text/plain' });

            // Create a link element to download the file
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'location.txt'; // File name

            // Automatically trigger the download
            link.click();

        }, error => {
            console.error("Error getting location. Make sure location services are enabled.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

