const FullScreenReq = () => {
    const requestFullScreen = () => {
        let el = document.body;

        // Supports most browsers and their versions.
        let requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
            || el.mozRequestFullScreen || el.msRequestFullScreen;

        if (requestMethod) {

            // Native full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") {

            // Older IE.
            let wscript = new ActiveXObject("WScript.Shell");

            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
    requestFullScreen()
}