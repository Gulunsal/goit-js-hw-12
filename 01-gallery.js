import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{S as y,a as g}from"./assets/vendor-CHbHyY-E.js";const m="46156340-afe2d6dd24e461f249d973066",u="https://pixabay.com/api/";let o=1,i="";const c=document.getElementById("gallery"),s=document.getElementById("load-more-btn"),l=document.getElementById("loader");let p=new y(".gallery-item");document.getElementById("search-form").addEventListener("submit",function(n){n.preventDefault();const t=document.getElementById("query").value.trim();t?(i=t,o=1,c.innerHTML="",s.style.display="none",d(t,o)):console.error("Lütfen bir arama terimi girin!")});async function d(n,t=1){const a=`${u}?key=${m}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${t}`;l.style.display="block";try{const r=await g.get(a);if(r.data.hits.length===0){console.error("Sorry, there are no images matching your search query. Please try again!"),l.style.display="none";return}h(r.data.hits);const e=r.data.totalHits;t*40<e?s.style.display="block":(s.style.display="none",alert("We're sorry, but you've reached the end of search results"))}catch(r){console.error("Görseller alınırken bir hata oluştu:",r)}finally{l.style.display="none"}}function h(n){const t=n.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <div class="image-card">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" />
          <div class="image-info">
            <p><strong>Beğeniler:</strong> ${e.likes}</p>
            <p><strong>Görüntüleme:</strong> ${e.views}</p>
            <p><strong>Yorumlar:</strong> ${e.comments}</p>
            <p><strong>İndirmeler:</strong> ${e.downloads}</p>
          </div>
        </div>
      </a>
    `).join("");c.insertAdjacentHTML("beforeend",t),p.refresh();const a=document.querySelector(".gallery-item"),{height:r}=a.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}s.addEventListener("click",()=>{o+=1,d(i,o)});
//# sourceMappingURL=01-gallery.js.map
