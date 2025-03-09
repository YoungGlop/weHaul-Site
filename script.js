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

    // Smooth scrolling
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
