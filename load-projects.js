
const LOCAL_STORAGE_KEY = "projects";



async function renderProjects(projects) {
    const projectContainer = document.getElementById("projects");
    projectContainer.innerHTML = ""; // Clear existing cards

    try {
        projects = projects ? JSON.parse(projects) : [];
    } catch (error) {
        console.error("Error parsing localStorage projects:", error);
        projects = [];
    }

    console.log("Projects Data:", projects); // Debugging

    const title = document.createElement("h2");
    title.textContent = "Projects";
    projectContainer.appendChild(title);
    // Render project cards
    projects.forEach((project) => {
      const card = document.createElement("project-card");
      console.log(project);
      card.setAttribute("title", project.title);
      card.setAttribute("image", project.image);
      card.setAttribute("description", project.description);
      card.setAttribute("skills", project.skills);
      card.setAttribute("date", project.date);
      card.setAttribute("link", project.link);
      projectContainer.appendChild(card);
    });
  }

  function loadLocalProjects() {
    console.log("Loading local projects...");
    const storedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (storedProjects.length === 0) {
      alert("No local projects found!");
    }
    renderProjects(storedProjects);
  }
  
  // Load projects from remote JSONBin API
  async function loadRemoteProjects() {
    try {
      const response = await fetch(API_URL, {
        headers: { "X-Master-Key": API_URL } 
      });
      if (!response.ok) throw new Error("Failed to fetch remote data");
  
      const data = await response.json();
      const projects = data.record || [];
  
      // Save fetched projects to localStorage for future use
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  
      renderProjects(projects);
    } catch (error) {
      console.error("Error loading remote projects:", error);
      alert("Failed to load remote projects.");
    }
  }
  
  // Event Listeners for buttons
  document.getElementById("load-local").addEventListener("click", loadLocalProjects);
  document.getElementById("load-remote").addEventListener("click", loadRemoteProjects);
  
  // Store initial projects in localStorage if empty
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    const defaultProjects = [
        {
            "title": "2D-Portfolio",
            "description": "Created a mario-like web browser game used to showcase as a portfolio using kaboom.js a javascript library, sprites and vanilla html/css",
            "date": "July 2024 - Present",
            "skills": "Kaboom.js, vite, HTML, CSS, Tiled, Javascript",
            "link": "https://github.com/Borna1103/2D-Portfolio"
        },
        {
            "title": "BomberMan Remake in VRChat",
            "description": "Recreation of the old nintendo game Bomberman in VRChat through the VRCohort @ UCSD, Maveric Studios.",
            "date": "January 2025 - March 2025",
            "image": "images/BomberManVrChat.png",
            "skills": "Unity, C#, UdonSharp, VRChat SDK",
            "link": "https://vrchat.com/home/world/wrld_3b3b3b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b"
        },
        {
            "title": "Portfolio Website",
            "description": "Personal portfolio website created using node.js, HTML, CSS, tailwindcss, and Javascript",
            "date": "June 2024 - Present",
            "skills": "node.js, HTML, CSS, Javascript, tailwindcss",
            "link": "https://borna1103.github.io/Borna/"
        }
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProjects));
  }

  // Run the function when the DOM loads
  document.addEventListener("DOMContentLoaded", loadProjects);