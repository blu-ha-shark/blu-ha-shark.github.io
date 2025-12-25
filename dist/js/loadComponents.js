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
                // 如果是 header，執行初始化 (計算高度、漢堡選單)
                if (containerId === "header") {
                    initHeader();
                }
            })
            .catch((error) => {
                console.error(`載入組件錯誤 ${url}:`, error);
            });
    }

    function initHeader() {
        const header = document.querySelector(".header");
        if (!header) return;

        // 1. 計算 Header 高度 (用於 spacer，避免內容被遮擋)
        const updateHeight = () => {
            const height = header.offsetHeight;
            document.documentElement.style.setProperty(
                "--header-height",
                `${height}px`
            );
        };
        // 確保樣式套用後再計算
        requestAnimationFrame(() => requestAnimationFrame(updateHeight));
        window.addEventListener("resize", updateHeight);

        // 2. 初始化漢堡選單
        const container = header.querySelector(".header__container");
        const nav = header.querySelector(".header__nav");

        if (container && nav && !container.querySelector(".header__toggle")) {
            const toggleBtn = document.createElement("button");
            toggleBtn.className = "header__toggle";
            toggleBtn.ariaLabel = "開啟選單";
            toggleBtn.innerHTML = "<span></span><span></span><span></span>";

            container.insertBefore(toggleBtn, nav);

            toggleBtn.addEventListener("click", () => {
                toggleBtn.classList.toggle("header__toggle--active");
                nav.classList.toggle("header__nav--open");
            });
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // 修正路徑：指向 dist/js/parts/ 下的檔案
        loadComponent("dist/js/parts/header.html", "header");
        loadComponent("dist/js/parts/footer.html", "footer");
    });
})();
