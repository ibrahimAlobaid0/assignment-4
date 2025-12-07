/* ===========================================================
   THEME TOGGLE (Light / Dark Mode)
   =========================================================== */
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
  // Toggle dark-theme class on the body
  document.body.classList.toggle('dark-theme');

  // Save user preference in local storage
  const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Apply saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}
/* ===========================================================
counter for how long the user has been on the website, as required
   =========================================================== */
let seconds = 0;
const counterElement = document.getElementById('counter');
setInterval(() => {
  seconds++;
  if(seconds>59){
    let minutes = Math.floor(seconds/60);
    let remSeconds = seconds % 60;
    counterElement.textContent = `You have been on the website for: ${minutes} minute${minutes !== 1 ? 's' : ''} and ${remSeconds} second${remSeconds !== 1 ? 's' : ''}`;
    return;
  }
  counterElement.textContent = `You have been on the website for: ${seconds} second${seconds !== 1 ? 's' : ''}`;
}
, 1000);

/* ===========================================================
   EXPANDABLE / COLLAPSIBLE PROJECT SECTIONS
   =========================================================== */
document.querySelectorAll(".project h3").forEach(title => {
  title.addEventListener("click", () => {
    const project = title.parentElement;
    const description = project.querySelector(".description");

    // Toggle visibility
    const isVisible = description.style.display === "block";
    description.style.display = isVisible ? "none" : "block";

    // Toggle arrow rotation
    project.classList.toggle("active", !isVisible);
  });
});

/* ===========================================================
   CONTACT FORM VALIDATION + ANIMATED FEEDBACK
   =========================================================== */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');

  // Clear everything first
  status.classList.remove('show', 'success', 'error');
  status.textContent = '';
  
  // Force browser to reflow (this is the key!)
  void status.offsetWidth;

  // Validate input fields
  if (!name || !email || !message) {
    status.textContent = "⚠️ Please fill in all fields.";
    status.classList.add('error');
    
    // Force reflow again before adding 'show'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        status.classList.add('show');
      });
    });
    
    setTimeout(() => status.classList.remove('show'), 4000);
    return;
  }

  // Show success message
  status.textContent = "✅ Message sent successfully!";
  status.classList.add('success');
  
  // Force reflow before adding 'show'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      status.classList.add('show');
    });
  });

  setTimeout(() => status.classList.remove('show'), 4000);

  e.target.reset();
});


/* ===========================================================
   SCROLL FADE-IN ANIMATION
   (Reveals elements with 'fade-in' class as they appear)
   =========================================================== */
/* ===========================================================
   SCROLL FADE-IN ANIMATION
   (Reveals elements with 'fade-in' class as they appear)
   =========================================================== */

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Select all elements with fade-in class
  const fadeElements = document.querySelectorAll('.fade-in');

  // Function to reveal elements when they enter viewport
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85; // 85% of viewport height

    fadeElements.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < triggerBottom) {
        el.classList.add('visible'); // Add class to trigger CSS fade-in
      }
    });
  }

  // Listen to scroll event
  window.addEventListener('scroll', revealOnScroll);

  // Run immediately to catch elements already visible
  revealOnScroll();
});



/* ===========================================================
   EMPTY STATE HANDLING FOR PROJECTS
   (Displays a message if no projects are present)
   =========================================================== */

// Select project container and empty state message

const projectsContainer = document.getElementById('projects-container');
const emptyMessage = document.getElementById('empty-projects');
function checkProjects() {
    if (!projectsContainer) return; // safeguard
    const projects = projectsContainer.querySelectorAll('.project');
    emptyMessage.style.display = projects.length === 0 ? 'block' : 'none';
  }
