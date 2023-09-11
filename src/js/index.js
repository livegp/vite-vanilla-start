/*= =================== SHOW MENU ==================== */
const showMenu = (toggleId, navId) => {
  const toggle = document.querySelector('#toggleId');
  const nav = document.querySelector('#navId');

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle('show-menu');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');
/*= =================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.querySelector('#nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
for (const n of navLink) n.addEventListener('click', linkAction);
// Burger
document.querySelector('.nav__btn').addEventListener('click', () => {
  document.querySelector('.burger').classList.toggle('active');
});
/*= =================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
  const { scrollY } = window;
  for (const current of sections) {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const navLinkScroll = document.querySelector(
      `.nav__menu a[href*="${sectionId}"]`,
    );

    if (navLinkScroll) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkScroll.classList.add('active-link');
      } else {
        navLinkScroll.classList.remove('active-link');
      }
    }
  }
}
window.addEventListener('scroll', scrollActive);
/*= =================== SHOW SCROLL TOP ==================== */
function scrollTop() {
  const scrolsTop = document.querySelector('#scroll-top');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrolsTop.classList.add('show-scroll');
  else scrolsTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);
/*= =================== DARK LIGHT THEME ==================== */
const themeButton = document.querySelector('#theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';
// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');
// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';
// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme,
  );
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](
    iconTheme,
  );
}
// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});
/*= =================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ==================== */
function scaleCv() {
  document.body.classList.add('scale-cv');
}
/*= =================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ==================== */
function removeScale() {
  document.body.classList.remove('scale-cv');
}
/*= =================== GENERATE PDF ==================== */
// PDF generated area
const areaCv = document.querySelector('#area-cv');
const resumeButton = document.querySelector('#resume-button');
// Html2pdf options
const opt = {
  margin: 0,
  filename: 'Resume_Pishta.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: 'letter', orientation: 'portrait' },
};
// Function to call areaCv and Html2Pdf options
function generateResume() {
  // eslint-disable-next-line no-undef
  html2pdf(areaCv, opt);
}
// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCv();
  // 2. The PDF is generated
  generateResume();
  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(removeScale, 5000);
});
