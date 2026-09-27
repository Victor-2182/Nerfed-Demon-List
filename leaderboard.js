fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    rankPlayers(data.players);
  })
  .catch(error => {
    console.error("Could not load data:", error);

    const leaderboard = document.querySelector("#leaderboard");

    if (leaderboard) {
      leaderboard.textContent = "Could not load the leaderboard.";
    }
  });

function rankPlayers(players) {
  const leaderboard = document.querySelector("#leaderboard");

  if (!leaderboard) {
    console.error("Could not find the #leaderboard element.");
    return;
  }

  const rankings = Object.entries(players)
    .sort(([, playerA], [, playerB]) => playerB.points - playerA.points);

  const fragment = document.createDocumentFragment();

  rankings.forEach(([playerId, player], index) => {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player-ranking";

    const rank = document.createElement("span");
    rank.textContent = `${index + 1}. `;

    const name = document.createElement("span");
    name.textContent = player.name || playerId;
    name.className = "player-name";

    name.addEventListener("click", () => {
      window.location.href =
        `playerInfo.html?id=${encodeURIComponent(playerId)}`;
    });

    const points = document.createElement("span");
    points.textContent = ` — ${player.points} points`;
    playerDiv.append(rank, name, points);
    fragment.appendChild(playerDiv);
  });

  leaderboard.replaceChildren(fragment);
}
