const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-items a');

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
});

// Close mobile menu when clicking nav links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('active');
    }
});

// Tab Section 

const integrations = [
    {
        name: 'ChatGPT Extension',
        description: 'Access ChatGPT directly in your browser. Get instant AI assistance for writing, research, and problem-solving while browsing any website.',
        category: 'content',
        logo: 'assets/images/chatgpt.png',
        extensionUrl: 'https://chrome.google.com/webstore/detail/chatgpt'
    },
    {
        name: 'ColorZilla',
        description: 'A tool for color-related tasks like color picking, gradient generation, and analyzing the color palette of a webpage.',
        category: 'development',
        logo: 'assets/images/ColorZilla.png',
        extensionUrl: 'https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en'
    },
    {
        name: 'Wappalyzer',
        description: 'Identifies the technologies and frameworks used in a website, such as CMS, analytics tools, or e-commerce platforms.',
        category: 'development',
        logo: 'assets/images/Wappalyzer.png',
        extensionUrl: 'https://chromewebstore.google.com/detail/wappalyzer-technology-pro/gppongmhjkpfnbhagpmjfkannfbllamg'
    },
    {
        name: 'SEO Extension',
        description: 'Analyze webpage SEO in real-time. Get insights on meta tags, headings, keywords, and actionable recommendations for optimization.',
        category: 'seo',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/seo-extension'
    },
    {
        name: 'ColorPick Eyedropper',
        description: 'Pick colors from any webpage with pixel-perfect accuracy. Save colors, generate palettes, and export in multiple formats.',
        category: 'design',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/colorpick-eyedropper'
    },
    {
        name: 'Grammarly',
        description: 'Advanced writing assistant that helps you write mistake-free on Gmail, Facebook, Twitter, LinkedIn, and everywhere else you write on the web.',
        category: 'content',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/grammarly'
    },
    {
        name: 'Web Developer',
        description: 'Adds various web developer tools to your browser. Modify CSS, disable JavaScript, view source, validate HTML, and much more.',
        category: 'development',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/web-developer'
    },
    {
        name: 'LastPass',
        description: 'Securely store and autofill passwords across all your devices and browsers.',
        category: 'security',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/lastpass'
    },
    {
        name: 'Google Analytics',
        description: 'Track website traffic and user behavior directly from your browser.',
        category: 'analytics',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/google-analytics'
    },
    {
        name: 'Social Media Manager',
        description: 'Manage all your social media accounts from one convenient browser extension.',
        category: 'social',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/social-media-manager'
    },
    {
        name: 'Zoom Scheduler',
        description: 'Schedule Zoom meetings directly from your browser with one click.',
        category: 'communication',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/zoom-scheduler'
    },
    {
        name: 'Trello',
        description: 'Access your Trello boards and create cards from any webpage.',
        category: 'productivity',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/trello'
    },
    {
        name: 'GitHub Code Review',
        description: 'Enhanced code review tools for GitHub pull requests.',
        category: 'development',
        logo: '/api/placeholder/200/60',
        extensionUrl: 'https://chrome.google.com/webstore/detail/github-code-review'
    }
];

const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let currentCategory = 'all';

function createCard(integration) {
    return `
              <div class="card" data-category="${integration.category}">
                <img src="${integration.logo}" alt="${integration.name}" class="card-logo">
                <h3 class="card-title">${integration.name}</h3>
                <p class="card-description">${integration.description}</p>
                <a href="${integration.extensionUrl}" target="_blank" rel="noopener noreferrer" class="card-button">Add Extension</a>
              </div>
            `;
}

function updatePaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const pageInfo = document.getElementById('pageInfo');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    // Hide pagination if there's only one page
    document.getElementById('pagination').style.display = totalPages > 1 ? 'flex' : 'none';
}

function filterCards(category) {
    currentCategory = category;
    currentPage = 1;

    const filteredIntegrations = category === 'all'
        ? integrations
        : integrations.filter(integration => integration.category === category);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageIntegrations = filteredIntegrations.slice(startIndex, endIndex);

    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = '';
    pageIntegrations.forEach(integration => {
        cardsGrid.innerHTML += createCard(integration);
    });

    updatePaginationControls(filteredIntegrations.length);
}

