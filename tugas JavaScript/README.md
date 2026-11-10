# Tugas Mandiri JavaScript: Formulir Pendaftaran Workshop Web

Halaman pendaftaran interaktif dibuat dengan HTML, CSS, dan JavaScript murni (tanpa library).

## Cara menjalankan
Buka `index.html` di browser. Tidak perlu instalasi.

## Fitur
| Fitur | Implementasi |
|---|---|
| Validasi form | Nama tidak kosong, email valid (regex), password minimal 8 karakter. Pesan error tampil di bawah setiap field. |
| Manipulasi DOM | Ubah teks: sapaan di kiri mengikuti nama, pesan error, pesan sukses. Ubah style: warna border field, bar kekuatan password, mode gelap. |
| Event handling | `click`: tampilkan password, ganti tema, reset. `keyup`: validasi langsung saat mengetik. `submit`: validasi akhir. |
| UI/UX | Dua kolom di desktop, satu kolom di HP; fokus keyboard terlihat; kontras warna jelas. |
| Kerapihan kode | Indentasi konsisten, komentar per bagian, nama variabel deskriptif. |

## Struktur
```
tugas-javascript/
  index.html
  style.css
  script.js
  README.md
```
