const hamberger = document.getElementById('hamberger');
const navMenu = document.getElementById('nav-menu');
const colseIcon = document.getElementById('nav-close');
const navLink = document.querySelectorAll('.nav__link'); // . dot must be add here

navLink.forEach(link =>
          link.addEventListener("click" , () => {
                    navMenu.classList.add('hidden')
          })
)


colseIcon.addEventListener("click" , ()=>{
   navMenu.classList.add('hidden')
})


hamberger.addEventListener("click" ,()=>{
          navMenu.classList.remove('hidden')
})



         //  ~~~~~~~TABS~~~~~~~~

const tabs = document.querySelectorAll(".teb__wrap ul li");

const all = document.querySelectorAll('.item__wrap');
const food = document.querySelectorAll('.food');
const snack = document.querySelectorAll('.snack');
const beverage = document.querySelectorAll('.beverage');

tabs.forEach(tab => {
   tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach(tab => {
         tab.classList.remove("active");
      });

      // Add active class to the clicked tab
      tab.classList.add('active');

      // Get the value of the clicked tab's data-tabs attribute
      const tabval = tab.getAttribute('data-tabs');

      // Hide all items by default
      all.forEach(item => {
         item.style.display = 'none';
      });

      // Show items based on the clicked tab
      if (tabval === 'food') {
         food.forEach(item => {
            item.style.display = 'block';
         });
      } else if (tabval === 'snack') {
         snack.forEach(item => {
            item.style.display = 'block';
         });
      } else if (tabval === 'beverage') {
         beverage.forEach(item => {
            item.style.display = 'block';
         });
      } else {
         // If no tab matches, hide all items
         all.forEach(item => {
            item.style.display = 'none';
         });
      }
   });
});



   //  ~~~~~~~~~~~~Scroll up~~~~~~~~~~~

const scrollUp = () => {
   const scrollUpBtn = document.getElementById("scroll-up");

   // Check the scroll position
   if (window.scrollY >= 250) {
      scrollUpBtn.classList.remove("-bottom-1/2"); // Bring button into view
      scrollUpBtn.classList.add("bottom-4");
   } else {
      scrollUpBtn.classList.add("-bottom-1/2"); // Hide button off-screen
      scrollUpBtn.classList.remove("bottom-4");
   }
};

// Add scroll event listener
window.addEventListener('scroll', scrollUp);








// `````````````Change Backgroundheader````````````````

const scrollHeader = () => {
   const header = document.getElementById("header");

   // Use window.scrollY to get the scroll position
   if (window.scrollY >= 50) {
      header.classList.add("border-b", "border-secondaryColor");  // Add border when scroll is >= 50px
   } else {
      header.classList.remove("border-b", "border-secondaryColor");  // Remove border when scroll is < 50px
   }
};

window.addEventListener('scroll', scrollHeader);





// ``````````````````````Dark mode``````````````````

const html = document.querySelector("html");
const themeBtn = document.getElementById("theme-toggle");

// Check and apply the stored theme on page load
if (localStorage.getItem("mode") === "dark") {
   html.classList.add("dark");
   themeBtn.classList.replace('ri-moon-line', 'ri-sun-line');
} else {
   html.classList.remove("dark");
   themeBtn.classList.replace('ri-sun-line', 'ri-moon-line');
}

// Toggle theme on button click
themeBtn.addEventListener('click', () => {
   if (localStorage.getItem('mode') === 'light') {
      darkMode();
   } else {
      lightMode();
   }
});

// Function to enable dark mode
function darkMode() {
   html.classList.add("dark");
   themeBtn.classList.replace('ri-moon-line', 'ri-sun-line');
   localStorage.setItem("mode", "dark");
}

// Function to enable light mode
function lightMode() {
   html.classList.remove("dark");
   themeBtn.classList.replace('ri-sun-line', 'ri-moon-line');
   localStorage.setItem("mode", "light");
}








      