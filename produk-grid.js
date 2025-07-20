const feedUrl = "/feeds/posts/default?alt=json&max-results=20";

fetch(feedUrl)
  .then(res => res.json())
  .then(data => {
    const entries = data.feed.entry || [];
    const container = document.getElementById("product-grid");
    container.innerHTML = "";

    entries.forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;
      const content = entry.content.$t;
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      const img = imgMatch ? imgMatch[1] : "https://via.placeholder.com/300x300?text=No+Image";

      const waText = encodeURIComponent(`Halo, saya ingin beli produk: ${title}\n${link}`);
      const nomorWA = window.NOMOR_WA_TOKO || "6281234567890";
      const waLink = `https://wa.me/${nomorWA}?text=${waText}`;

      const item = `
        <div class="product-item">
          <a href="${link}" target="_blank"><img src="${img}" alt="${title}"/></a>
          <h3>${title}</h3>
          <a class="buy-btn" href="${waLink}" target="_blank">Beli via WA</a>
        </div>
      `;
      container.innerHTML += item;
    });
  })
  .catch(error => {
    console.error("Gagal memuat produk:", error);
    document.getElementById("product-grid").innerHTML = "<p>Gagal memuat produk.</p>";
  });
