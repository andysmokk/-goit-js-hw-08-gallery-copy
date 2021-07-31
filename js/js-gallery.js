import galleryItems from './app.js';

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imgModalRef = document.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(images) {
  return images.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  }).join('');
};

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

galleryRef.addEventListener('click', onOpenClickModal);
function onOpenClickModal(e) {
  e.preventDefault();
  
  // if (!e.target.classList.contains('gallery__image')) {
    //   return;
    // };
    if (e.target.nodeName !== 'IMG') {
      return;
    };
  
  modalRef.classList.add('is-open');
  imgModalRef.src = e.target.dataset.source;
  imgModalRef.alt = e.target.alt;

  document.body.style.cssText += `height:100%; width:100%; overflow:hidden; position:fixed;`

  window.addEventListener('keydown', onCloseModalPressEsc);
  window.addEventListener('keydown', onCloseModalPressArrow);

};
  
function onCloseModalPressEsc(e) {
  const PRESS_KEY_ESCAPE = 'Escape';
  if (e.code === PRESS_KEY_ESCAPE) {
    onCloseClickModal();
  };
};

  btnCloseModal.addEventListener('click', onCloseClickModal);
  function onCloseClickModal() {
    modalRef.classList.remove('is-open');
    imgModalRef.src = '';
    imgModalRef.alt = '';

    document.body.style.cssText -= `height:100%; width:100%; overflow:hidden; position:fixed;`

    window.removeEventListener('keydown', onCloseModalPressEsc);
    window.removeEventListener('keydown', onCloseModalPressArrow);
};
  
overlayRef.addEventListener('click', onCloseClickOverlay);
function onCloseClickOverlay(e) {
  if (e.target === e.currentTarget) {
    onCloseClickModal();
  };
};

const arrayImg = galleryItems.map(image => image.original);
function onCloseModalPressArrow(e) {
  const currentImgIdx = arrayImg.indexOf(imgModalRef.src);  
  if (e.code === 'ArrowRight' && currentImgIdx < galleryItems.length - 1) {
    imgModalRef.src = galleryItems[currentImgIdx + 1].original;
  } else if (e.code === 'ArrowLeft' && currentImgIdx > 0) {
    imgModalRef.src = galleryItems[currentImgIdx - 1].original;
  };
};