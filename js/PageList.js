const PageList = (argument = '') => {
  let end = 9;
  const preparePage = () => {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const showMoreButton = document.getElementById('showMore');

    const addCardEventListeners = () => {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const cardContent = card.querySelector('.card-content');
        const cardHoverContent = card.querySelector('.card-hover-content');
  
        card.addEventListener('mouseenter', () => {
          cardContent.style.display = 'none';
          cardHoverContent.style.display = 'block';
        });
  
        card.addEventListener('mouseleave', () => {
          cardContent.style.display = 'block';
          cardHoverContent.style.display = 'none';
        });
      });
    };

    const displayResults = (articles) => {
      const selectedPlatform = document.getElementById('platformFilter').value;
      const filteredArticles = selectedPlatform
        ? articles.filter(article => article.platforms.some(platform => platform.platform.name === selectedPlatform))
        : articles;
    
      filteredArticles.sort((a, b) => new Date(b.released) - new Date(a.released));
      const resultsContent = articles.slice(0, end).map((article) => {
        const platforms = article.platforms.map((platform) => platform.platform.name).join(', ');
        const releaseDate = new Date(article.released).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return (
          `<article class="carte card game-card col-4 rounded">
          <div class="card-content card-body">
            <img class="card-img" src="${article.background_image}" alt="${article.name}" style="height: 300px; object-fit: cover;">
            <h3 class="mt-2 card-title text-white"><strong>${article.name}</strong></h3>
            <p class="text-white">Plateformes: ${platforms}</p>
          </div>
          <div class="card-hover-content" style="display:none;">
            <h2 class="mt-2 text-white">${releaseDate}</h2>
            <p class="text-white">Éditeur: ${article.publisher || 'N/A'}</p>
            <p class="text-white">Genres: ${article.genres.map(genre => genre.name).join(', ') || 'N/A'}</p>
            <p class="text-white">Note: ${article.rating || 'N/A'}</p>
            <p class="text-white">Nombre de votes: ${article.ratings_count || 0}</p>
            <a href="#pagedetail/${article.id}">En savoir plus</a>
          </div>
        </article>`
        );
      });

      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");

      addCardEventListeners();

      if (end < articles.length) {
        showMoreButton.style.display = 'flex';
      } else {
        showMoreButton.style.display = 'none';
      }
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };
    
    const platformFilter = document.getElementById('platformFilter');
    platformFilter.addEventListener('change', () => {
      fetchList(url, cleanedArgument); 
    });    

    fetchList(url, cleanedArgument);

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        fetchList(url, searchTerm);
      } else {
        alert("Votre recherche est vide...");
      }
    });

    showMoreButton.addEventListener('click', () => {
      end += 9;
      fetchList(url, cleanedArgument);
    });
  };

  const render = () => {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
    <section class="page-list row">
      <div class="articles row justify-content-center justify-items-center">Loading...</div>
      <div class="see-more d-flex justify-content-center">
        <button type="button" id="showMore" class="btn-danger" style="display:none">Show more</button>
      </div>
    </section>  
    `;

    const presentation = document.getElementById('presentation');
    presentation.innerHTML = `
    <div class="welcome">
      <h2 class="subtitle mb-4">Welcome,</h2>
      <p class="text">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
    </div>
    `;

    const platformsSearch = document.getElementById('platformsSearch');
    platformsSearch.innerHTML = `
    <div class="filter-container">
      <select class="filtre" id="platformFilter">
        <option value="">Platform: any ⭥</option>
        <option value="PC">Platform: PC</option>
        <option value="PlayStation">Platform: PlayStation</option>
        <option value="Xbox">Platform: Xbox</option>
        <option value="Nintendo Switch">Platform: Nintendo Switch</option>
        <option value="PlayStation">Platform: PlayStation</option>
        <option value="PlayStation">Platform: PlayStation</option>
      </select>
    </div>
    `;

    preparePage();
  };

  render();
};
