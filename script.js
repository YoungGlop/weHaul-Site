document.addEventListener("DOMContentLoaded", function () {
    const expandBtn = document.querySelector(".expand-btn");
    const expandContent = document.querySelector(".expand-content");

    expandBtn.addEventListener("click", function () {
        if (expandContent.style.display === "block") {
            expandContent.style.display = "none";
            expandBtn.textContent = "Read More";
        } else {
            expandContent.style.display = "block";
            expandBtn.textContent = "Read Less";
        }
    });
});
