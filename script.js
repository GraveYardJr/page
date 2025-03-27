document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.body.style.overflow = "auto";
    }, 2000);
});

function searchGames() {
    let input = document.getElementById("search").value.toLowerCase();
    let games = document.querySelectorAll(".game");

    games.forEach(game => {
        let text = game.textContent.toLowerCase();
        game.style.display = text.includes(input) ? "block" : "none";
    });
}
