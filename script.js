// --- SCROLL ANIMATIONS ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- EMAIL BUTTON LOGIC ---
document.getElementById('email-btn').addEventListener('click', function(e) {
    const email = "kishoreravishankar471@gmail.com";
    
    const textArea = document.createElement("textarea");
    textArea.value = email;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check"></i> Email Copied!';
            this.style.background = 'var(--secondary-gradient)';
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = ''; 
            }, 2000);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
});

// --- RESUME DOWNLOAD LOGIC ---
document.getElementById('download-cv-btn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set styling
    doc.setFont("helvetica");
    doc.setFontSize(22);
    doc.setTextColor(59, 130, 246); // Blue color
    
    // Name
    doc.text("Kishore Ravishankar", 20, 20);
    
    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text("Frontend Developer", 20, 28);
    
    // Contact Info
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text("Email: kishoreravishankar471@gmail.com", 20, 36);
    doc.text("Phone: +91 90253 20883", 20, 42);
    doc.text("Github: github.com/KishoreRaviShankar", 20, 48);
    
    // Line
    doc.setDrawColor(200);
    doc.line(20, 52, 190, 52);

    let yPos = 60;

    // SECTION: Executive Summary
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Executive Summary", 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(80);
    const summary = "Innovative Front End Developer with high productivity and efficient task completion. Skilled in HTML, CSS, and JavaScript, with keen ability to create responsive web designs. Good at problem-solving, teamwork, and time management.";
    const splitSummary = doc.splitTextToSize(summary, 170);
    doc.text(splitSummary, 20, yPos);
    yPos += 20;

    // SECTION: Experience
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Experience", 20, yPos);
    yPos += 8;

    // Job 1
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("Front End Web Developer Intern | Pantech e-Learning", 20, yPos);
    yPos += 5;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Aug 2024", 20, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("- Enhanced food shopping cart webpage development using ReactJS.", 25, yPos);
    yPos += 5;
    doc.text("- Created user interfaces with HTML, CSS, JavaScript, and ReactJS.", 25, yPos);
    yPos += 12;

    // Job 2
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("Front End Developer Internship | Sevol Software Solution", 20, yPos);
    yPos += 5;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("July 2023 - Aug 2023", 20, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("- Designed web pages for Logistics/Transportation using HTML, CSS, JS.", 25, yPos);
    yPos += 15;

    // SECTION: Projects
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Projects", 20, yPos);
    yPos += 8;

    doc.setFontSize(11);
    doc.text("Food Cart", 20, yPos);
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(" - Food delivery web app using ReactJS, HTML, CSS.", 50, yPos);
    yPos += 7;

    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("UNBLLUR", 20, yPos);
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(" - Image editing and cloud album storage website.", 50, yPos);
    yPos += 7;

    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("Weather App", 20, yPos);
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(" - Weather tracking app using React and Weather API.", 50, yPos);
    yPos += 15;

    // SECTION: Skills
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Technical Skills", 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(80);
    const skills = "ReactJS, Redux, JavaScript, HTML5, CSS3, Node.js, Java, SQL, React Native, Android Studio, Git, GitHub, VS Code.";
    const splitSkills = doc.splitTextToSize(skills, 170);
    doc.text(splitSkills, 20, yPos);

    // Save the PDF
    doc.save("Kishore_Ravishankar_Resume.pdf");
});


// --- PROJECT MANAGER (DATA & LOGIC) ---
// Updated with Projects from Resume
const initialProjects = [
    {
        id: 1,
        title: 'Food Cart',
        desc: 'A food delivery web app built with ReactJs, HTML, CSS, and JavaScript.',
        icon: 'fa-cart-shopping',
        link: '#'
    },
    {
        id: 2,
        title: 'UNBLLUR',
        desc: 'Professional image editing and cloud album storage website using HTML, CSS, and JS.',
        icon: 'fa-image',
        link: '#'
    },
    {
        id: 3,
        title: 'Weather App',
        desc: 'Find weather conditions like rain, humidity, and wind using React and the Weather API.',
        icon: 'fa-cloud-sun',
        link: '#'
    },
   
];

let projects = JSON.parse(localStorage.getItem('myPortfolioProjects_v2')) || initialProjects;

const projectsGrid = document.getElementById('projects-grid');
const modal = document.getElementById('project-modal');
const form = document.getElementById('project-form');

function renderProjects() {
    projectsGrid.innerHTML = '';
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No projects yet. Add one!</div>';
        return;
    }

    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteProject(${p.id})"><i class="fa-solid fa-trash"></i></button>
            <div class="project-header">
                <i class="fa-solid ${p.icon}"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.desc}</p>
                <div class="project-links">
                    <a href="${p.link}" class="link-item"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>
                    <a href="${p.link}" class="link-item"><i class="fa-brands fa-github"></i> Code</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

function saveProjects() {
    localStorage.setItem('myPortfolioProjects_v2', JSON.stringify(projects));
    renderProjects();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProject = {
        id: Date.now(),
        title: document.getElementById('p-title').value,
        desc: document.getElementById('p-desc').value,
        icon: document.getElementById('p-icon').value,
        link: document.getElementById('p-link').value
    };
    projects.push(newProject);
    saveProjects();
    toggleModal(false);
    form.reset();
});

window.deleteProject = function(id) {
    if(confirm('Delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        saveProjects();
    }
};

const toggleModal = (show) => modal.classList.toggle('open', show);
document.getElementById('add-project-btn').onclick = () => toggleModal(true);
document.getElementById('close-modal-btn').onclick = () => toggleModal(false);
modal.onclick = (e) => { if(e.target === modal) toggleModal(false); };

const menuBtn = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    nav.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        nav.classList.remove('active');
    });
});

renderProjects();