function changePage(direction) {
    const filteredIntegrations = currentCategory === 'all'
        ? integrations
        : integrations.filter(integration => integration.category === currentCategory);

    const totalPages = Math.ceil(filteredIntegrations.length / ITEMS_PER_PAGE);

    if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageIntegrations = filteredIntegrations.slice(startIndex, endIndex);

    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = '';
    pageIntegrations.forEach(integration => {
        cardsGrid.innerHTML += createCard(integration);
    });

    updatePaginationControls(filteredIntegrations.length);
}

// Initialize cards
filterCards('all');

// Desktop/Tablet tab handlers
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        filterCards(tab.dataset.category);
    });
});

// Mobile dropdown handlers
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');
const selectedCategory = document.querySelector('.selected-category');

dropdownButton.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.dropdown-item.active').classList.remove('active');
        item.classList.add('active');

        const category = item.dataset.category;
        selectedCategory.textContent = item.textContent;
        filterCards(category);
        dropdownContent.classList.remove('show');
    });
});

// Pagination button handlers
document.getElementById('prevButton').addEventListener('click', () => changePage('prev'));
document.getElementById('nextButton').addEventListener('click', () => changePage('next'));

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-dropdown')) {
        dropdownContent.classList.remove('show');
    }
});

// Smooth Scrolling Function

function smoothScroll(target, duration = 1000) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Simple easing function
        const ease = progress => (1 - Math.cos(progress * Math.PI)) / 2;

        window.scrollTo(0, startPosition + targetPosition * ease(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Add click listeners to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScroll(target);
        }
    });
});

// Add these variables at the start of your script
let recentlyAddedExtensions = [];
const MAX_RECENT_ITEMS = 5;

// Add this function to handle new extensions
function addNewExtension(extension) {
    // Add to main integrations array
    integrations.unshift(extension);
    
    // Add to recent items
    recentlyAddedExtensions.unshift(extension);
    if (recentlyAddedExtensions.length > MAX_RECENT_ITEMS) {
        recentlyAddedExtensions.pop();
    }
    
    // Update both sections
    updateRecentlyAdded();
    filterCards(currentCategory);
}

// Function to update the recently added section
function updateRecentlyAdded() {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;

    const recentHTML = recentlyAddedExtensions.map(extension => `
        <li class="recent-item" data-category="${extension.category}">
            <img src="${extension.logo}" alt="${extension.name}" class="recent-logo">
            <div class="recent-info">
                <h4 class="recent-title">${extension.name}</h4>
                <span class="recent-category">${extension.category}</span>
            </div>
            <a href="${extension.extensionUrl}" target="_blank" rel="noopener noreferrer" class="recent-add-btn">
                Add Extension
            </a>
        </li>
    `).join('');

    recentList.innerHTML = recentHTML;

    // Add hover effect for recent items
    document.querySelectorAll('.recent-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Initialize recent items with latest 5 extensions
recentlyAddedExtensions = integrations.slice(0, MAX_RECENT_ITEMS);
updateRecentlyAdded();

function initializeTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    
    // Clone testimonials multiple times for smoother infinite scroll
    for (let i = 0; i < 3; i++) {
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Calculate total width of original cards
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem gap
    const totalWidth = cards.length * (cardWidth + gap);
    
    function scroll() {
        track.style.transform = 'translateX(0)';
        track.style.transition = 'none';
        
        const animation = track.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(-${totalWidth}px)` }
        ], {
            duration: 10000, // Adjust speed by changing duration
            iterations: Infinity,
            easing: 'linear'
        });

        // Pause/Resume on hover
        track.addEventListener('mouseenter', () => animation.pause());
        track.addEventListener('mouseleave', () => animation.play());
    }

    scroll();
}

document.addEventListener('DOMContentLoaded', initializeTestimonialSlider);

// Scroll to top functionality
const scrollBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

// Smooth scroll to top
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

