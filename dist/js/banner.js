// Banner 自動輪播功能
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".banner__slide");
    const dots = document.querySelectorAll(".banner__dot");
    const prevBtn = document.querySelector(".banner__arrow--prev");
    const nextBtn = document.querySelector(".banner__arrow--next");
    const progressBar = document.querySelector(".banner__progress-bar");
    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideDuration = 10000; // 10 秒
    let autoSlideInterval;
    let progressAnimation;

    // 啟動進度條動畫
    function startProgress() {
        if (progressBar) {
            // 重置進度條
            progressBar.style.animation = "none";
            // 強制重排以重置動畫
            progressBar.offsetHeight;
            // 啟動新的動畫
            progressBar.style.animation = `bannerProgress ${slideDuration}ms linear`;
        }
    }

    // 停止進度條動畫
    function stopProgress() {
        if (progressBar) {
            progressBar.style.animation = "none";
        }
    }

    // 更新當前顯示的 slide 和 dot
    function updateSlide(index) {
        // 移除所有 active 類別
        slides.forEach((slide) =>
            slide.classList.remove("banner__slide--active")
        );
        dots.forEach((dot) => dot.classList.remove("banner__dot--active"));

        // 添加 active 類別到當前 slide 和 dot
        slides[index].classList.add("banner__slide--active");
        dots[index].classList.add("banner__dot--active");

        currentSlide = index;

        // 重置並啟動進度條
        stopProgress();
        startProgress();
    }

    // 切換到下一張
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        updateSlide(nextIndex);
    }

    // 切換到上一張
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(prevIndex);
    }

    // 切換到指定 slide
    function goToSlide(index) {
        updateSlide(index);
    }

    // 重置自動輪播計時器
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, slideDuration);
        // 重置進度條
        stopProgress();
        startProgress();
    }

    // 綁定箭頭按鈕事件
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    // 綁定圓點按鈕事件
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // 每 20 秒自動切換
    autoSlideInterval = setInterval(nextSlide, slideDuration);

    // 初始化進度條
    startProgress();
});
