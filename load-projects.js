
const LOCAL_STORAGE_KEY = "projects";
const API_KEY = "$2a$10$0e/HT1t9TmqhiS96lTeZn.pq3aSD3R0ZBoFnNi6nwuH85b3ie.F5.";
const BIN_URL = "https://api.jsonbin.io/v3/b/67d77bba8960c979a572f854"


async function renderProjects(projects) {
    const projectContainer = document.getElementById("projects");
    projectContainer.innerHTML = ""; // Clear existing cards
  


    const title = document.createElement("h2");
    title.textContent = "Projects";
    projectContainer.appendChild(title);
    // Render project cards
    projects.forEach((project) => {
      const card = document.createElement("project-card");
      
      card.setAttribute("title", project.title);
      card.setAttribute("imgSrc", project.image);
      card.setAttribute("description", project.description);
      card.setAttribute("skills", project.skills);
      card.setAttribute("date", project.date);
      card.setAttribute("link", project.link);
      projectContainer.appendChild(card);
    });
  }

  function loadLocalProjects() {
  
    const storedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (storedProjects.length === 0) {
      alert("No local projects found!");
    }
    
    renderProjects(storedProjects);
  }
  
  // Load projects from remote JSONBin API
  async function loadRemoteProjects() {
    try {
      const response = await fetch(BIN_URL, {
        method: "GET",
        headers: { "X-Access-Key": API_KEY } 
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
  
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    fetch("projects.json")  // Load from local JSON file on first run
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
           
        })
        .catch(error => console.error("Error loading local JSON:", error));
  }
      