# One More Pet — tanıtım ve devlog sitesi

GitHub Pages ile yayınlanan statik site (Jekyll). Adres: https://lykiars.github.io/one-more-pet/

## Yeni devlog ekleme

1. `_posts/` klasörüne `YYYY-AA-GG-kisa-ad.md` adlı bir dosya ekle (ör. `_posts/2026-10-04-devlog-2.md`).
2. Dosyanın başına şunu yaz:

   ```
   ---
   layout: post
   title: "Devlog #6 — Başlık"
   date: 2026-10-04 09:00:00 +0300
   image: /assets/devlog/kapak.png
   image_alt: "Görselin kısa açıklaması"
   image_caption: "İsteğe bağlı alt yazı"
   ---
   ```

   `image` alanları isteğe bağlıdır; verilirse yazının başında ve devlog listesinde kapak olarak görünür. Saati geçmiş bir tarih seç: GitHub Pages ileri tarihli yazıları yayınlamaz.

3. Altına yazıyı Markdown ile yaz. İlk paragraf devlog listesinde özet olarak görünür.
4. Commit ve push et; GitHub Pages siteyi 1–2 dakikada yeniden kurar.

Görsel eklemek için dosyayı `assets/devlog/` altına koy ve yazıda `![Açıklama]({{ '/assets/devlog/dosya.png' | relative_url }})` kullan.

## Dosyalar

İki sayfa var:

- `index.html` — **Oyun** sayfası: yalnız logo, anahtar görsel ve genel bir tanıtım yazısı
- `devlog/index.html` — **Devlog** sayfası: bütün yazıların listesi

Diğer dosyalar:

- `_layouts/` — sayfa ve yazı şablonları (gezinme `default.html` içinde)
- `_includes/tarih.html` — Türkçe tarih biçimi
- `assets/site.css` — stil; renkler oyunun paletinden (OneMorePet `Docs/GDD/19-sanat-yonu.md`)
- `assets/img/capsule.webp` — anahtar görsel (Steam kapsülü), `assets/devlog/` — yazı görselleri
- `_config.yml` — site ayarları; repo adı değişirse `baseurl` güncellenmeli
