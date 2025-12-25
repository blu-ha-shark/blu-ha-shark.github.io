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
        // 請確保 header.html 和 footer.html 與引用此 script 的 HTML 檔案位於同一層目錄
        loadComponent("./parts/header.html", "header-container");
        loadComponent("./parts/footer.html", "footer-container");
    });
})();
