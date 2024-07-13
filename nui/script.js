iframeContainer.style.display = 'none';

// If true show the penal code, if not hide it.
function display(bool) {
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
    iframeContainer.style.display = 'none'; // Hide the container
    $.post('https://zo_penal/close', JSON.stringify({})); // Send to LUA to release NUI focus
    return
});

// Watch for "ui" event to enable the Penal Code to open
window.addEventListener('message', function(event) {
    var item = event.data;
    if (item.type === "ui") {
        if (item.status == true) {
            display(true)
        } else {
            display(false)
        }
    }
})