(function () {
    // 載入 HTML 組件的函式
    function loadComponent(url, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`無法載入 ${url}: ${response.status}`);
                }
                return response.text();
            })
            .then((html) => {
                container.innerHTML = html;
            })
            .catch((error) => {
                console.error(`載入組件錯誤 ${url}:`, error);
            });
    }

    document.addEventListener("DOMContentLoaded", () => {
        // 載入同層級的 header.html 和 footer.html
        loadComponent("./header.html", "header");
        loadComponent("./footer.html", "footer");
    });
})();
