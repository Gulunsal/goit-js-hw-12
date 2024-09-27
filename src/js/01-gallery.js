import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '46156340-afe2d6dd24e461f249d973066';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
let currentQuery = '';

const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more-btn');
const loader = document.getElementById('loader'); // Loader'ı al

// SimpleLightbox başlat
let lightbox = new SimpleLightbox('.gallery-item');

// Form submit event listener
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const query = document.getElementById('query').value.trim();

  if (query) {
    currentQuery = query;
    currentPage = 1; // Yeni arama için sayfa numarasını sıfırla
    gallery.innerHTML = ''; // Önceki sonuçları temizle
    loadMoreButton.style.display = 'none'; // Yeni arama sırasında gizle
    fetchImages(query, currentPage);
  } else {
    console.error("Lütfen bir arama terimi girin!");
  }
});

// API'den veri alma işlemi (axios ile)
async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  loader.style.display = 'block'; // Loader'ı göster

  try {
    const response = await axios.get(url);
    if (response.data.hits.length === 0) {
      console.error("Sorry, there are no images matching your search query. Please try again!");
      loader.style.display = 'none'; // Loader'ı gizle
      return;
    }

    displayImages(response.data.hits);

    // Toplam sonuç sayısını kontrol et
    const totalHits = response.data.totalHits;
    const currentDisplayedHits = page * 40; // Şu ana kadar gösterilen sonuçlar (her sayfa 40 sonuç)

    // Daha fazla sonuç varsa "Load More" düğmesini göster
    if (currentDisplayedHits < totalHits) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
      alert("We're sorry, but you've reached the end of search results");
    }

  } catch (error) {
    console.error("Görseller alınırken bir hata oluştu:", error);
  } finally {
    loader.style.display = 'none'; // İş tamamlandığında loader'ı gizle
  }
}

// Görselleri sayfada gösterme işlemi
function displayImages(images) {
  const galleryItems = images.map(image => {
    return `
      <a href="${image.largeImageURL}" class="gallery-item">
        <div class="image-card">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
          <div class="image-info">
            <p><strong>Beğeniler:</strong> ${image.likes}</p>
            <p><strong>Görüntüleme:</strong> ${image.views}</p>
            <p><strong>Yorumlar:</strong> ${image.comments}</p>
            <p><strong>İndirmeler:</strong> ${image.downloads}</p>
          </div>
        </div>
      </a>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', galleryItems); // Yeni sonuçları ekle
  lightbox.refresh(); // SimpleLightbox'ı güncelle ve yeni öğeleri tanı

  // Sayfa kaydırma işlemi (2 kart yüksekliğinde)
  const galleryCard = document.querySelector('.gallery-item');
  const { height: cardHeight } = galleryCard.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth'
  });
}

// Load More event listener
loadMoreButton.addEventListener('click', () => {
  currentPage += 1;
  fetchImages(currentQuery, currentPage);
});

