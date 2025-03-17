class ProjectCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      const title = this.getAttribute("title") || "Untitled Project";
      const date = this.getAttribute("date") || "";
      const skills = this.getAttribute("skills") || "";
      const imgSrc = this.getAttribute("image");
      const description = this.getAttribute("description") || "No description available.";
      const link = this.getAttribute("link") || "#";
  
      const imgElement = imgSrc 
        ? `<picture><img src="${imgSrc}" alt="${title}" onerror="this.src='images/placeholder.jpg'"></picture>` 
        : "";

      this.shadowRoot.innerHTML = `
        <style>
           
            .card {
                transition: transform 0.2s ease-in-out;
             
                font-size: 1rem;
                padding: 1rem;
                text-align: center;
                margin: 1rem auto 1rem auto;
                width: 90%;
                border-radius: 12px;
            }

            .card:hover {
                background-color: var(--secondary-project-color);
                transform: scale(1.1);
                opacity: 0.9;
            }    
        </style>

        <div class="card">

          <h2>${title}</h2>
          <time>${date}</time>
          <p>${skills}</p>
          ${imgElement}
          
          <p>${description}</p>
          <a href="${link}" target="_blank">Read More</a>
        </div>
      `;
    }
  }
  
  // Define the custom element
  customElements.define("project-card", ProjectCard);