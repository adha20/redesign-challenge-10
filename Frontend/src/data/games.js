import rating3 from '../assets/rating-3.png';
import rating7 from '../assets/rating-7.png';
import rating13 from '../assets/rating-13.png';
import rating15 from '../assets/rating-15.png';
import rating18 from '../assets/rating-18.png';

import classInteraksi from '../assets/class-interaksi.png';
import classKekerasan from '../assets/class-kekerasan.png';
import classJudi from '../assets/class-judi.png';

import platWindows from '../assets/platform-windows.svg';
import platAndroid from '../assets/platform-android.svg';
import platPs from '../assets/platform-ps.svg';
import platIos from '../assets/platform-ios.svg';

// Cover fallback using whatever is available if needed, but we keep the strings for now 
// if they exist in public folder. If not, they'll just break gracefully.

export const dummyGames = [
  {
    id: 1,
    title: "Genshin Impact",
    publisher: "HoYoverse",
    description: [
      "Genshin Impact merupakan gim open world action RPG yang memungkinkan pemain menjelajahi dunia Teyvat, menyelesaikan berbagai misi, serta melawan musuh menggunakan karakter dengan kemampuan unik. Pemain dapat membentuk tim, meningkatkan level karakter, memperkuat senjata dan artefak, serta menghadapi berbagai tantangan untuk memperoleh hadiah dan meningkatkan Adventure Rank guna membuka konten baru.",
      "Genshin Impact menawarkan eksplorasi dunia terbuka dengan berbagai aktivitas, seperti bertarung, menyelesaikan misi, memasak, mengumpulkan sumber daya, dan meningkatkan kemampuan karakter. Gim ini juga menghadirkan sistem pertarungan fantasi menggunakan senjata dan elemen sihir yang mengandung unsur kekerasan fantasi tanpa menampilkan visual yang realistis. Oleh karena itu, gim ini lebih sesuai dimainkan oleh pengguna pada kategori usia 15+ dengan deskriptor konten berupa Kekerasan dan Interaksi Daring, karena mendukung permainan secara daring dengan pemain lain."
    ],
    rating: { age: "15+", icon: rating15 },
    klasifikasi: [
      { name: "Interaksi Daring", icon: classInteraksi },
      { name: "Kekerasan", icon: classKekerasan },
      { name: "Simulasi Judi", icon: classJudi }
    ],
    genres: ["Petualangan", "Open World", "RPG"],
    platforms: [
      { name: "Windows", icon: platWindows },
      { name: "Android", icon: platAndroid },
      { name: "Playstation", icon: platPs },
      { name: "iOS", icon: platIos }
    ],
    coverImage: "/images/games/genshin-cover.png",
    galleryImages: [
      "/images/games/genshin-gallery-1.png",
      "/images/games/genshin-gallery-2.png",
      "/images/games/genshin-gallery-3.png",
      "/images/games/genshin-gallery-4.png"
    ]
  },
  {
    id: 2,
    title: "Wuthering Waves",
    publisher: "Kuro Games",
    description: ["Wuthering Waves adalah game open-world action RPG yang berlatar di dunia pasca-apokaliptik dengan cerita yang mendalam dan kebebasan berekspresi dalam pertarungan."],
    rating: { age: "15+", icon: rating15 },
    klasifikasi: [{ name: "Kekerasan", icon: classKekerasan }],
    genres: ["RPG", "Open World", "Petualangan"],
    platforms: [{ name: "Windows", icon: platWindows }, { name: "Android", icon: platAndroid }, { name: "iOS", icon: platIos }],
    coverImage: "/images/games/wuthering-waves.png",
    galleryImages: ["/images/games/wuthering-waves.png"]
  },
  {
    id: 3,
    title: "Tower of Fantasy",
    publisher: "Hotta Studio",
    description: ["Game Sci-Fi Open World RPG dengan kebebasan kustomisasi dan sistem pertarungan yang intens."],
    rating: { age: "15+", icon: rating15 },
    klasifikasi: [{ name: "Interaksi Daring", icon: classInteraksi }],
    genres: ["RPG", "Open World"],
    platforms: [{ name: "Windows", icon: platWindows }, { name: "Android", icon: platAndroid }],
    coverImage: "/images/games/tower-of-fantasy.png",
    galleryImages: ["/images/games/tower-of-fantasy.png"]
  },
  {
    id: 4,
    title: "Black Desert Mobile",
    publisher: "Pearl Abyss",
    description: ["Game MMORPG aksi kelas dunia dengan sistem pertarungan non-targeting dan grafis luar biasa."],
    rating: { age: "18+", icon: rating18 },
    klasifikasi: [{ name: "Kekerasan", icon: classKekerasan }],
    genres: ["RPG", "Petualangan"],
    platforms: [{ name: "Android", icon: platAndroid }, { name: "iOS", icon: platIos }],
    coverImage: "/images/games/black-desert.png",
    galleryImages: ["/images/games/black-desert.png"]
  },
  {
    id: 5,
    title: "Albion Online",
    publisher: "Sandbox Interactive",
    description: ["Game Sandbox MMORPG di mana ekonomi digerakkan sepenuhnya oleh pemain."],
    rating: { age: "15+", icon: rating15 },
    klasifikasi: [{ name: "Interaksi Daring", icon: classInteraksi }],
    genres: ["RPG", "Open World"],
    platforms: [{ name: "Windows", icon: platWindows }, { name: "Android", icon: platAndroid }],
    coverImage: "/images/games/albion.png",
    galleryImages: ["/images/games/albion.png"]
  },
  {
    id: 6,
    title: "Dragon Raja",
    publisher: "Archosaur Games",
    description: ["MMORPG dengan grafis memukau yang dibangun menggunakan Unreal Engine 4."],
    rating: { age: "15+", icon: rating15 },
    klasifikasi: [{ name: "Interaksi Daring", icon: classInteraksi }],
    genres: ["RPG"],
    platforms: [{ name: "Android", icon: platAndroid }, { name: "iOS", icon: platIos }],
    coverImage: "/images/games/dragon-raja.png",
    galleryImages: ["/images/games/dragon-raja.png"]
  },
  {
    id: 7,
    title: "Sky: Children of the Light",
    publisher: "thatgamecompany",
    description: ["Eksplorasi dunia magis yang menenangkan, berinteraksi dan membentuk ikatan dengan pemain lain di seluruh dunia."],
    rating: { age: "3+", icon: rating3 },
    klasifikasi: [{ name: "Interaksi Daring", icon: classInteraksi }],
    genres: ["Petualangan", "Puzzle"],
    platforms: [{ name: "Android", icon: platAndroid }, { name: "iOS", icon: platIos }],
    coverImage: "/images/games/sky.png",
    galleryImages: ["/images/games/sky.png"]
  },
  {
    id: 8,
    title: "Minecraft",
    publisher: "Mojang Studios",
    description: ["Game sandbox legendaris yang memberikan kebebasan tanpa batas untuk membangun dan bertahan hidup."],
    rating: { age: "7+", icon: rating7 },
    klasifikasi: [{ name: "Interaksi Daring", icon: classInteraksi }],
    genres: ["Survival", "Simulasi", "Open World"],
    platforms: [{ name: "Windows", icon: platWindows }, { name: "Playstation", icon: platPs }],
    coverImage: "/images/games/minecraft.png",
    galleryImages: ["/images/games/minecraft.png"]
  },
  {
    id: 9,
    title: "Undawn",
    publisher: "Lightspeed Studios (Tencent)",
    description: ["Game open world survival menantang di dunia pasca-apokaliptik yang dipenuhi zombie."],
    rating: { age: "18+", icon: rating18 },
    klasifikasi: [{ name: "Kekerasan", icon: classKekerasan }],
    genres: ["Survival", "Shooter", "Open World"],
    platforms: [{ name: "Android", icon: platAndroid }, { name: "Windows", icon: platWindows }],
    coverImage: "/images/games/undawn.png",
    galleryImages: ["/images/games/undawn.png"]
  },
  {
    id: 10,
    title: "Dawnlands",
    publisher: "Seasun Games",
    description: ["Game survival RPG dengan sistem crafting dan eksplorasi dunia terbuka yang indah."],
    rating: { age: "15+", icon: rating15 },
    klasifikasi: [{ name: "Interaksi Daring", icon: classInteraksi }],
    genres: ["Survival", "RPG"],
    platforms: [{ name: "Android", icon: platAndroid }, { name: "Windows", icon: platWindows }],
    coverImage: "/images/games/dawnlands.png",
    galleryImages: ["/images/games/dawnlands.png"]
  }
];

export const getGameById = (id) => {
  return dummyGames.find(game => game.id === id);
};
