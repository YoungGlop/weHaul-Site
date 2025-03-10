document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("dynamic-gallery");
    let imageIndex = 1;
    let maxTries = 5;

    function loadImages(missingCount = 0) {
        if (missingCount >= maxTries) {
            if (imageIndex === 1) {
                gallery.innerHTML = "<p>No before-and-after images found.</p>";
            }
            return;
        }

        const beforePath = `images/before${imageIndex}.jpg`;
        const afterPath = `images/after${imageIndex}.jpg`;

        let beforeImg = new Image();
        let afterImg = new Image();
        let loadedImages = 0;

        function checkIfDone() {
            if (loadedImages === 2) {
                let imgPair = document.createElement("div");
                imgPair.classList.add("gallery-pair");

                imgPair.innerHTML = `
                    <div class="gallery-item">
                        <img src="${beforePath}" onclick="openLightbox('${beforePath}')">
                    </div>
                    <div class="gallery-item">
                        <img src="${afterPath}" onclick="openLightbox('${afterPath}')">
                    </div>
                `;
                gallery.appendChild(imgPair);
                imageIndex++;
                loadImages(0);
            }
        }

        beforeImg.onload = function () {
            loadedImages++;
            checkIfDone();
        };
        beforeImg.onerror = function () {
            loadImages(missingCount + 1);
        };

        afterImg.onload = function () {
            loadedImages++;
            checkIfDone();
        };
        afterImg.onerror = function () {
            loadImages(missingCount + 1);
        };

        beforeImg.src = beforePath;
        afterImg.src = afterPath;
    }

    loadImages();

    // Expand/Collapse Content Sections
    const expandBtn = document.querySelector(".expand-btn");
    const expandContent = document.querySelector(".expand-content");
    if (expandBtn && expandContent) {
        expandBtn.addEventListener("click", function () {
            if (expandContent.style.display === "block") {
                expandContent.style.display = "none";
                expandBtn.textContent = "Read More";
            } else {
                expandContent.style.display = "block";
                expandBtn.textContent = "Read Less";
            }
        });
    }

    // Smooth Scrolling for Navigation Links (if you have a nav)
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Insert the lightbox HTML
    document.body.insertAdjacentHTML('beforeend', `
        <div id="lightbox" class="lightbox">
            <span class="close" onclick="closeLightbox()">&times;</span>
            <img id="lightbox-img" src="">
        </div>
    `);

    // Add a click listener to close when clicking outside the image
    const lightbox = document.getElementById("lightbox");
    lightbox.addEventListener("click", function(e) {
        // If the user clicked the background (not the image or close button), close
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});

// Open Lightbox
function openLightbox(imageSrc) {
    document.getElementById("lightbox-img").src = imageSrc;
    document.getElementById("lightbox").style.display = "flex";
}

// Close Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
