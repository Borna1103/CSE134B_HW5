
const LOCAL_STORAGE_EXPERIENCE_KEY = "work";

const EXPERIENCE_BIN_URL = "https://api.jsonbin.io/v3/b/67d7979d8960c979a5730414"


async function renderExperience(experience) {
    const experienceContainer = document.getElementById("experience");
    experienceContainer.innerHTML = ""; // Clear existing cards
  

    console.log(experience)
    const title = document.createElement("h2");
    title.textContent = "Experience";
    experienceContainer.appendChild(title);
    // Render Experience cards
    experience.forEach((experience) => {
      const card = document.createElement("experience-card");
      
      card.setAttribute("title", experience.title);
      card.setAttribute("position", experience.position);
      card.setAttribute("date", experience.date);
      
      experienceContainer.appendChild(card);
    });
  }

  function loadLocalExperience() {
  
    const storedExperience = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EXPERIENCE_KEY)) || [];
    if (storedExperience.length === 0) {
      alert("No local experience found!");
    }
    
    renderExperience(storedExperience);
  }
  
  // Load experience from remote JSONBin API
  async function loadRemoteExperience() {
    try {
      const response = await fetch(EXPERIENCE_BIN_URL, {
        method: "GET",
        headers: { "X-Access-Key": API_KEY } 
      });
      if (!response.ok) throw new Error("Failed to fetch remote data");
  
      const data = await response.json();
      const experience = data.record || [];
  
      // Save fetched experience to localStorage for future use
      localStorage.setItem(LOCAL_STORAGE_EXPERIENCE_KEY, JSON.stringify(experience));
  
      renderExperience(experience);
    } catch (error) {
      console.error("Error loading remote experience:", error);
      alert("Failed to load remote experience.");
    }
  }
  
  // Event Listeners for buttons
  document.getElementById("load-local").addEventListener("click", loadLocalExperience);
  document.getElementById("load-remote").addEventListener("click", loadRemoteExperience);
  
  if (!localStorage.getItem(LOCAL_STORAGE_EXPERIENCE_KEY)) {
    fetch("work.json")  // Load from local JSON file on first run
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(LOCAL_STORAGE_EXPERIENCE_KEY, JSON.stringify(data));
           
        })
        .catch(error => console.error("Error loading local JSON:", error));
  }
      