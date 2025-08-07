// JavaScript for responsive navigation toggle
document.getElementById('nav-toggle').onclick = function() {
    document.getElementById('nav-content').classList.toggle('hidden');
    console.log('Navigation toggle clicked.');
}

// JavaScript for video and text animation in Hero Section 1
const heroVideo1 = document.getElementById('heroVideo1');
const heroText1 = document.getElementById('heroText1');
let heroText1Shown = false; // Flag to ensure hero text 1 is shown only once

// Function to show the hero text 1
function showHeroText1() {
    if (!heroText1Shown) {
        if (heroText1) {
            heroText1.classList.add('show');
            heroText1Shown = true;
            console.log('Hero Text 1 shown.');
        } else {
            console.error('heroText1 element not found!');
        }
    }
}


// BharatBMS Card Animation on Scroll
const bharatbmsCard = document.getElementById('bharatbmsCard');
const bharatbmsText = document.getElementById('bharatbmsText'); // Get the text element

if (bharatbmsCard) {
    console.log('BharatBMS Card element found.');
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once animated
                console.log('BharatBMS Card animated into view.');
            }
        });
    }, { threshold: 0.2 });
    cardObserver.observe(bharatbmsCard);
} else {
    console.error('bharatbmsCard element not found!');
}

if (bharatbmsText) {
    console.log('BharatBMS Text element found.');
    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once animated
                console.log('BharatBMS Text animated into view.');
            }
        });
    }, { threshold: 0.3 }); // A slightly higher threshold can make it appear a bit later
    textObserver.observe(bharatbmsText);
} else {
    console.error('bharatbmsText element not found!');
}


// Listen for video metadata to be loaded to get duration for Hero Video 1
if (heroVideo1) {
    console.log('Hero Video 1 element found.');
    heroVideo1.addEventListener('loadedmetadata', () => {
        const videoDuration = heroVideo1.duration;
        const showTextTime = videoDuration - 3;
        console.log(`Hero Video 1 loadedmetadata. Duration: ${videoDuration}s. Text show time: ${showTextTime}s.`);

        heroVideo1.addEventListener('timeupdate', () => {
            if (heroVideo1.currentTime >= showTextTime && !heroText1Shown) {
                console.log(`Hero Video 1 timeupdate: ${heroVideo1.currentTime}s. Showing text.`);
                showHeroText1();
            }
        });
    });

    heroVideo1.addEventListener('error', (e) => {
        console.error("Hero Video 1 failed to load or play.", e);
        showHeroText1();
    });
} else {
    console.error('heroVideo1 element not found!');
}


// JavaScript for video and text animation in Hero Section 2
const heroVideo2 = document.getElementById('heroVideo2');
const heroText2 = document.getElementById('heroText2');
let heroText2Shown = false; // Flag to ensure hero text 2 is shown only once

// Function to show the hero text 2
function showHeroText2() {
    if (!heroText2Shown) {
        if (heroText2) {
            heroText2.classList.add('show');
            heroText2Shown = true;
            console.log('Hero Text 2 shown.');
        } else {
            console.error('heroText2 element not found!');
        }
    }
}

// Listen for video metadata to be loaded to get duration for Hero Video 2
if (heroVideo2) {
    console.log('Hero Video 2 element found.');
    heroVideo2.addEventListener('loadedmetadata', () => {
        const videoDuration = heroVideo2.duration;
        const showTextTime = videoDuration - 3; // Show text 3 seconds before end
        console.log(`Hero Video 2 loadedmetadata. Duration: ${videoDuration}s. Text show time: ${showTextTime}s.`);

        heroVideo2.addEventListener('timeupdate', () => {
            if (heroVideo2.currentTime >= showTextTime && !heroText2Shown) {
                console.log(`Hero Video 2 timeupdate: ${heroVideo2.currentTime}s. Showing text.`);
                showHeroText2();
            }
        });
    });

    heroVideo2.addEventListener('error', (e) => {
        console.error("Hero Video 2 failed to load or play.", e);
        showHeroText2();
    });
} else {
    console.error('heroVideo2 element not found!');
}


// Energy Customization Section Logic
const powerDisplay = document.getElementById('powerDisplay');
const addMorePowerBtn = document.getElementById('addMorePowerBtn');
const removePowerBtn = document.getElementById('removePowerBtn');
const moduleImagesContainer = document.getElementById('moduleImagesContainer');
const addControl = document.getElementById('addControl'); // Get add button's parent container
const removeControl = document.getElementById('removeControl'); // Get remove button's parent container

