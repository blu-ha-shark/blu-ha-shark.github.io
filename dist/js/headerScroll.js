// Header 滾動隱藏/顯示功能
(function () {
    let lastScrollTop = 0;
    let ticking = false;
    const scrollThreshold = 10; // 滾動閾值，避免微小滾動觸發

    function handleScroll() {
        const currentScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        const headerElement = document.querySelector(".header");

        if (!headerElement) {
            return;
        }

        // 如果接近頂部，始終顯示 header
        if (currentScrollTop < scrollThreshold) {
            headerElement.classList.remove("header--hidden");
            lastScrollTop = currentScrollTop;
            ticking = false;
            return;
        }

        // 判斷滾動方向
        if (Math.abs(currentScrollTop - lastScrollTop) < scrollThreshold) {
            ticking = false;
            return;
        }

        if (currentScrollTop > lastScrollTop) {
            // 向下滾動 - 隱藏 header
            headerElement.classList.add("header--hidden");
        } else {
            // 向上滾動 - 顯示 header
            headerElement.classList.remove("header--hidden");
        }

        lastScrollTop = currentScrollTop;
        ticking = false;
    }

    // 使用 requestAnimationFrame 優化滾動性能
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }

    // 等待 header 載入完成後再綁定滾動事件
    function initHeaderScroll() {
        const headerElement = document.querySelector(".header");
        if (headerElement) {
            window.addEventListener("scroll", onScroll, { passive: true });
        } else {
            // 如果 header 還沒載入，等待一段時間後重試
            setTimeout(initHeaderScroll, 100);
        }
    }

    // DOM 載入完成後初始化
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHeaderScroll);
    } else {
        initHeaderScroll();
    }
})();

