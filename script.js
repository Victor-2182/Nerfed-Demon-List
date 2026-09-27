const leaderboardBTN = document.getElementById('leaderboard-btn')
leaderboardBTN.onclick = function(){
  window.location.href = "leaderboard.html"
}
fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {

    Object.values(data.levels).forEach(level => {
      makeNewLevel(level.name, level.img, level.points, level.uploadedBy, level.id);
    });
  })
  .catch(error => {
    console.error("Could not load data:", error);
  });

function makeNewLevel(name, imgName, points, uploadedBy, id) {
  const levelDiv = document.createElement("div");
  levelDiv.className = "level-div";

  const titleRow = document.createElement("div");
  titleRow.className = "title-row";

  const newImg = document.createElement("img");
  newImg.className = "level-img";
  newImg.src = imgName;
  newImg.alt = name;

  const levelName = document.createElement("h1");
  levelName.className = "level-name";
  levelName.textContent = name;

  const levelPoints = document.createElement("span");
  levelPoints.className = "points";
  levelPoints.textContent = `${points} Points`;
  
  const uploadedByElement = document.createElement("span");
  uploadedByElement.className = "uploadedBy";
  uploadedByElement.textContent = `Uploaded by: ${uploadedBy}`;

  const idElement = document.createElement("span");
  idElement.className = "id";
  idElement.textContent = `ID: ${id}`;

  titleRow.appendChild(newImg);
  titleRow.appendChild(levelName);

  levelDiv.appendChild(titleRow);
  levelDiv.appendChild(levelPoints);
  levelDiv.appendChild(uploadedByElement);
  levelDiv.appendChild(idElement);

  document.body.appendChild(levelDiv);
}

