(function () {
    // 載入 HTML 組件的函式
    function loadComponent(url, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to load ${url}: ${response.status}`
                    );
                }
                return response.text();
            })
            .then((html) => {
                container.innerHTML = html;
            })
            .catch((error) => {
                console.error(`Error loading component from ${url}:`, error);
            });
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadComponent("./header.html", "header-container");
        loadComponent("./footer.html", "footer-container");
    });
})();
