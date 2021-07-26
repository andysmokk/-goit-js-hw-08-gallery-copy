import galleryItems from './app.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImagRef = document.querySelector('.lightbox__image');
const btnClsRef = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

const imgSetMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(images) {
  return images.map(({preview, original, description}) => {
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
</li>`;
  }).join('');
};

galleryRef.insertAdjacentHTML('beforeend', imgSetMarkup);

galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return; 
  };

  lightboxRef.classList.add('is-open');
  lightboxImagRef.src = e.target.dataset.source;
  // lightboxImagRef.alt = e.target.alt;

  document.body.style.cssText = `height: 100%; width: 100%; position: fixed; overflow: hidden;`

  window.addEventListener('keydown', OnClsModalPressEsc);
  window.addEventListener('keyup', onPressKeyArrow);
};

btnClsRef.addEventListener('click', onClsModalBtn);

function onClsModalBtn() {
  lightboxRef.classList.remove('is-open');
  lightboxImagRef.src = '';
  
  document.body.style.cssText -= `height: 100%; width: 100%; position: fixed; overflow: hidden;`

  window.removeEventListener('keydown', OnClsModalPressEsc);
  window.removeEventListener('keyup', onPressKeyArrow)
};

overlayRef.addEventListener('click', OnClsModalPressKey);

function OnClsModalPressKey(e) {
  if (e.target === e.currentTarget) {
    onClsModalBtn()
  };
};

function OnClsModalPressEsc(e) {
  if (e.code === 'Escape') {
    onClsModalBtn()
  };
};

const arrImg = galleryItems.map(el => el.original);

function onPressKeyArrow(e) {
  const currentImgIdx = arrImg.indexOf(lightboxImagRef.src);
  if (e.code === 'ArrowRight' && currentImgIdx < galleryItems.length - 1) {
    lightboxImagRef.src = galleryItems[currentImgIdx + 1].original;
  } else if (e.code === 'ArrowLeft' && currentImgIdx > 0) {
    lightboxImagRef.src = galleryItems[currentImgIdx - 1].original;
  };
};