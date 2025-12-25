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
                // 如果是 header，初始化漢堡選單
                if (containerId === "header") {
                    initMobileMenu();
                }
            })
            .catch((error) => {
                console.error(`載入組件錯誤 ${url}:`, error);
            });
    }

    function initMobileMenu() {
        const header = document.querySelector(".header");
        if (!header) return;

        const container = header.querySelector(".header__container");
        const nav = header.querySelector(".header__nav");

        if (container && nav) {
            // 建立漢堡按鈕
            const toggleBtn = document.createElement("button");
            toggleBtn.className = "header__toggle";
            toggleBtn.ariaLabel = "開啟選單";
            toggleBtn.innerHTML = "<span></span><span></span><span></span>";

            // 將按鈕插入到導覽列之前
            container.insertBefore(toggleBtn, nav);

            // 綁定點擊事件
            toggleBtn.addEventListener("click", () => {
                const isExpanded =
                    toggleBtn.getAttribute("aria-expanded") === "true";
                toggleBtn.setAttribute("aria-expanded", !isExpanded);
                toggleBtn.classList.toggle("header__toggle--active");
                nav.classList.toggle("header__nav--open");
            });
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // 請確保 header.html 和 footer.html 與引用此 script 的 HTML 檔案位於同一層目錄
        loadComponent("./header.html", "header");
        loadComponent("./footer.html", "footer");
    });
})();
