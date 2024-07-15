// Ensure the iframeContainer is initially hidden
CloseWindow()

// Function to show or hide the iframeContainer
function OpenWindow(bool) {
    document.getElementById('iframeContainer').style.display = bool ? 'flex' : 'none';
}
// Function to close the iframeContainer
function CloseWindow() {
    document.getElementById('iframeContainer').style.display = 'none';

    $.post('https://zo_penal/close', JSON.stringify({})); // Send to LUA to release NUI focus
}

// URL to the published Google Sheets document
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAmbOF0_f_98DO1nQ2SgrIrvWDf4ikcjgRSM5chjpbiG_sQ9-l2SiMm8BncP_GmusaRt-kCnbhwLNi/pubhtml/sheet?headers=false&gid=1935585885";

// Set the iframe source
document.getElementById('googleSheetIframe').src = googleSheetUrl;

// Close button functionality
document.getElementById('closeButton').addEventListener('click', function() {
    CloseWindow();
});

// Add event listener for the Esc key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        CloseWindow();
    }
});

// Watch for "ui" event to enable the Penal Code to open
window.addEventListener('message', function(event) {
    var item = event.data;
    if (item.type === "ui") {
        OpenWindow(item.status);
    }
});