class ExperienceCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      const title = this.getAttribute("title") || "Untitled Work";
      const date = this.getAttribute("date") || "";
      const position = this.getAttribute("position") || "";
      const imgSrc = this.getAttribute("image");
      
  
      const imgElement = imgSrc 
        ? `<picture><img src="${imgSrc}" alt="${title}" onerror="this.src='images/placeholder.jpg'"></picture>` 
        : "";

      this.shadowRoot.innerHTML = `
        <style>
           
            .card {
                
                
                font-size: 1rem;
                
                
                width: 90%;
                h2{
                    font-size: 1rem;
                    color: rgb(244 244 245)
                }
                p{
                  font-size: 1rem;
                  color: rgb(161 161 170)
                }
                time {
                  font-size: 0.8rem;
                  color: rgb(113 113 122);
                }
            }
   
        </style>

        <div class="card">

          <h2>${title}</h2>
          <div style="display: flex; flex-direction: row; margin: auto; justify-content: space-between">
            <p>${position}</p>
            <time>${date}</time>
          </div>
          
    
        </div>
      `;
    }
  }
  
  // Define the custom element
  customElements.define("experience-card", ExperienceCard);