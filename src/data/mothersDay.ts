export interface Message { title: string; text: string }
export interface Chapter { title: string; paragraphs: string[] }
export interface Recipe { title: string; ingredients: string[]; method: string; note: string; story?: string; photo?: string; audio?: string; video?: string }
export interface GalleryPhoto { src: string; caption: string; alt: string }
export interface Privacy { noIndex: boolean; previewImage: string }
export interface Comparison { title: string; items: string[] }
export interface MothersDay {
  motherName: string; daughterName: string; date: string; countdown: boolean; preview: boolean
  title: string; subtitle: string; opening: string[]; waiting: string[]; heroQuote: string; mainQuote: string; supportingQuotes: string[]; dedication: string
  teaMessage: string; mealQuote: string; table: Message[]; dictionary: Message[]; dictionaryNote: string
  quranPrayer: string[]; travelQuote: string; smallLetters: Message[]; prayers: Message[]
  bouquetNote: string[]; endingLines: string[]; letter: string[]; endingPrayer: string[]; finalNote: string
  chapters: Record<string, Chapter>; comparison: Comparison[]; recipes: Recipe[]; gallery: GalleryPhoto[]; galleryFallback: GalleryPhoto[]
  images: Record<'hero' | 'ending' | 'door' | 'window' | 'tea' | 'kitchen' | 'quran', string>
  audio: Record<'background' | 'knock' | 'door' | 'paper' | 'morning' | 'voice', string>
  video: string; privacy: Privacy; hidden: string[]; notes: Record<string, string>
}
// Isi nama jika diinginkan. Tanggal menyertakan offset WIB (+07:00).
// Tambahkan foto ke gallery dengan src, caption, dan alt. Gunakan foto dengan izin.
// Isi images dengan jalur foto asli. Jalur kosong memakai ilustrasi umum.
// Masukkan ID bab pada hidden untuk menyembunyikannya. Nyalakan preview untuk melewati hitung mundur.
export const mothersDay: MothersDay = {
  "motherName": "",
  "daughterName": "",
  "date": "2026-12-22T00:00:00+07:00",
  "countdown": true,
  "preview": false,
  "title": "Rumah yang Selalu Kurindukan",
  "subtitle": "Kasih Sayang yang Disajikan Hangat",
  "opening": [
    "Ada begitu banyak tempat yang bisa kudatangi.",
    "Namun, selalu ada satu tempat yang paling ingin kutuju.",
    "Tempat yang menyimpan begitu banyak kehangatan.",
    "Tempat di mana ada Ibu."
  ],
  "waiting": [
    "Untuk seseorang yang selalu membuat rumah terasa seperti rumah.",
    "Ada sebuah hadiah kecil yang sedang menunggu untuk dibuka."
  ],
  "mainQuote": "Dulu, aku mengira rumah hanyalah sebuah tempat. Semakin dewasa, aku menyadari bahwa rumah adalah Ibu.",
  "supportingQuotes": [
    "Kasih sayang tidak selalu hadir melalui kata-kata. Terkadang, ia hadir di atas sepiring makanan.",
    "Dari sekian banyak hal yang kurindukan tentang rumah, sebagian besarnya adalah Ibu.",
    "Hal-hal kecil itu ternyata tidak pernah benar-benar kecil.",
    "Aku menyayangi Ibu, lebih dari yang mampu kuungkapkan dengan kata-kata.",
    "Matur nuwun sampun dados papan kula mulih, Bu."
  ],
  "heroQuote": "Sejauh apa pun aku pergi, selalu ada alasan untuk pulang. Alasan itu adalah Ibu.",
  "dedication": "Untuk perempuan yang membuat rumah terasa seperti rumah.",
  "teaMessage": "Matur nuwun, Bu. Terima kasih karena selalu menyambut kepulanganku dengan caramu sendiri.",
  "mealQuote": "Seenak apa pun makanan di luar, tetap ada satu rasa yang tidak bisa kugantikan. Masakan Ibu.",
  "table": [
    {
      "title": "Teh hangat",
      "text": "Setiap kali aku pulang, teh hangat buatan Ibu selalu menjadi salah satu sambutan yang paling aku nantikan."
    },
    {
      "title": "Kopi",
      "text": "Aku rindu pagi-pagi di rumah, ketika Ibu terkadang sudah menyiapkan kopi bahkan sebelum aku memintanya."
    },
    {
      "title": "Masakan Ibu",
      "text": "Tidak ada makanan yang bisa menggantikan rasa masakan Ibu."
    },
    {
      "title": "Gorengan",
      "text": "Aku rindu ketika Ibu tiba-tiba membuat gorengan atau camilan untuk kami, tanpa harus menunggu hari istimewa."
    },
    {
      "title": "Panci masak",
      "text": "Di balik setiap makanan yang tersedia, ada seseorang yang sudah lebih dulu memikirkan kebutuhan anak-anaknya."
    },
    {
      "title": "Buku resep",
      "text": "Kalau suatu hari nanti aku belajar membuat masakan Ibu, aku berharap aku juga bisa menyajikannya dengan kasih sayang yang sama."
    },
    {
      "title": "Jendela rumah",
      "text": "Aku rindu pagi-pagi sederhana di rumah, ketika aku bisa menjalani hari tanpa harus memikirkan semuanya sendirian."
    },
    {
      "title": "Miniatur rumah",
      "text": "Sejauh apa pun aku pergi, selalu ada satu tempat yang membuatku ingin kembali. Tempat di mana ada Ibu."
    }
  ],
  "dictionary": [
    {
      "title": "Kok ora ndang mangan?",
      "text": "Ibu ingin memastikan anaknya tidak kelaparan."
    },
    {
      "title": "Membuatkan teh hangat setiap kali aku pulang.",
      "text": "Aku disambut. Aku diperhatikan. Aku sudah sampai di rumah."
    },
    {
      "title": "Tiba-tiba membuat camilan untuk anak-anaknya.",
      "text": "Ibu memikirkan kami bahkan ketika kami tidak meminta apa-apa."
    },
    {
      "title": "Ibu sudah menyiapkan makanan ketika aku bangun tidur.",
      "text": "Sebelum aku memikirkan kebutuhanku sendiri, Ibu sudah lebih dahulu memikirkannya."
    }
  ],
  "dictionaryNote": "Mungkin nada bicara Ibu terkadang terdengar galak. Tapi semakin dewasa, aku semakin memahami kasih sayang di baliknya.",
  "quranPrayer": [
    "Semoga setiap ayat yang Ibu ajarkan menjadi amal jariyah yang terus mengalir.",
    "Mugi saben ilmu ingkang Ibu wulangaken dados amal jariyah ingkang tansah mili."
  ],
  "travelQuote": "Ternyata, menjadi dewasa juga berarti belajar merindukan hal-hal yang dahulu selalu tersedia.",
  "smallLetters": [
    {
      "title": "Terima Kasih",
      "text": "Terima kasih untuk setiap makanan, setiap teh hangat, setiap camilan, dan setiap perhatian kecil yang mungkin sering lupa aku syukuri.\nMatur nuwun sanget, Bu."
    },
    {
      "title": "Maaf",
      "text": "Maaf kalau aku masih jarang memberi kabar, jarang bercerita, atau belum pandai mengungkapkan rasa sayangku kepada Ibu.\nNyuwun pangapunten, Bu."
    },
    {
      "title": "Aku Bangga",
      "text": "Aku bangga menjadi anak Ibu. Aku bangga dengan semua kebaikan yang Ibu lakukan untuk keluarga dan orang-orang di sekitar Ibu."
    },
    {
      "title": "Aku Rindu",
      "text": "Ketika jauh dari rumah, ada begitu banyak hal sederhana yang aku rindukan. Dan sebagian besar dari hal-hal itu adalah tentang Ibu."
    },
    {
      "title": "Aku Sayang Ibu",
      "text": "Aku mungkin jarang mengatakannya. Tapi aku sangat menyayangi Ibu, lebih dari yang mampu kuungkapkan dengan kata-kata."
    }
  ],
  "prayers": [
    {
      "title": "Kesehatan",
      "text": "Semoga Allah selalu memberikan Ibu kesehatan dan kekuatan dalam menjalani setiap hari."
    },
    {
      "title": "Keberkahan",
      "text": "Semoga setiap hari dalam kehidupan Ibu dipenuhi keberkahan dan kebaikan."
    },
    {
      "title": "Kebahagiaan",
      "text": "Semoga Ibu selalu memiliki banyak alasan untuk tersenyum dan menikmati kehidupan."
    },
    {
      "title": "Ketenangan Hati",
      "text": "Semoga Allah senantiasa memberikan ketenangan hati dan menjauhkan Ibu dari segala kesedihan serta kegelisahan."
    },
    {
      "title": "Amal Jariyah",
      "text": "Semoga setiap ilmu, perhatian, dan kebaikan yang Ibu bagikan menjadi pahala yang terus mengalir."
    },
    {
      "title": "Surga",
      "text": "Semoga Allah senantiasa menjaga Ibu dan mempertemukan kita kembali di surga-Nya."
    }
  ],
  "bouquetNote": [
    "Untuk Ibu, dengan seluruh doa dan kasih sayangku.",
    "Mugi Ibu tansah pinaringan kasarasan, kabagyan, lan keberkahan."
  ],
  "letter": [
    "Untuk Ibu tersayang,",
    "Aku mungkin bukan anak yang pandai bercerita kepada Ibu. Bukan anak yang sering mengirim pesan, menelepon, atau menceritakan segala hal yang terjadi dalam hidupku.",
    "Aku juga bukan anak yang pandai mengungkapkan rasa sayang secara langsung.",
    "Tapi bukan berarti aku tidak sangat menyayangi Ibu.",
    "Sejak merantau, ada banyak hal sederhana yang ternyata sangat aku rindukan.",
    "Aku rindu bangun tidur tanpa harus memikirkan mau makan apa.",
    "Aku rindu masakan Ibu.",
    "Aku rindu kopi dan teh di pagi hari.",
    "Aku rindu gorengan dan camilan yang tiba-tiba sudah tersedia di rumah.",
    "Aku bahkan rindu omelan Ibu yang menyuruhku segera makan.",
    "Dulu, semua itu terasa begitu biasa. Sekarang, aku menyadari bahwa di balik setiap makanan yang tersedia, ada seseorang yang sudah lebih dulu memikirkan kebutuhan kami.",
    "Di balik setiap omelan, ada kekhawatiran.",
    "Di balik setiap gelas teh hangat, ada kasih sayang yang mungkin tidak pernah diucapkan.",
    "Dan aku rasa, begitulah cara Ibu menunjukkan kasih sayang kepada kami.",
    "Ibu, aku juga bangga melihat bagaimana Ibu menjalani hari-hari Ibu.",
    "Mengurus rumah, merawat kami, dan setiap sore mengajarkan Al-Qur'an kepada anak-anak yang datang untuk belajar.",
    "Ada begitu banyak kebaikan yang Ibu lakukan dalam keseharian, meskipun mungkin tidak semuanya mendapatkan ucapan terima kasih.",
    "Semakin dewasa, aku semakin menyadari bahwa rumah bukan hanya sebuah bangunan.",
    "Rumah adalah tempat aku bisa bangun tidur dan menemukan masakan Ibu.",
    "Tempat aku bisa mendengar suara Ibu.",
    "Tempat aku disambut dengan segelas teh hangat setelah perjalanan pulang.",
    "Tempat aku bisa kembali menjadi seorang anak, meskipun di luar sana aku sedang belajar menjadi dewasa.",
    "Matur nuwun sanget, Bu.",
    "Terima kasih untuk segala hal kecil yang ternyata tidak pernah benar-benar kecil.",
    "Nyuwun pangapunten, Bu, kalau selama ini aku masih belum pandai mengungkapkan rasa sayangku.",
    "Semoga Allah selalu memberikan Ibu kesehatan, umur yang berkah, hati yang tenang, dan kebahagiaan yang tidak pernah habis.",
    "Aku berharap suatu hari nanti aku bisa memberikan kepada Ibu lebih banyak kebahagiaan daripada yang selama ini bisa kuberikan.",
    "Sejauh apa pun aku pergi, setinggi apa pun nanti aku melangkah, aku akan selalu menjadi anak perempuan Ibu yang ingin pulang ke rumah.",
    "Selamat Hari Ibu.",
    "Mugi Ibu tansah pinaringan kasarasan lan kabagyan.",
    "Aku sayang Ibu. Selalu.",
    "Dengan seluruh kasih sayang,",
    "Anak perempuanmu yang mungkin jarang bilang sayang, tetapi selalu merindukan rumah."
  ],
  "endingLines": ["Rumahku.", "Tempat pulangku.", "Kasih sayangku yang tidak tergantikan."],
  "endingPrayer": [
    "Semoga Allah selalu menjaga Ibu, sebagaimana Ibu selalu menjaga kami.",
    "Matur nuwun sanget, Bu. Aku sayang Ibu."
  ],
  "finalNote": "Aku mungkin tidak selalu mengatakan betapa aku menyayangi Ibu. Namun, setiap kali aku merindukan rumah, aku menyadari bahwa yang sebenarnya sedang kurindukan adalah Ibu.",
  "chapters": {
    "beranda": {
      "title": "Rumah yang Selalu Kurindukan",
      "paragraphs": [
        "Dulu, aku mengira rumah hanyalah tempat untuk kembali setelah pergi.",
        "Namun, semakin dewasa dan semakin sering jauh dari rumah, aku menyadari bahwa yang sebenarnya aku rindukan bukan hanya tempatnya.",
        "Aku merindukan seseorang yang ada di dalamnya.",
        "Ibu."
      ]
    },
    "kehangatan": {
      "title": "Kasih Sayang yang Disajikan Hangat",
      "paragraphs": [
        "Setiap kali aku pulang, ada satu hal sederhana yang hampir selalu menyambutku.",
        "Segelas teh hangat buatan Ibu.",
        "Mungkin bagi Ibu, itu hanya teh biasa. Sesuatu yang dibuat tanpa perlu alasan khusus.",
        "Tapi bagiku, segelas teh itu adalah salah satu rasa paling hangat dari sebuah kepulangan.",
        "Rasanya seperti diberi tahu bahwa aku sudah sampai di rumah."
      ]
    },
    "masakan": {
      "title": "Rasa yang Selalu Membuatku Ingin Pulang",
      "paragraphs": [
        "Di perantauan, ada satu pertanyaan sederhana yang hampir selalu harus kupikirkan setiap hari.",
        "Hari ini makan apa, ya?",
        "Kadang aku harus mencari makanan sendiri, memilih mau makan apa, dan memikirkan semuanya sendiri.",
        "Tapi ketika di rumah, aku bisa bangun tidur dan menemukan makanan yang sudah Ibu siapkan.",
        "Ada teh. Ada kopi. Kadang ada gorengan atau camilan yang tiba-tiba dibuatkan.",
        "Dulu, semua itu terasa biasa.",
        "Sekarang, justru hal-hal itulah yang paling aku rindukan."
      ]
    },
    "meja": {
      "title": "Sepiring Kehangatan, Sejuta Kasih Sayang",
      "paragraphs": []
    },
    "kamus": {
      "title": "Begitulah Cara Ibu Bilang Sayang",
      "paragraphs": []
    },
    "resep": {
      "title": "Resep yang Selalu Membawaku Pulang",
      "paragraphs": []
    },
    "mengaji": {
      "title": "Rumah yang Juga Menjadi Tempat Belajar Kebaikan",
      "paragraphs": [
        "Di rumah, Ibu menjalani begitu banyak peran.",
        "Ibu merawat rumah, menyiapkan kebutuhan keluarga, dan menemani anak-anak Ibu tumbuh.",
        "Setiap sore, bersama Ayah, Ibu juga mengajarkan Al-Qur'an kepada anak-anak yang datang ke rumah untuk belajar.",
        "Rumah kami bukan hanya menjadi tempat kami tumbuh, tetapi juga tempat anak-anak lain belajar mengenal dan membaca Al-Qur'an.",
        "Aku bangga kepada Ibu, bukan hanya karena segala hal yang Ibu lakukan untuk kami, tetapi juga karena kebaikan yang Ibu bagikan kepada orang lain."
      ]
    },
    "rantau": {
      "title": "Di Antara Tumbuh Dewasa dan Belajar Merindukan Rumah",
      "paragraphs": [
        "Aku biasanya pulang sekitar sebulan sekali.",
        "Selama jauh dari rumah, aku belajar mengurus banyak hal sendiri.",
        "Aku belajar menentukan apa yang akan kumakan, menyiapkan kebutuhanku sendiri, dan menjalani hari-hariku jauh dari keluarga.",
        "Aku juga bukan anak yang sering mengirim pesan atau menelepon Ibu.",
        "Kadang kami hanya bercerita tentang keseharian ketika aku sedang pulang.",
        "Tapi semakin lama aku menjalani kehidupan di perantauan, semakin aku menyadari bahwa ada banyak hal tentang rumah yang selalu ikut kurindukan.",
        "Masakan Ibu.",
        "Suara Ibu.",
        "Teh hangat.",
        "Bahkan omelan Ibu."
      ]
    },
    "kenangan": {
      "title": "Hal-Hal Kecil yang Ternyata Tidak Kecil",
      "paragraphs": [
        "Aku tidak punya satu kenangan luar biasa untuk menceritakan betapa berartinya Ibu.",
        "Karena bagiku, semua hal sederhana bersama Ibu adalah kenangan."
      ]
    },
    "surat-kecil": {
      "title": "Ada Banyak Hal yang Ingin Kukatakan, Bu",
      "paragraphs": []
    },
    "doa": {
      "title": "Jika Aku Bisa Memberikan Bunga, Aku Juga Ingin Memberikan Doa",
      "paragraphs": []
    },
    "surat": {
      "title": "Surat untuk Ibu",
      "paragraphs": []
    },
    "video": {
      "title": "Kalau Selama Ini Aku Jarang Mengatakannya...",
      "paragraphs": [
        "Aku mungkin tidak selalu pandai menyampaikan perasaanku.",
        "Tapi aku berharap, melalui hadiah kecil ini, Ibu tahu betapa aku menyayangi Ibu."
      ]
    },
    "penutup": {
      "title": "Selamat Hari Ibu",
      "paragraphs": [
        "Berapa pun usiaku nanti.",
        "Sejauh apa pun aku pergi.",
        "Sebanyak apa pun tempat yang pernah kusebut rumah.",
        "Aku akan selalu ingin pulang kepada Ibu."
      ]
    }
  },
  "comparison": [
    {
      "title": "Di Perantauan",
      "items": [
        "Bangun tidur, memikirkan mau makan apa.",
        "Mencari makanan sendiri.",
        "Menyiapkan kebutuhan sendiri."
      ]
    },
    {
      "title": "Di Rumah",
      "items": [
        "Bangun tidur, makanan sudah tersedia.",
        "Teh dan kopi buatan Ibu.",
        "Camilan yang dibuat tanpa perlu diminta."
      ]
    }
  ],
  "recipes": [
    {
      "title": "[Nama masakan favorit]",
      "ingredients": [
        "[Bahan-bahan asli dari Ibu]"
      ],
      "method": "[Cara membuat menurut Ibu]",
      "note": "[Catatan dari Ibu]",
      "story": "[Cerita tentang masakan ini]"
    },
    {
      "title": "[Nama camilan favorit]",
      "ingredients": [
        "[Bahan-bahan asli dari Ibu]"
      ],
      "method": "[Cara membuat menurut Ibu]",
      "note": "[Catatan dari Ibu]",
      "story": "[Cerita tentang masakan ini]"
    },
    {
      "title": "[Nama gorengan buatan Ibu]",
      "ingredients": [
        "[Bahan-bahan asli dari Ibu]"
      ],
      "method": "[Cara membuat menurut Ibu]",
      "note": "[Catatan dari Ibu]",
      "story": "[Cerita tentang masakan ini]"
    },
    {
      "title": "Teh buatan Ibu",
      "ingredients": [
        "[Bahan-bahan asli dari Ibu]"
      ],
      "method": "[Cara membuat menurut Ibu]",
      "note": "[Catatan dari Ibu]",
      "story": "[Cerita tentang masakan ini]"
    },
    {
      "title": "[Nama resep keluarga]",
      "ingredients": [
        "[Bahan-bahan asli dari Ibu]"
      ],
      "method": "[Cara membuat menurut Ibu]",
      "note": "[Catatan dari Ibu]",
      "story": "[Cerita tentang masakan ini]"
    },
    {
      "title": "Resep untuk Sebuah Rumah",
      "ingredients": [
        "Sedikit kehangatan.",
        "Sedikit kesabaran.",
        "Banyak perhatian.",
        "Pagi-pagi sederhana yang tak terhitung jumlahnya.",
        "Kasih sayang dalam berbagai bentuknya."
      ],
      "method": "Sajikan dengan ketulusan, setiap hari.",
      "note": "Dibuat dengan kasih sayang oleh Ibu."
    }
  ],
  "gallery": [],
  "galleryFallback": [
    { "src": "/illustrations/window.svg", "alt": "Ilustrasi jendela rumah", "caption": "Pagi sederhana yang selalu kurindukan." },
    { "src": "/illustrations/dining-table.svg", "alt": "Ilustrasi meja makan", "caption": "Rasa yang selalu membuatku ingin pulang." },
    { "src": "/images/home/serambi.webp", "alt": "Ilustrasi suasana serambi rumah", "caption": "Rumah, dalam bentuk sebuah kenangan." }
  ],
  "images": {
    "hero": "",
    "ending": "",
    "door": "",
    "window": "",
    "tea": "",
    "kitchen": "",
    "quran": ""
  },
  "audio": {
    "background": "/audio/background-music.mp3",
    "knock": "/audio/door-knock.mp3",
    "door": "/audio/door-open.mp3",
    "paper": "/audio/paper-unfold.mp3",
    "morning": "/audio/morning-ambience.mp3",
    "voice": "/audio/voice-letter.mp3"
  },
  "video": "/video/mothers-day-message.mp4",
  "privacy": {
    "noIndex": true,
    "previewImage": "/images/home/pratinjau.png"
  },
  "hidden": [],
  "notes": {
    "dictionary": "Karena tidak semua kasih sayang disampaikan dengan kata 'sayang'.",
    "recipe": "Ada resep yang ditulis di atas kertas. Ada juga rasa yang tersimpan dalam ingatan.",
    "small": "Meski jarang terucap, bukan berarti perasaan itu tidak ada.",
    "garden": "Petiklah bunga-bunga ini, Bu. Ada satu doa untuk Ibu di setiap bunganya.",
    "tableDone": "Ternyata, kasih sayang Ibu selama ini ada di setiap sudut rumah.",
    "lettersDone": "Ada perasaan yang jarang terucap, tetapi tidak pernah berkurang."
  }
}
