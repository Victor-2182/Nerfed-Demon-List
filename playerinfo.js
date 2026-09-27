const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get("id");

if (!playerId) {
  console.error("No player ID was provided.");
} else {
  fetch("data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      const player = data.players[playerId];

      if (!player) {
        throw new Error(`Player not found: ${playerId}`);
      }

      console.log("Selected player:", player);

      document.querySelector("#player-name").textContent =
        player.name + ":" || playerId + ":";

      document.querySelector("#player-points").textContent = `${player.points} points`;
      document.querySelector('#player-completions').textContent = `Completed:${player.completions}`
      document.querySelector('#player-points').style.fontSize = 30 + 'px'
      document.querySelector('#player-completions').style.fontSize = 40 + 'px'
      document.querySelector('#player-points').style.fontWeight = 'bold'
      document.querySelector('#player-completions').style.fontWeight = 'bold'
    })
    .catch(error => {
      console.error("Could not load player data:", error);
    });
}
