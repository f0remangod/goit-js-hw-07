import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainerRef = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainerRef.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainerRef.addEventListener("click", onGallaryItemClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
       <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
     </a>
    </div>`;
    })
    .join("");
}

function onGallaryItemClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
        <img src="${e.target.dataset.source}">
`,
    {
      onShow: () => {
        window.addEventListener("keydown", onKeyPress);
      },
      onClose: () => {
        window.removeEventListener("keydown", onKeyPress);
      },
    }
  );

  instance.show();

  function onKeyPress(e) {
    console.log(e.code);
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
