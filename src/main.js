// SimpleLightbox import ve başlatma
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Galeri için SimpleLightbox'u başlatıyoruz
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // Resim alt açıklamaları 'alt' etiketinden alınıyor
  captionDelay: 250,   // Açıklamalar 250ms sonra görünüyor
  animationSpeed: 300, // Animasyon hızı
});

// Form işlevselliği için yerel depolama ve form gönderme olayları
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Eğer form varsa, input ve submit olaylarını dinliyoruz
if (form) {
  form.addEventListener('input', throttle(onFormInput, 500));
  form.addEventListener('submit', onFormSubmit);

  // Sayfa yenilendiğinde yerel depodan form verilerini al ve alanlara yerleştir
  populateForm();
}

function onFormInput(evt) {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('Form gönderildi:', {
    email: form.elements.email.value,
    message: form.elements.message.value,
  });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}
