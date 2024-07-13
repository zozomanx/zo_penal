// Start with the window hidden
iframeContainer.style.display = 'none';

// If true show the penal code, if not hide it.
function OpenWindow(bool) {
    if (bool) {
        iframeContainer.style.display = 'flex';
    } else {
        iframeContainer.style.display = 'none';
    }
}

// URL to the published Google Sheets document
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAmbOF0_f_98DO1nQ2SgrIrvWDf4ikcjgRSM5chjpbiG_sQ9-l2SiMm8BncP_GmusaRt-kCnbhwLNi/pubhtml/sheet?headers=false&gid=1935585885";

// Set the iframe source
document.getElementById('googleSheetIframe').src = googleSheetUrl;

// Close button functionality
document.getElementById('closeButton').addEventListener('click', function() {
    const iframeContainer = document.getElementById('iframeContainer');
    CloseWindow()
    return
});

// Add event listener for the Esc key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const iframeContainer = document.getElementById('iframeContainer');
        CloseWindow()
    }
});

// Watch for "ui" event to enable the Penal Code to open
window.addEventListener('message', function(event) {
    var item = event.data;
    if (item.type === "ui") {
        if (item.status == true) {
            OpenWindow(true)
        } else {
            OpenWindow(false)
        }
    }
})

function CloseWindow() {
    iframeContainer.style.display = 'none'; // Hide the container
    $.post('https://zo_penal/close', JSON.stringify({})); // Send to LUA to release NUI focus
}