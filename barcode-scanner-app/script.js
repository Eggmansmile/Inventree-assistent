// Reference to the scanner instance
let html5QrcodeScanner = null;
let hasScanned = false; // Prevent multiple scans

// Start the barcode/QR code scanner
function startScanner() {
    hasScanned = false; // Reset scan state
    // If the scanner hasn't been created yet, create it
    if (!html5QrcodeScanner) {
        html5QrcodeScanner = new Html5Qrcode("reader");
    }
    // Start the camera and begin scanning
    html5QrcodeScanner.start(
        { facingMode: "environment" }, // Use the back camera if available
        {
            fps: 15,      // Frames per second for scanning
            qrbox: 600   // Size of the scanning box (in pixels)
        },
        // Callback when a code is successfully scanned
        (decodedText, decodedResult) => {
            console.log("Scanned:", decodedText);
            if (!hasScanned && decodedText) {
                hasScanned = true;
                document.getElementById("result").innerText = `Scanned: ${decodedText}`;
                logToTerminal(`Scanned: ${decodedText}`);
                stopScanner(); // Stop after first successful scan
            }
        },
    ).catch(err => {
        // Handle errors (e.g., camera not accessible)
        document.getElementById("result").innerText = `Error: ${err}`;
    });
}

// Stop the scanner and release the camera
function stopScanner() {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.stop().then(() => {
            document.getElementById("result").innerText += "\nScanner stopped.";
        }).catch(err => {
            document.getElementById("result").innerText = `Error: ${err}`;
        });
    }
}

//ping website for debugging
function pingwebsite() {
    fetch('http://inventree.localhost/')
        .then(() => {
            document.getElementById('reply').innerText = 'reply';
            logToTerminal("reply")
        })
        .catch(() => {
            document.getElementById('reply').innerText = 'timeout/error';
        });
        setTimeout(() => {
            logToTerminal(document.getElementById('reply').innerText);
        }, 4000); // Small delay to allow the DOM to update

}