checkProjects();
/* ===========================================================
   API: FETCH quote
   =========================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const error = document.getElementById('quote-error');
  const content = document.getElementById('quote-content');
  const quoteText = document.getElementById('quote-text');
  // Function to fetch and display quote from API
 function fetchQuote() {
  error.style.display = 'none';
  content.style.display = 'none';

  fetch('https://dummyjson.com/quotes/random')
    .then(response => response.json())
    .then(data => {

      if (!data || !data.quote || !data.author) {
        throw new Error('Invalid data format');
      }
      setTimeout(() => {
        content.style.display = 'block';
        quoteText.innerHTML = `<strong>${data.author}</strong><br><br>${data.quote}`;
      }, 100);
    })
    // Handle errors
    .catch(err => {
      console.error('Error fetching quote:', err);
      error.style.display = 'block';
    });
  }

  fetchQuote();

  const retryBtn = document.getElementById('retry-quote');
  if (retryBtn) retryBtn.addEventListener('click', fetchQuote);
});


// Filter functionality

 const messages = {
    all: "Showing all projects. Select a skill level to see tailored recommendations!",
    beginner: "🌱 Great choice! These beginner projects will help you build a strong foundation.",
    intermediate: "🚀 Perfect! These intermediate projects will level up your skills.",
    advanced: "⭐ Excellent! These advanced projects will challenge and refine your expertise."
  };

  let currentLevel = 'all';
  let currentCategory = 'all';

  function updateMessage(level) {
    const messageEl = document.getElementById('levelMessage').querySelector('.message-text');
    messageEl.textContent = messages[level];
  }

  function filterProjects() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
      const matchesLevel = currentLevel === 'all' || project.dataset.level === currentLevel;
      const matchesCategory = currentCategory === 'all' || project.dataset.category === currentCategory;
      
      if (matchesLevel && matchesCategory) {
        project.classList.remove('hidden');
      } else {
        project.classList.add('hidden');
      }
    });
  }

  // Skill level selection
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      currentLevel = btn.dataset.level;
      updateMessage(currentLevel);
      filterProjects();
    });
  });

  // Category filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      currentCategory = btn.dataset.filter;
      filterProjects();
    });
  });

  // Sort functionality
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const container = document.getElementById('projects-container');
    const projects = Array.from(container.querySelectorAll('.project'));
    
    projects.sort((a, b) => {
      switch(sortBy) {
        case 'date-desc':
          return new Date(b.dataset.date) - new Date(a.dataset.date);
        case 'date-asc':
          return new Date(a.dataset.date) - new Date(b.dataset.date);
        case 'name-asc':
          return a.dataset.name.localeCompare(b.dataset.name);
        case 'name-desc':
          return b.dataset.name.localeCompare(a.dataset.name);
        default:
          return 0;
      }
    });
    
    projects.forEach(project => container.appendChild(project));
  });

  
document.addEventListener('DOMContentLoaded', function() {
  // Remember visitor name
  if (localStorage.getItem('visitorName')) {
    const savedName = localStorage.getItem('visitorName');
    document.getElementById('visitor-name').value = savedName;
    document.getElementById('greeting').textContent = `Welcome back, ${savedName}!`;
  }
  const nameInput = document.getElementById('visitor-name');
  const greetingMsg = document.getElementById('greeting');

  // Login/Logout toggle
  const loginBtn = document.getElementById('login-btn');
  const loginStatus = document.getElementById('login-status');

 
  loginBtn.addEventListener('click', () => {
    const isLoggedIn = loginStatus.textContent === 'Logged In';

    if (isLoggedIn) {
      // Logout
      loginStatus.textContent = 'Logged Out';
      loginBtn.textContent = 'Login';
      greetingMsg.textContent = 'goodbye!';
    } else {
      // Login
      loginStatus.textContent = 'Logged In';
      loginBtn.textContent = 'Logout';
      greetingMsg.textContent = `Welcome back, ${nameInput.value || 'no name'}!`;
      localStorage.setItem('visitorName', nameInput.value);

    }
});

});





// ========================
// SECTION TOGGLE FUNCTIONALITY
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.section-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Toggle the collapsed class on button
        button.classList.toggle('collapsed');
        
        // Toggle visibility of the section
        if (targetSection.style.display === 'none') {
          targetSection.style.display = '';
        } else {
          targetSection.style.display = 'none';
        }
      }
    });
  });
});
