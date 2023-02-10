// Select Elements
let searchInput = document.querySelector(".repos .search-bar input"),
  repoContainer = document.querySelector(".repos .repo-container"),
  searchBtn = document.querySelector(".search"),
  userName = '';

searchBtn.addEventListener("click", (e) => {
  userName = searchInput.value;

  getRepos(userName, e);
});

function getRepos(username, event) {
  if(searchInput.value === '') {
    event.preventDefault();
    repoContainer.innerHTML = '<span>Please Write at Input</span>';
  } else {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        repoContainer.innerHTML = '';

        repos.forEach(repo => {
          let repoName = repo.name,
            stars = repo.stargazers_count;

          createRepoBox(repoName, username, stars);
        });
      });
  }
}

function createRepoBox(repoName, username, stars) {
  let mainBox = document.createElement("div");
  mainBox.className = 'repo-box';

  let nameRepo = document.createElement("h3"),
    dataRepo = document.createTextNode(repoName);
  nameRepo.className = 'name-repo';
  nameRepo.appendChild(dataRepo);

  let divBtns = document.createElement("div"),
    starsBtn = document.createElement("span"),
    starsContent = document.createTextNode(`Stars ${stars}`);
  visitBtn = document.createElement("span"),
    visitLink = document.createElement("a");


  divBtns.className = 'btns';
  visitLink.setAttribute("target", "_blank");
  visitLink.href = `https://github.com/${username}/${repoName}`;
  visitLink.appendChild(document.createTextNode("Visit"));
  visitBtn.className = 'link';
  visitBtn.appendChild(visitLink);


  starsBtn.className = 'stars';
  starsBtn.appendChild(starsContent);

  divBtns.appendChild(starsBtn);
  divBtns.appendChild(visitBtn);

  mainBox.appendChild(nameRepo);
  mainBox.appendChild(divBtns);

  repoContainer.appendChild(mainBox);
}