const menuBtn = document.querySelector(".navbar-toggler");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const galleryLightbox = document.querySelector("#galleryLightbox");
const galleryLightboxImage = galleryLightbox?.querySelector(".gallery-lightbox-image");
const galleryLightboxDownload = galleryLightbox?.querySelector(".gallery-lightbox-download");

function closeGalleryLightbox() {
    if (!galleryLightbox) {
        return;
    }

    galleryLightbox.hidden = true;
    document.body.classList.remove("gallery-lightbox-open");
}

document.querySelectorAll(".gallery-image-frame").forEach((frame) => {
    const image = frame.querySelector("img");
    const viewButton = frame.querySelector(".gallery-view-button");
    const downloadButton = frame.querySelector(".gallery-download-button");

    if (!image || !viewButton || !downloadButton) {
        return;
    }

    downloadButton.href = image.src;

    frame.addEventListener("touchstart", () => {
        document.querySelectorAll(".gallery-image-frame.is-touch-active").forEach((activeFrame) => {
            if (activeFrame !== frame) {
                activeFrame.classList.remove("is-touch-active");
            }
        });

        frame.classList.add("is-touch-active");
    }, { passive: true });

    viewButton.addEventListener("click", () => {
        if (!galleryLightbox || !galleryLightboxImage || !galleryLightboxDownload) {
            return;
        }

        galleryLightboxImage.src = image.src;
        galleryLightboxImage.alt = image.alt;
        galleryLightboxDownload.href = image.src;
        galleryLightbox.hidden = false;
        document.body.classList.add("gallery-lightbox-open");
        galleryLightbox.querySelector(".gallery-lightbox-close")?.focus();
    });
});

galleryLightbox?.querySelectorAll("[data-lightbox-close]").forEach((closeButton) => {
    closeButton.addEventListener("click", closeGalleryLightbox);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeGalleryLightbox();
    }
});