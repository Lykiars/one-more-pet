# One More Pet — tanıtım ve devlog sitesi

GitHub Pages ile yayınlanan statik site (Jekyll). Adres: https://lykiars.github.io/one-more-pet/

## Yeni devlog ekleme

1. `_posts/` klasörüne `YYYY-AA-GG-kisa-ad.md` adlı bir dosya ekle (ör. `_posts/2026-10-04-devlog-2.md`).
2. Dosyanın başına şunu yaz:

   ```
   ---
   layout: post
   title: "Devlog #2 — Başlık"
   ---
   ```

3. Altına yazıyı Markdown ile yaz. İlk paragraf ana sayfada özet olarak görünür.
4. Commit ve push et; GitHub Pages siteyi 1–2 dakikada yeniden kurar.

Görsel eklemek için dosyayı `assets/devlog/` altına koy ve yazıda `![Açıklama]({{ '/assets/devlog/dosya.png' | relative_url }})` kullan.

## Dosyalar

- `index.html` — ana sayfa (tanıtım, sevme demosu, kediler, devlog listesi)
- `_layouts/` — sayfa ve yazı şablonları
- `_includes/tarih.html` — Türkçe tarih biçimi
- `assets/site.css`, `assets/demo.js` — stil ve sevme demosu
- `_config.yml` — site ayarları; repo adı değişirse `baseurl` güncellenmeli