// Initial state (from HTML)
let currentModules = 1; // Starts with 1 module as per the latest HTML
const KWH_PER_MODULE = 5; // Each module adds 5kWh
// Removed KW_PER_MODULE as it's no longer needed for display
const MAX_MODULES = 3; // Max modules (can be adjusted)
const MIN_MODULES = 1; // Minimum modules

// Function to update the display text and button state
function updateModuleDisplay() {
    const totalKwH = currentModules * KWH_PER_MODULE;
    // Removed totalKw calculation as it's no longer displayed

    powerDisplay.textContent = `${totalKwH}kWh`; // Display only kWh

    // Position the "Add More Power" and "Remove Power" buttons
    positionModuleButtons();

    // Enable/disable Add button and its container
    if (currentModules >= MAX_MODULES) {
        addMorePowerBtn.disabled = true;
        addMorePowerBtn.classList.add('opacity-50', 'cursor-not-allowed');
        addControl.style.display = 'none'; // Hide the entire add control
    } else {
        addMorePowerBtn.disabled = false;
        addMorePowerBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        addControl.style.display = 'flex'; // Show the entire add control
    }

    // Enable/disable Remove button and its container
    if (currentModules <= MIN_MODULES) {
        removePowerBtn.disabled = true;
        removePowerBtn.classList.add('opacity-50', 'cursor-not-allowed');
        removeControl.style.display = 'none'; // Hide the entire remove control
    } else {
        removePowerBtn.disabled = false;
        removePowerBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        removeControl.style.display = 'flex'; // Show the entire remove control
    }
    console.log(`Current Modules: ${currentModules}, Total Power: ${totalKwH}kWh`); // Updated console log

    const energyProgress = document.getElementById('energyProgress');
    if (energyProgress) {
        const percent = (currentModules / MAX_MODULES) * 100;
        energyProgress.style.width = `${percent}%`;
    }

    // Highlight appliances based on available power
    const appliances = document.querySelectorAll('.appliance-item');
    const totalPower = currentModules * KWH_PER_MODULE;
    let activeAppliances = 0;

    // Adjusting highlighting logic for MAX_MODULES = 3 (max 15kWh)
    if (totalPower === 5) activeAppliances = 5;
    else if (totalPower === 10) activeAppliances = 9;
    else if (totalPower === 15) activeAppliances = 12; // All 12 appliances are active at 15kWh (3 modules)

    appliances.forEach((el, index) => {
        const iconDiv = el.querySelector('.appliance-icon');
        const textSpan = el.querySelector('span');

        if (index < activeAppliances) {
            if (iconDiv) {
                iconDiv.style.color = '#00C6FF'; // Bright blue for active icons
                iconDiv.style.opacity = '1';
            }
            if (textSpan) {
                textSpan.style.color = '#ffffff'; // White for active text
                textSpan.style.opacity = '1';
            }
          } else {
            if (iconDiv) {
                iconDiv.style.color = '#9ca3af'; // Tailwind's gray-400 for inactive icons
                iconDiv.style.opacity = '0.5';
            }
            if (textSpan) {
                textSpan.style.color = '#9ca3af'; // Tailwind's gray-400 for inactive text
                textSpan.style.opacity = '0.5';
            }
          }
    });
}

// Function to dynamically position the "Add More Power" and "Remove Power" buttons
function positionModuleButtons() {
    const modules = moduleImagesContainer.querySelectorAll('img');
    if (modules.length > 0) {
        const firstModule = modules[0];
        const lastModule = modules[modules.length - 1];

        // Get the bounding rects relative to the viewport
        const firstModuleRect = firstModule.getBoundingClientRect();
        const lastModuleRect = lastModule.getBoundingClientRect();
        // Get the parent's bounding rect relative to the viewport
        const parentRect = moduleImagesContainer.parentElement.getBoundingClientRect();

        // Calculate positions for Add control (right of the last module)
        const addControlWidth = addControl.offsetWidth;
        const addControlHeight = addControl.offsetHeight;

        const addControlLeft = (lastModuleRect.right - parentRect.left) - (addMorePowerBtn.offsetWidth / 2);
        const addControlTop = (lastModuleRect.top - parentRect.top) - (addControlHeight / 2);

        addControl.style.left = `${addControlLeft}px`;
        addControl.style.top = `${addControlTop}px`;

        // Calculate positions for Remove control (left of the first module)
        const removeControlWidth = removeControl.offsetWidth;
        const removeControlHeight = removeControl.offsetHeight;

        const removeControlLeft = (firstModuleRect.left - parentRect.left) - (removePowerBtn.offsetWidth / 2);
        const removeControlTop = (firstModuleRect.top - parentRect.top) - (removeControlHeight / 2);

        removeControl.style.left = `${removeControlLeft}px`;
        removeControl.style.top = `${removeControlTop}px`;
    }
}


