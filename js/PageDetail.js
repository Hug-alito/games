const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const {
        name,
        released,
        description,
        developers,
        tags,
        genres,
        publishers,
        platforms,
        website,
        metacritic,
        ratings_count,
        background_image,
        video,
        screenshots,
        stores,
      } = gameData;

      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;

      articleDOM.querySelector("img").src = background_image;
      articleDOM.querySelector("img").alt = name;

      articleDOM.querySelector("p.description").innerHTML = description;

      articleDOM.querySelector("p.release-date span").innerHTML = released;

      const devLinks = developers.map(dev => `<a href="#pagelist/${dev.slug}">${dev.name}</a>`);
      articleDOM.querySelector("p.developers").innerHTML = `Developers: ${devLinks.join(', ')}`;

      const tagLinks = tags.map(tag => `<a href="#pagelist/${tag.slug}">${tag.name}</a>`);
      articleDOM.querySelector("p.tags").innerHTML = `Tags: ${tagLinks.join(', ')}`;

      const genreLinks = genres.map(genre => `<a href="#pagelist/${genre.slug}">${genre.name}</a>`);
      articleDOM.querySelector("p.genres").innerHTML = `Genres: ${genreLinks.join(', ')}`;

      const publisherLinks = publishers.map(pub => `<a href="#pagelist/${pub.slug}">${pub.name}</a>`);
      articleDOM.querySelector("p.publishers").innerHTML = `Publishers: ${publisherLinks.join(', ')}`;

      const platformLinks = platforms.map(platform => `<a href="#pagelist/${platform.platform.name}">${platform.platform.name}</a>`);
      articleDOM.querySelector("p.platforms").innerHTML = `Platforms: ${platformLinks.join(', ')}`;

      articleDOM.querySelector("a.website").href = website;

      articleDOM.querySelector("video").src = video;

      articleDOM.querySelector("p.metacritic").innerHTML = `Metacritic Score: ${metacritic}`;
      articleDOM.querySelector("p.ratings-count").innerHTML = `Number of Ratings: ${ratings_count}`;

      const screenshotDiv = articleDOM.querySelector(".screenshots");
      const screenshotImages = screenshots.slice(0, 4).map(screenshot => `<img src="${screenshot.image}" alt="${name} Screenshot" />`);
      screenshotDiv.innerHTML = screenshotImages.join("");

      const storeLinks = stores.map(store => `<a href="${store.url}" target="_blank">${store.store.name}</a>`);
      articleDOM.querySelector(".stores").innerHTML = `Buy the game: ${storeLinks.join(" | ")}`;
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title"></h1>
          <img src="" alt="">
          <p class="release-date">Release date: <span></span></p>
          <p class="description"></p>
          <p class="developers"></p>
          <p class="tags"></p>
          <p class="genres"></p>
          <p class="publishers"></p>
          <p class="platforms"></p>
          <a class="website" href="" target="_blank">Visit Website</a>
          <video controls></video>
          <p class="metacritic"></p>
          <p class="ratings-count"></p>
          <div class="screenshots"></div>
          <p class="stores"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
