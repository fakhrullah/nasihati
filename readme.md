[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

---

> This is Work in progress (WIP) branch.
> Why because there are going to be lot of refactor.

### Target before merge to master

1. Menggunakan MVC. Guna controller, model dan mongoose.
2. Artikel guide step by step untuk other developer. Contribution guide; step by step to start program, step by step to contribute (linting for js, pug and css).
3. Setiap nasihat ada link masing2 supaya boleh di share di sosial media. Sebenarnya dah ada, cthnya: /nasihat/:id - tapi masih tak digunakan di homepage.
Idea baru ialah, homepage akan redirect ke page ini daripada guna AJAX.
4. Form page untuk edit nasihat. Dah ada juga tapi, tak confirm lagi menjadi ke tak, sebab dah lama tinggal. Syarat edit nasihat, sesiapa pun boleh edit, dan setiap edit akan di revisionkan sehingga admin approve. 
---

# Nasihati

Sebuah web yang memaparkan petikan terjemahan quran dan hadis. 

## Pra-lihat

![nasihatpreview](https://cloud.githubusercontent.com/assets/5182052/17733894/93162304-64ab-11e6-8005-757c5a439c78.png)

_Gambar dihasilkan menggunakan web [Am I Responsive](http://ami.responsivedesign.is/)_

[demo](https://nasihat.fajarhac.com)

Asal [nasihat web](https://github.com/fakhrullah/nasihat) yang ditulis balik dengan nodejs dan mongodb. Sebabnya, sistem pengaturcaraan modular dalam node js ni dapat mengurangkan kod, lalu memudahkan pengurusan.

Untuk repo sebelum ini pun saya dah beritahu, web sekecil nasihat, sepatutnya dibina menggunakan [Lumen](https://lumen.laravel.com/) bukan [Laravel](https://laravel.com/). 

Jadi tulis semula nasihat guna node.js, Express js dan MongoDB adalah satu tindakan terbaik dan bijak.

## Sumbangan

Saya menulis segala perkara yang nak dibuat dalam [nasihat.todo](/nasihat.todo). Sesiapa yang berminat nak menyumbang boleh tengok fail tersebut.

Selain itu, anda boleh tolong menyelesaikan isu-isu (_issue_) sekiranya ada. 

Untuk menggalakkan orang-orang baru dan yang belum selesa dengan github, saya akan labelkan isu-isu dengan label `senang`. Jadi kalau anda masih takut-takut nak menyumbang, tolong selesaikan isu label `senang` je dulu.

## Cara pasang (_install_)

> Pastikan anda dah install [node.js](https://nodejs.org/en/download/) dan [mongoDB](https://docs.mongodb.com/manual/installation/#tutorials). Semak dah install ke belum, `node --version` dan `mongo --version`.

1. Muatturun projek ni.

	```
	git clone https://github.com/fakhrullah/nasihati
	```

2. Pasang semua dependencies projek.

	```
	cd nasihati/
	npm install
	```

3. Sediakan tetapan fail `config.js` untuk _run_ di pc anda. Tetapan ini penting untuk mengelakkan web ni run pada port yang sama.

	```
	cp config.sample.js config.js
	```

	Kemudian sunting `config.js` ikut kesesuaian sendiri.

4. Sediakan data asas untuk MongoDB. Fail `nasihat.json` ada dalam root projek direktori. Kalau tak de, `git pull` yang terbaru.

	```
	mongoimport --db nasihat --collection nasihats --type json --file nasihat.json
	```

5. Mulakan web.

	```
	node app.js
	```

## License

Copyright 2016 [Fakhrullah Padzil](https://blog.fajarhac.com). Licensed under the MIT License.

