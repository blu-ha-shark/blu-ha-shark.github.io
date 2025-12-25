// 載入模組化 HTML 部分的函數
async function loadPart(partName, targetElementId) {
    try {
        const response = await fetch(`js/parts/${partName}.html`);
        if (!response.ok) {
            throw new Error(`無法載入 ${partName}.html`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = html;

            // 如果載入的是 header，計算高度並設置 CSS 變數
            if (partName === "header") {
                // 使用多層延遲確保 DOM 和樣式完全渲染
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const headerElement =
                            targetElement.querySelector(".header");
                        if (headerElement) {
                            // 強制重新計算佈局
                            const headerHeight = headerElement.offsetHeight;
                            document.documentElement.style.setProperty(
                                "--header-height",
                                `${headerHeight}px`
                            );
                            console.log(`Header 高度已設置: ${headerHeight}px`);
                        } else {
                            console.warn("找不到 .header 元素");
                        }
                    });
                });
            }
        } else {
            console.error(`找不到目標元素: #${targetElementId}`);
        }
    } catch (error) {
        console.error(`載入 ${partName} 時發生錯誤:`, error);
    }
}

// 當 DOM 載入完成時，載入所有模組化部分
document.addEventListener("DOMContentLoaded", () => {
    loadPart("header", "header");
    loadPart("footer", "footer");
});
