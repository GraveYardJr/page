let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
let gameClicks = JSON.parse(localStorage.getItem('gameClicks')) || {};
const logs = JSON.parse(localStorage.getItem('logs')) || [];

// Increment visit count on page load
visitCount++;
localStorage.setItem('visitCount', visitCount);

// Track game clicks
function trackClick(game) {
    if (!gameClicks[game]) {
        gameClicks[game] = 0;
    }
    gameClicks[game]++;
    localStorage.setItem('gameClicks', JSON.stringify(gameClicks));

    // Log click
    logs.push({ game, timestamp: new Date().toISOString() });
    localStorage.setItem('logs', JSON.stringify(logs));
}

// Show loading screen for 2 seconds
setTimeout(() => {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}, 2000);

// Admin panel access
function showAdminPanel() {
    const password = prompt("Enter Admin Password:");
    if (password === "FUCK SCHOOL") {
        document.getElementById('adminPanel').style.display = 'block';
        updateAdminPanel();
    } else {
        alert("Incorrect password");
    }
}

// Update the Admin Panel with visit stats
function updateAdminPanel() {
    document.getElementById('totalVisits').textContent = visitCount;
    const mostClickedGame = Object.keys(gameClicks).reduce((a, b) => gameClicks[a] > gameClicks[b] ? a : b, '');
    document.getElementById('mostClickedGame').textContent = mostClickedGame || 'None';

    // Display logs
    const logsList = document.getElementById('logs');
    logsList.innerHTML = '';
    logs.forEach(log => {
        const listItem = document.createElement('li');
        listItem.textContent = `${log.game} - ${log.timestamp}`;
        logsList.appendChild(listItem);
    });
}

// Reset counter
function resetCounter() {
    localStorage.setItem('visitCount', 0);
    visitCount = 0;
    updateAdminPanel();
}

// Reset logs
function resetLogs() {
    localStorage.setItem('logs', JSON.stringify([]));
    logs.length = 0;
    updateAdminPanel();
}
