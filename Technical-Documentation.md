# Portfolio Website - Technical Documentation

## Overview
Personal portfolio featuring responsive design, theme switching, scroll animations, dynamic project filtering, and form validation with comprehensive error handling.

## Architecture

### File Structure
```
portfolio/
├── index.html    # Semantic HTML5 structure
├── style.css     # Styling, animations, responsive design
├── script.js     # Interactions, validation, filters
└── assets/       # Images and media
--- technical-documentaion.md
--- ai-usage-report.md
```

### Tech Stack
- **HTML5**: Semantic markup, accessibility
- **CSS3**: Flexbox, keyframe animations, media queries
- **JavaScript ES6+**: Event handling, validation, localStorage, IntersectionObserver

## Core Features

### 1. Responsive Layout
- Mobile-first Flexbox design
- Breakpoint: `@media (max-width: 768px)`
- Tested on desktop (1920px+), tablet (768px), mobile (375px)

### 2. Theme System
```javascript
// Toggles dark-theme class, persists to localStorage
document.body.classList.toggle('dark-theme');
localStorage.setItem('theme', isDark ? 'dark' : 'light');
```

### 3. Scroll Animations
```javascript
// IntersectionObserver adds 'visible' class at 85% viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.85 });
```

### 4. Project Filtering & Sorting
**Features:**
- Filter by skill level (beginner/intermediate/advanced)
- Filter by category (web/mobile/backend)
- Sort by date or name (ascending/descending)
- Dynamic empty state messages

**Implementation:**
```javascript
projects.forEach(project => {
  const matchesLevel = level === 'all' || project.dataset.level === level;
  const matchesCategory = category === 'all' || project.dataset.category === category;
  project.style.display = (matchesLevel && matchesCategory) ? 'block' : 'none';
});
```

### 5. Section Toggle
```javascript
// Show/hide sections with animated arrow icons
toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    target.style.display = target.style.display === 'none' ? '' : 'none';
    button.classList.toggle('collapsed');
  });
});
```

### 6. Form Validation

**Validation Rules:**
- All fields required
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Message minimum: 10 characters

**User Flow:**
1. Submit triggers validation
2. Loading spinner appears (2s simulation)
3. Success (green) or error (red) feedback
4. Retry option on failure

**Error Handling:**
```javascript
// Inline validation with red borders and messages
function showError(input, message) {
  input.classList.add('error');
  errorElement.textContent = message;
}

// Try-catch for network failures
try {
  await submitForm(data);
} catch (error) {
  showRetryButton();
}
```

### 7. User Login & Greeting
```javascript
// Toggles login state, personalizes greeting
loginBtn.addEventListener('click', () => {
  isLoggedIn = !isLoggedIn;
  loginStatus.textContent = isLoggedIn ? 'Logged In' : 'Logged Out';
  greeting.textContent = `Welcome, ${visitorName.value || 'Guest'}!`;
});
```

### 8. Session Timer
```javascript
// Displays time spent on site
let seconds = 0;
setInterval(() => {
  counter.textContent = `Time on site: ${Math.floor(seconds/60)}m ${seconds%60}s`;
  seconds++;
}, 1000);
```

## CSS Architecture

### Animations
```css
/* Fade-in: opacity 0→1, translateY -20px→0 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shake: translateX oscillation for errors */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

/* Spin: 360° for loading states */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Toggle Buttons
```css
.section-toggle {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.section-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.toggle-icon {
  transition: transform 0.3s;
}

.collapsed .toggle-icon {
  transform: rotate(-90deg);
}
```

### Responsive Design
```css
@media (max-width: 768px) {
  .container { flex-direction: column; }
  nav ul { flex-direction: column; gap: 10px; }
  .project { width: 100%; }
}
```

## Performance
- **Lighthouse Score**: 99/100
- Optimizations: Deferred scripts, CSS animations over JS
- See `assets/performance.png`
