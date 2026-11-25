# Rumah yang Selalu Kurindukan

Hadiah Hari Ibu dari seorang anak perempuan yang sedang merantau. Situs ini berjalan sebagai halaman statis tanpa backend, basis data, pendaftaran, atau pelacak.

## Menjalankan situs

Gunakan Node.js 22 dan npm dari direktori proyek.

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Tambahkan `?pratinjau=1` pada alamat untuk langsung membaca isi situs, atau `?pratinjau=1#pembuka` untuk menguji pintu pada sesi baru. Tombol **Mulai dari awal** mengulang pembuka dan menghapus progres kenangan, bunga, dan surat kecil pada perangkat itu.

## Personalisasi

Edit `src/data/mothersDay.ts`.

- Isi `motherName` dan `daughterName` jika ingin mencantumkan nama pada surat dan unduhan. Ubah `date` dengan offset `+07:00` untuk WIB. Gunakan `countdown: false` untuk mematikan hitung mundur, atau `preview: true` saat mengerjakan hadiah.
- Ubah narasi di `chapters`, ungkapan Jawa di `dictionary`, `letter`, `quranPrayer`, `bouquetNote`, dan `endingPrayer`, serta doa bunga di `prayers`. Gunakan `hidden` untuk menyembunyikan bab berdasarkan ID-nya.
- Taruh foto asli di `public/images/{ibu,home,food,memories,quran,recipes}`. Isi `images` untuk ilustrasi yang ingin diganti. Misalnya, gunakan `/images/ibu/ibu-hero.jpg` untuk foto utama. Tambahkan entri `gallery` dengan `src`, `caption`, dan `alt`. Gunakan JPEG atau WebP yang sudah diperkecil. Minta izin orang tua atau wali sebelum menampilkan foto anak-anak yang belajar mengaji.
- Isi `recipes` dengan bahan asli, cara membuat, catatan, dan cerita. Setiap entri boleh memiliki `photo`, `audio`, dan `video`. Halaman terakhir memuat resep simbolis.
- Rekam suara sendiri, simpan sebagai MP3 di `public/audio/voice-letter.mp3`, atau ubah lokasi `audio.voice`. Simpan video sendiri di `public/video/mothers-day-message.mp4`. Video dan pemutar surat akan muncul saat berkas tersedia pada waktu Vite dimulai atau saat situs dibangun. Gunakan H.264 dan AAC untuk MP4 agar lebih mudah diputar di ponsel.
- Ganti `public/audio/background-music.mp3` dengan musik yang berizin. Musik bawaan adalah instrumental orisinal yang disintesis untuk proyek ini. Efek ketukan pintu bawaan juga disintesis. Efek tambahan bisa diletakkan di `door-open.mp3`, `paper-unfold.mp3`, dan `morning-ambience.mp3` pada folder yang sama.
- Ilustrasi SVG dan gambar suasana serambi, jendela, serta teh adalah pengganti umum. Album menampilkan gambar suasana tersebut hingga Anda menambahkan foto.

## Privasi dan penerbitan

Secara bawaan, halaman memiliki meta `noindex,nofollow` dan `public/robots.txt` melarang pengindeksan. Gambar pratinjau berbagi memakai gambar serambi umum. Untuk WhatsApp, atur `privacy.previewImage` ke URL HTTPS absolut gambar pratinjau setelah domain Vercel ditentukan. Jika ingin mengizinkan pengindeksan, sesuaikan `privacy.noIndex` dan `public/robots.txt`.

Hitung mundur, noindex, dan tautan yang hanya dibagikan kepada keluarga tidak melindungi akses. Untuk privasi sungguhan, gunakan perlindungan deployment Vercel yang memerlukan autentikasi pada seluruh domain, atau jalankan autentikasi di sisi server dan layani foto, audio, dan video dari penyimpanan privat setelah pemeriksaan sesi. Uji juga membuka URL aset secara langsung dari jendela privat.

Untuk menerbitkan di Vercel, impor repositori, pilih preset Vite, gunakan `npm ci` untuk pemasangan dan `npm run build` untuk build. Direktori keluarannya `dist`. Setelah terbit, periksa pratinjau di desktop dan ponsel. Bangun ulang setelah menambah media.