// Event listener for the "Add More Power" button
if (addMorePowerBtn) {
    addMorePowerBtn.addEventListener('click', () => {
        if (currentModules < MAX_MODULES) {
            currentModules++;

            // Create new image element
            const newModuleImg = document.createElement('img');
            newModuleImg.src = 'assets/images/xbattery.webp';
            newModuleImg.alt = `XBATTERY Module ${currentModules}`;
            newModuleImg.classList.add('h-80', 'w-auto', 'rounded-lg', 'shadow-lg');

            // Append to container
            if (moduleImagesContainer) {
                moduleImagesContainer.appendChild(newModuleImg);
            } else {
                console.error('moduleImagesContainer not found!');
            }

            // After adding a new module, re-position the button
            updateModuleDisplay(); // This will call positionModuleButtons
        }
    });
} else {
    console.error('addMorePowerBtn not found!');
}

// Event listener for the "Remove Power" button
if (removePowerBtn) {
    removePowerBtn.addEventListener('click', () => {
        if (currentModules > MIN_MODULES) {
            currentModules--;

            // Remove the last image element
            if (moduleImagesContainer && moduleImagesContainer.lastElementChild) {
                moduleImagesContainer.removeChild(moduleImagesContainer.lastElementChild);
            } else {
                console.error('No module images to remove or moduleImagesContainer not found!');
            }

            updateModuleDisplay(); // This will call positionModuleButtons
        }
    });
} else {
    console.error('removePowerBtn not found!');
}


// Features and Specifications Tabs Logic
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Deactivate all buttons and hide all content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button
            button.classList.add('active');

            // Show the corresponding content
            document.getElementById(`${targetTab}Content`).classList.add('active');
        });
    });

    // How It Works Section Logic
    const howItWorksTabButtons = document.querySelectorAll('.how-it-works-tab-button');
    const howItWorksVideo = document.getElementById('howItWorksVideo');
    const howItWorksTitle = document.getElementById('howItWorksTitle');
    const howItWorksDescription = document.getElementById('howItWorksDescription');

    // Function to update the How It Works section content
    function updateHowItWorksContent(videoSrc, title, description) {
        if (howItWorksVideo) {
            howItWorksVideo.src = videoSrc;
            howItWorksVideo.load(); // Load the new video source
            howItWorksVideo.play(); // Auto-play the new video
        }
        if (howItWorksTitle) {
            howItWorksTitle.textContent = title;
        }
        if (howItWorksDescription) {
            howItWorksDescription.textContent = description;
        }
    }

    howItWorksTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            howItWorksTabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            // Get data from the clicked button
            const videoSrc = button.dataset.video;
            const title = button.dataset.title;
            const description = button.dataset.description;

            // Update the video and text content
            updateHowItWorksContent(videoSrc, title, description);
        });
    });

    // Set initial content for "How It Works" section on page load
    // Trigger a click on the first tab button to set initial state
    if (howItWorksTabButtons.length > 0) {
        howItWorksTabButtons[0].click();
    }


    // Ensure text is hidden initially on page load/refresh and initial module display is set
    console.log('DOM Content Loaded.');

    // Reset for Hero Section 1
    if (heroText1) {
        heroText1.classList.remove('show');
        heroText1Shown = false;
        console.log('Hero Text 1 hidden on DOMContentLoaded.');
    }

    // Reset for Hero Section 2
    if (heroText2) {
        heroText2.classList.remove('show');
        heroText2Shown = false;
        console.log('Hero Text 2 hidden on DOMContentLoaded.');
    }

    // BharatBMS Card Animation on Scroll
    const bharatbmsCard = document.getElementById('bharatbmsCard');
    if (bharatbmsCard) {
        console.log('BharatBMS Card element found.');
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the card is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target); // Stop observing once animated
                    console.log('BharatBMS Card animated into view.');
                }
            });
        }, observerOptions);
        observer.observe(bharatbmsCard);
    } else {
        console.error('bharatbmsCard element not found!');
    }

    // Initialize the module display and button position on page load
    updateModuleDisplay();

    // Re-position buttons on window resize to ensure responsiveness
    window.addEventListener('resize', () => {
        console.log('Window resized, repositioning buttons.');
        positionModuleButtons();
    });
});
