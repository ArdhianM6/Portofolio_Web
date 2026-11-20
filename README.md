# Portofolio Ardhian

Portofolio ini adalah satu aplikasi React yang menggunakan Vite, Tailwind CSS v4, dan Express. `index.html` hanya menjadi mount point yang diperlukan Vite; seluruh halaman dan interaksi berada di komponen React dalam `src/`.

## Menjalankan di komputer lokal

Gunakan Node.js 20 atau lebih baru.

```sh
npm install
npm run dev
```

Vite menampilkan alamat server lokal di terminal.

## Build produksi

```sh
npm run build
npm start
```

Express menyajikan folder `dist` pada port `4173`. Port dapat diganti dengan variabel lingkungan `PORT`.

Untuk hosting Node.js, gunakan `npm run build` lalu `npm start`. Express menyajikan aplikasi React untuk rute langsung seperti `/skills` dan `/projects/alovera-pos`.

Repo `Portofolio_Web` juga diterbitkan melalui GitHub Pages pada subpath `/Portofolio_Web/`. Untuk membuat versi statisnya, jalankan `npm run build:pages`, salin isi folder `dist/` ke root repo, lalu salin `dist/index.html` sebagai `404.html` agar rute React Router tetap berfungsi saat dibuka langsung.

Konten profil, proyek, keterampilan, pengalaman, dan sertifikat tersimpan di `src/data/portfolio.js`. Aset lokal yang digunakan situs ada di `public/`. Kode situs statis sebelumnya dipindahkan ke `archive/legacy-static-site/` dan tidak masuk ke build.
