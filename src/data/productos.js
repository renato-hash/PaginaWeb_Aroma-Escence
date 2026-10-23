// src/data/productos.js

export const productosIniciales = [

  {
    id: 1,
    nombre: "Azzaro The Most Wanted EDP Intense",
    marca: "Azzaro",
    precio: 89990,
    categoria: "Gourmand",
    acordes: ['cálido especiado', 'dulce', 'ámbar', 'amaderado', 'caramelo', 'aromático'],
    tamanos: [
      { ml: '50 ml', precio: 69990, stock: 3 },
      { ml: '100 ml', precio: 89990, stock: 9 }
    ],
    descripcion: "Una fragancia oriental amaderada, intensa y seductora para hombres audaces.",
    descripcionLarga: "Azzaro The Most Wanted EDP Intense invita a quien lo lleva a asumir siempre nuevos retos y vivir experiencias intensas con una estela de toffee irresistible.",
    imagen: "public/images/the-most-wanted-intense.webp",
    stock: 12,
    notas: {
      salida: "Cardamomo guatemalteco",
      corazon: "Toffee (Caramelo crujiente)",
      fondo: "Madera de Ámbar (Amberwood)"
    }
  },
  {
    id: 2,
    nombre: "Azzaro The Most Wanted Parfum",
    marca: "Azzaro",
    precio: 94990,
    categoria: "Orientales",
    acordes: ['fresco especiado', 'cálido especiado', 'vainilla', 'amaderado', 'dulce', 'ámbar'],
    tamanos: [
      { ml: '50 ml', precio: 74990, stock: 3 },
      { ml: '100 ml', precio: 94990, stock: 7 }
    ],
    descripcion: "Una explosión especiada y ardiente de jengibre rojo y vainilla de Borbón.",
    descripcionLarga: "Perfume ultra sensorial e intenso. Combina la calidez del jengibre con maderas incandescentes y una adictiva vainilla.",
    imagen: "public/images/the_most_wanted_parfum.webp",
    stock: 10,
    notas: {
      salida: "Jengibre rojo",
      corazon: "Notas amaderadas incandescentes",
      fondo: "Vainilla de Borbón"
    }
  },


  {
    id: 3,
    nombre: "Stronger With You Intensely",
    marca: "Emporio Armani",
    precio: 99990,
    categoria: "Gourmand",
    acordes: ['dulce', 'cálido especiado', 'vainilla', 'ámbar', 'amaderado', 'afrutado'],
    tamanos: [
      { ml: '50 ml', precio: 74990, stock: 4 },
      { ml: '100 ml', precio: 99990, stock: 11 }
    ],
    descripcion: "Aroma ambarado y dulce con toques de pimienta rosa, toffee y canela.",
    descripcionLarga: "Una fragancia audaz que refleja la fuerza del amor con acordes cálidos de vainilla, castaña glaseada y especias potentes.",
    imagen: "public/images/stronger_intensely.webp",
    stock: 15,
    notas: {
      salida: "Pimienta rosa, Enebro de Virginia y Violeta",
      corazon: "Toffee, Canela, Lavanda y Salvia",
      fondo: "Vainilla, Habba Tonka, Ámbar y Gamuza"
    }
  },
  {
    id: 4,
    nombre: "Stronger With You Absolutely",
    marca: "Emporio Armani",
    precio: 104990,
    categoria: "Amaderados",
    acordes: ['ron', 'licoroso', 'dulce', 'amaderado', 'vainilla', 'cálido especiado'],
    tamanos: [
      { ml: '50 ml', precio: 79990, stock: 2 },
      { ml: '100 ml', precio: 104990, stock: 6 }
    ],
    descripcion: "Perfume embriagador reforzado con un licoroso acorde de ron y castaña.",
    descripcionLarga: "La interpretación más intensa de la colección. Fusiona ron balsámico con lavanda francesa y madera de cedro ahumado.",
    imagen: "public/images/Perfume_Emporio_Armani_Stronger_With_You_Absolutely_100ml_3.jpg",
    stock: 8,
    notas: {
      salida: "Ron, Bergamota y Elemi",
      corazon: "Lavanda y Davana",
      fondo: "Castaña, Vainilla de Madagascar, Cedro y Pachulí"
    }
  },

  {
    id: 5,
    nombre: "Scandal Le Parfum",
    marca: "Jean Paul Gaultier",
    precio: 98990,
    categoria: "Orientales",
    acordes: ['cálido especiado', 'dulce', 'amaderado', 'aromático', 'vainilla'],
    tamanos: [
      { ml: '50 ml', precio: 72990, stock: 5 },
      { ml: '100 ml', precio: 98990, stock: 9 }
    ],
    descripcion: "Fragancia escandalosamente sensual con notas de geranio, haba tonka y sándalo.",
    descripcionLarga: "Un nocaut olfativo que derrocha elegancia y misterio en la noche. Perfecto para llamar la atención en cualquier evento.",
    imagen: "public/images/scandal_parfum.jpg",
    stock: 14,
    notas: {
      salida: "Geranio fresco",
      corazon: "Haba tonka",
      fondo: "Sándalo cremoso"
    }
  },
  {
    id: 6,
    nombre: "Le Beau Le Parfum",
    marca: "Jean Paul Gaultier",
    precio: 96990,
    categoria: "Gourmand",
    acordes: ['dulce', 'tropical', 'amaderado', 'vainilla', 'afrutado', 'ámbar'],
    tamanos: [
      { ml: '75 ml', precio: 79990, stock: 3 },
      { ml: '100 ml', precio: 96990, stock: 5 },
      { ml: '125 ml', precio: 114990, stock: 3 }
    ],
    descripcion: "Elixir ultra seductor con piña chispeante, madera de coco y haba tonka.",
    descripcionLarga: "Una tentación oriental amaderada que combina la frescura tropical de la piña con la calidez del coco tostado.",
    imagen: "public/images/le_beau_le_parfum.webp",
    stock: 11,
    notas: {
      salida: "Piña, Iris, Ciprés y Jengibre",
      corazon: "Coconut (Madera de Coco) y Notas amaderadas",
      fondo: "Haba Tonka, Sándalo, Ámbar y Ámbar Gris"
    }
  },


  {
    id: 7,
    nombre: "Invictus Victory Elixir",
    marca: "Paco Rabanne",
    precio: 92990,
    categoria: "Amaderados",
    acordes: ['vainilla', 'cálido especiado', 'incienso', 'dulce', 'amaderado', 'aromático'],
    tamanos: [
      { ml: '75 ml', precio: 76990, stock: 4 },
      { ml: '100 ml', precio: 92990, stock: 6 },
      { ml: '125 ml', precio: 109990, stock: 3 }
    ],
    descripcion: "El pico máximo de intensidad de Invictus con pimienta negra, incienso y vainilla.",
    descripcionLarga: "Un elixir potente y triunfador. Mezcla la frescura especiada del cardamomo con un corazón de incienso ahumado y vainilla dulce.",
    imagen: "public/images/invictus_elixir.webp",
    stock: 13,
    notas: {
      salida: "Cardamomo, Pimienta negra y Cítricos",
      corazon: "Incienso y Lavanda",
      fondo: "Vainilla rica y Habba Tonka"
    }
  },
  {
    id: 8,
    nombre: "1 Million Royal",
    marca: "Paco Rabanne",
    precio: 89990,
    categoria: "Amaderados",
    acordes: ['amaderado', 'aromático', 'cálido especiado', 'dulce', 'cítrico'],
    descripcion: "Aroma amaderado fresco con lavanda, salvia y madera de benjuí.",
    descripcionLarga: "Una leyenda reinventada para la realeza moderna. Mezcla refrescante bergamota con acordes amaderados nobles.",
    imagen: "public/images/million-royal-rabanne.webp",
    stock: 9,
    notas: {
      salida: "Cardamomo, Mandarina y Bergamota",
      corazon: "Lavanda, Salvia y Violeta",
      fondo: "Benjuí, Cedro y Pachulí"
    }
  },


  {
    id: 9,
    nombre: "Hawas Ice for Him",
    marca: "Rasasi",
    precio: 54990,
    categoria: "Frescos",
    acordes: ['cítrico', 'afrutado', 'fresco', 'acuático', 'aromático', 'verde'],
    tamanos: [
      { ml: '50 ml', precio: 39990, stock: 6 },
      { ml: '100 ml', precio: 54990, stock: 14 }
    ],
    descripcion: "Evolución ultra helada y refrescante del clásico Hawas con manzana gélida y ciruela.",
    descripcionLarga: "Potencia, proyección y frescura marina extrema. Diseñado para destacar en días calurosos con un toque de musgo helado.",
    imagen: "public/images/RASASI-HAWAS-ICE_5.webp",
    stock: 20,
    notas: {
      salida: "Manzana helada, Bergamota, Limón y Menta glaciar",
      corazon: "Flor de Azahar, Cardamomo y Ciruela",
      fondo: "Almizcle, Ámbar gris y Madera de Deriva"
    }
  },
  {
    id: 10,
    nombre: "Hawas Fire for Him",
    marca: "Rasasi",
    precio: 56990,
    categoria: "Orientales",
    acordes: ['cálido especiado', 'ámbar', 'incienso', 'amaderado', 'cítrico', 'cuero'],
    descripcion: "Aroma cálido, ambarado y especiado con toques de pimienta y maderas oscuras.",
    descripcionLarga: "La faceta apasionada de la saga Hawas. Un perfume oriental ardiente que equilibra notas cítricas picantes con incienso.",
    imagen: "public/images/Hawas_Fire_Web_2.png",
    stock: 18,
    notas: {
      salida: "Pimienta negra, Pomelo chispeante y Cardamomo",
      corazon: "Canela, Incienso y Resinas",
      fondo: "Ámbar ardiente, Cuero y Madera de Oud"
    }
  },


  {
    id: 11,
    nombre: "Rayhaan Aquatica",
    marca: "Rayhaan",
    precio: 34990,
    categoria: "Frescos",
    acordes: ['marino', 'acuático', 'fresco', 'cítrico', 'aromático', 'herbal'],
    descripcion: "Sensación marina vibrante con notas de brisa oceánica y cítricos brillantes.",
    descripcionLarga: "Un perfume acuático moderno de alta fijación. Evoca la frescura de las olas del mar con matices herbales limpísimos.",
    imagen: "public/images/rayhaan_aquatica.webp",
    stock: 25,
    notas: {
      salida: "Notas marinas, Bergamota y Salvia",
      corazon: "Romero, Geranio y Especias frías",
      fondo: "Pachulí, Incienso y Almizcle blanco"
    }
  },
  {
    id: 12,
    nombre: "Rayhaan Tropical Vibe",
    marca: "Rayhaan",
    precio: 36990,
    categoria: "Cítricos",
    acordes: ['tropical', 'afrutado', 'dulce', 'cítrico', 'amaderado', 'fresco'],
    descripcion: "Coctel frutal exótico con mango, fruta de la pasión y toques amaderados.",
    descripcionLarga: "Una explosión de energía tropical llena de jugosidad y buena vibra. Ideal para amantes de aromas frutales veraniegos.",
    imagen: "public/images/rayhaan-tropical-vibe-eau-de-parfum-perfume-unissex-6297001571255-bnp-03-800x800.webp",
    stock: 22,
    notas: {
      salida: "Mango maduro, Fruta de la pasión y Lima",
      corazon: "Coco, Flor de azahar y Jazmín",
      fondo: "Madera de cedro, Ámbar y Almizcle"
    }
  },


  {
    id: 13,
    nombre: "Lattafa Khamrah",
    marca: "Lattafa",
    precio: 39990,
    categoria: "Gourmand",
    acordes: ['dulce', 'cálido especiado', 'canela', 'vainilla', 'amaderado', 'ámbar'],
    tamanos: [
      { ml: '50 ml', precio: 28990, stock: 8 },
      { ml: '100 ml', precio: 39990, stock: 22 }
    ],
    descripcion: "Sensacional perfume oriental especiado con canela, praliné y fechas dulces.",
    descripcionLarga: "El fenómeno viral de la perfumería árabe. Un elixir opulento que huele a pastel de canela, praliné y vainilla licorosa.",
    imagen: "public/images/khamra no.webp",
    stock: 30,
    notas: {
      salida: "Canela, Nuez moscada y Bergamota",
      corazon: "Praliné, Dátiles, Nardo y Mahonial",
      fondo: "Vainilla, Habba Tonka, Mirra, Benzoin y Akigalawood"
    }
  },
  {
    id: 14,
    nombre: "Lattafa Asad",
    marca: "Lattafa",
    precio: 32990,
    categoria: "Amaderados",
    acordes: ['cálido especiado', 'amaderado', 'vainilla', 'afrutado', 'pachulí', 'ámbar'],
    tamanos: [
      { ml: '50 ml', precio: 24990, stock: 7 },
      { ml: '100 ml', precio: 32990, stock: 21 }
    ],
    descripcion: "Aroma amaderado potente con notas de piña ahumada, pimienta y vainilla.",
    descripcionLarga: "Una fragancia viril y elegante de carácter imponente. Destaca por su gran fijación y estela cálida especiada.",
    imagen: "public/images/asad_elixir.webp",
    stock: 28,
    notas: {
      salida: "Pimienta negra, Piña y Tabaco",
      corazon: "Café, Iris y Pachulí",
      fondo: "Vainilla, Ámbar, Maderas secas y Benjuí"
    }
  },
  {
    id: 15,
    nombre: "Afnan 9 PM Out Night",
    marca: "Afnan",
    precio: 36990,
    categoria: "Gourmand",
    acordes: ['dulce', 'afrutado', 'cálido especiado', 'vainilla', 'lavanda', 'amaderado'],
    tamanos: [
      { ml: '50 ml', precio: 26990, stock: 3 },
      { ml: '100 ml', precio: 36990, stock: 15 }
    ],
    descripcion: "Vibrante y dulce combinación nocturna con manzana, canela, lavanda y vainilla.",
    descripcionLarga: "Inspirado en la energía de las salidas nocturnas. Una fragancia moderna de alta proyección con acordes gourmand irresistibles.",
    imagen: "public/images/9pm_out_night.webp",
    stock: 18,
    notas: {
      salida: "Manzana verde, Canela, Lavanda y Bergamota",
      corazon: "Flor de Azahar del Naranjo y Lirio de los Valles",
      fondo: "Vainilla, Haba Tonka, Ámbar y Pachulí"
    }
  },
  {
    id: 16,
    nombre: "Sceptre Malachite",
    marca: "Maison Alhambra",
    precio: 39990,
    categoria: "Orientales",
    acordes: ['ámbar', 'cálido especiado', 'amaderado', 'fresco especiado', 'aromático'],
    tamanos: [
      { ml: '50 ml', precio: 29990, stock: 3 },
      { ml: '100 ml', precio: 39990, stock: 11 }
    ],
    descripcion: "Elegante mezcla oriental ambarada con azafrán, especias nobles y resinas raras.",
    descripcionLarga: "Inspirado en la alta perfumería de nicho. Combina notas cítricas de salida con un corazón especiado y un fondo ambarado profundo.",
    imagen: "public/images/Maison-Alhambra-Sceptre-Malachite-EDP.jpg",
    stock: 14,
    notas: {
      salida: "Mandarina verde y Bergamota",
      corazon: "Azafrán, Cardamomo y Notas Especiadas",
      fondo: "Ámbar mineral, Madera de Oud y Almizcle"
    }
  },
  {
    id: 17,
    nombre: "Vulcan Feu",
    marca: "French Avenue",
    precio: 45990,
    categoria: "Amaderados",
    acordes: ['cálido especiado', 'ahumado', 'amaderado', 'ámbar', 'cuero'],
    tamanos: [
      { ml: '50 ml', precio: 34990, stock: 3 },
      { ml: '100 ml', precio: 45990, stock: 9 }
    ],
    descripcion: "Intensa fragancia volcánica con pimienta, ron ahumado, incienso y maderas nobles.",
    descripcionLarga: "Una creación imponente de carácter ardiente. Fusiona la calidez del ron envejecido con incienso resinoso y un fondo de ámbar y cuero.",
    imagen: "public/images/vulcan_fue.jpg",
    stock: 12,
    notas: {
      salida: "Pimienta negra, Jengibre picante y Bergamota",
      corazon: "Incienso ahumado, Ron y Canela",
      fondo: "Madera de Cedro, Ámbar volcánico y Cuero"
    }
  },
  {
    id: 18,
    nombre: "Hawas Kobra",
    marca: "Rasasi",
    precio: 58990,
    categoria: "Frescos",
    acordes: ['fresco especiado', 'marino', 'cítrico', 'aromático', 'amaderado'],
    tamanos: [
      { ml: '50 ml', precio: 42990, stock: 3 },
      { ml: '100 ml', precio: 58990, stock: 12 }
    ],
    descripcion: "Evolución potente de la saga Hawas con notas marinas intensas, cítricos y ambroxan.",
    descripcionLarga: "Seducción acuática extrema. Diseñado para ofrecer proyección duradera con una brisa marina refrescante y acordes especiados.",
    imagen: "public/images/hawas_kobra.webp",
    stock: 15,
    notas: {
      salida: "Bergamota chispeante, Notas marinas y Pomelo",
      corazon: "Especias frías, Lavanda y Salvia",
      fondo: "Ambroxan, Madera de Deriva y Pachulí"
    }
  },
  
  {
    id: 19,
    nombre: "Dior Sauvage EDP",
    marca: "Dior",
    precio: 115990,
    categoria: "Frescos",
    acordes: ['fresco especiado', 'cítrico', 'amaderado', 'ámbar', 'vainilla', 'aromático'],
    tamanos: [
      { ml: '50 ml', precio: 89990, stock: 3 },
      { ml: '75 ml', precio: 102990, stock: 4 },
      { ml: '100 ml', precio: 115990, stock: 6 },
      { ml: '125 ml', precio: 134990, stock: 2 }
    ],
    descripcion: "Aroma fresco, amaderado y nocturno con matices de bergamota y vainilla.",
    descripcionLarga: "Inspirado en el desierto en la hora mágica del atardecer. La frescura de Sauvage se enriquece con matices cálidos de vainilla.",
    imagen: "public/images/dior_sauvage.webp",
    stock: 15,
    notas: {
      salida: "Bergamota de Reggio di Calabria",
      corazon: "Pimienta de Sichuan, Lavanda, Anís estrellado y Nuez moscada",
      fondo: "Ambroxan y Absoluto de Vainilla de Papúa Nueva Guinea"
    }
  },
  {
   id: 20,
    nombre: "Lattafa The Kingdom",
    marca: "Lattafa",
    precio: 42990,
    categoria: "Gourmand",
    acordes: ['dulce', 'cálido especiado', 'vainilla', 'lavanda', 'amaderado', 'ámbar'],
    tamanos: [
      { ml: '50 ml', precio: 31990, stock: 3 },
      { ml: '100 ml', precio: 42990, stock: 14 }
    ],
    descripcion: "Opulenta mezcla real con lavanda balsámica, cacao, vainilla y maderas dulces.",
    descripcionLarga: "Una fragancia majestuosa que combina la calidez de la vainilla y el cacao con toques herbales de lavanda y un elegante fondo amaderado.",
    imagen: "public/images/The-Kingdom-for-Men-Eau-De-Parfum-100ml-Lattafa-Lattafa-32060017.webp",
    stock: 17,
    notas: {
      salida: "Salvia, Lavanda y Pimienta rosa",
      corazon: "Vainilla, Cacao y Cardamomo",
      fondo: "Haba Tonka, Ámbar dorado y Madera de Cedro"
    }
  },

  
  {
    id: 21,
    nombre: "Bleu de Chanel EDP",
    marca: "Chanel",
    precio: 129990,
    categoria: "Cítricos",
    acordes: ['cítrico', 'amaderado', 'cálido especiado', 'fresco especiado', 'aromático', 'incienso'],
    tamanos: [
      { ml: '50 ml', precio: 99990, stock: 2 },
      { ml: '75 ml', precio: 114990, stock: 3 },
      { ml: '100 ml', precio: 129990, stock: 4 },
      { ml: '125 ml', precio: 149990, stock: 1 }
    ],
    descripcion: "Elegancia atemporal con notas de pomelo fresco, incienso y sándalo de Nueva Caledonia.",
    descripcionLarga: "El elogio a la libertad masculina. Un aroma aromático amaderado de estela pura, cautivadora e inconfundible.",
    imagen: "public/images/blue_channel.jpg",
    stock: 10,
    notas: {
      salida: "Pomelo, Limón, Menta y Pimienta Rosa",
      corazon: "Jengibre, Iso E Super, Nuez Moscada y Jazmín",
      fondo: "Incienso, Vetiver, Cedro, Sándalo y Pachulí"
    }
  },
  {
    id: 22,
    nombre: "Liquid Brun",
    marca: "French Avenue",
    precio: 30990,
    categoria: "Gourmand",
    acordes: ['cálido especiado', 'canela', 'vainilla', 'dulce', 'amaderado', 'licoroso', 'ron'],
    tamanos: [
      { ml: '50 ml', precio: 32990, stock: 4 },
      { ml: '100 ml', precio: 30990, stock: 12 }
    ],
    descripcion: "Adictiva y cálida mezcla de canela especiada, bourbon vainilla, praliné y madera de guayaco.",
    descripcionLarga: "Una de las fragancias gourmet más aclamadas de la perfumería boutique. Combina notas licorosas de ron con una canela envolvente y un fondo cremoso de vainilla.",
    imagen: "public/images/liqui_burn.jpg",
    stock: 16,
    notas: {
      salida: "Canela, Cardamomo, Flor de Naranjo y Bergamota",
      corazon: "Bourbon Vainilla y Resina de Elemi",
      fondo: "Praliné, Ambrosan, Almizcle y Madera de Guayaco"
    }
  },

  
  {
    id: 23,
    nombre: "YSL Y Eau de Parfum",
    marca: "Yves Saint Laurent",
    precio: 108990,
    categoria: "Frescos",
    acordes: ['aromático', 'amaderado', 'fresco especiado', 'afrutado', 'cítrico', 'herbal'],
    tamanos: [
      { ml: '75 ml', precio: 89990, stock: 4 },
      { ml: '100 ml', precio: 108990, stock: 7 },
      { ml: '125 ml', precio: 126990, stock: 3 }
    ],
    descripcion: "Equilibrio perfecto entre manzana verde crujiente, salvia aromática y haba tonka.",
    descripcionLarga: "Representa la autorrealización del hombre moderno. Una fragancia fougère profunda con notas amaderadas duraderas.",
    imagen: "public/images/ysl.webp",
    stock: 14,
    notas: {
      salida: "Manzana verde, Jengibre y Bergamota",
      corazon: "Salvia, Bayas de Enebro y Geranio",
      fondo: "Amberwood, Haba Tonka, Cedro y Vetiver"
    }
  },
  {
    id: 24,
    nombre: "YSL Myslf EDP",
    marca: "Yves Saint Laurent",
    precio: 105990,
    categoria: "Florales",
    acordes: ['cítrico', 'blanco floral', 'amaderado', 'fresco', 'pachulí'],
    tamanos: [
      { ml: '60 ml', precio: 85990, stock: 4 },
      { ml: '100 ml', precio: 105990, stock: 8 }
    ],
    descripcion: "Fusión moderna de azahar de Túnez, bergamota fresca y pachulí amaderado.",
    descripcionLarga: "Una declaración de masculinidad contemporánea. El contraste entre la delicadeza floral del azahar y maderas limpias.",
    imagen: "public/images/YSL Myslf.jpg",
    stock: 12,
    notas: {
      salida: "Bergamota de Calabria y Bergamota verde",
      corazon: "Flor de Azahar del Naranjo de Túnez",
      fondo: "Ambrofix (Ámbar) y Pachulí"
    }
  },

  
  {
    id: 25,
    nombre: "Lattafa Asad Bourbon",
    marca: "Lattafa",
    precio: 25990,
    categoria: "Orientales",
    acordes: ['cálido especiado', 'ron', 'vainilla', 'ámbar', 'amaderado', 'dulce'],
    tamanos: [
      { ml: '50 ml', precio: 21990, stock: 3 },
      { ml: '100 ml', precio: 25990, stock: 10 }
    ],
    descripcion: "Evolución opulenta del clásico Asad con rico concentrado de ron bourbon, ciruela y cacao.",
    descripcionLarga: "Sensualidad oscura y envolvente. Eleva la firma especiada con un toque borbonico, cacao amargo y resinas que garantizan máxima durabilidad.",
    imagen: "public/images/asad_bourbo.jpg",
    stock: 13,
    notas: {
      salida: "Ciruela madura, Pimienta negra y Lavanda",
      corazon: "Bourbon Vainilla, Ron y Cacao",
      fondo: "Ámbar dorado, Cuero y Madera de Cedro"
    }
  },
  {
    id: 26,
    nombre: "Lattafa Fakhar Black",
    marca: "Lattafa",
    precio: 32990,
    categoria: "Frescos",
    acordes: ['aromático', 'fresco', 'afrutado', 'fresco especiado', 'amaderado', 'verde'],
    tamanos: [
      { ml: '50 ml', precio: 23990, stock: 5 },
      { ml: '100 ml', precio: 32990, stock: 18 }
    ],
    descripcion: "Chispeante y versátil aroma de manzana verde, lavanda, jengibre y maderas ambaradas.",
    descripcionLarga: "La fragancia definitiva para el día a día. Combina la frescura jugosa de la manzana con la elegancia de la lavanda y un fondo masculino de ambroxan.",
    imagen: "public/images/fhackar_black.webp",
    stock: 23,
    notas: {
      salida: "Manzana verde, Bergamota y Jengibre",
      corazon: "Lavanda, Salvia, Bayas de Enebro y Geranio",
      fondo: "Haba Tonka, Ámbar, Cedro y Vetiver"
    }
  },


  {
    id: 27,
    nombre: "Afnan Turathi Blue",
    marca: "Afnan",
    precio: 38990,
    categoria: "Cítricos",
    acordes: ['cítrico', 'ámbar', 'fresco', 'amaderado', 'fresco especiado', 'aromático'],
    tamanos: [
      { ml: '50 ml', precio: 28990, stock: 4 },
      { ml: '100 ml', precio: 38990, stock: 14 }
    ],
    descripcion: "Elegante explosión cítrica de bergamota azul, ámbar cálido y almizcle terroso.",
    descripcionLarga: "Un referente de frescura refinada. Destaca por su apertura cítrica chispeante que evoluciona hacia un ámbar limpio y amaderado altamente elogiado.",
    imagen: "public/images/turathi_blue.webp",
    stock: 18,
    notas: {
      salida: "Bergamota de Calabria y Cítricos italianos",
      corazon: "Ámbar mineral y Notas Amaderadas",
      fondo: "Almizcle blanco, Pachulí y Especias suaves"
    }
  },
  {
    id: 28,
   nombre: "Maison Alhambra Jean Lowe Vibe",
    marca: "Maison Alhambra",
    precio: 36990,
    categoria: "Cítricos",
    acordes: ['cítrico', 'fresco', 'afrutado', 'aromático', 'blanco floral', 'amaderado'],
    tamanos: [
      { ml: '50 ml', precio: 26990, stock: 3 },
      { ml: '100 ml', precio: 36990, stock: 12 }
    ],
    descripcion: "Vibrante acorde de toronja fresca, jengibre picante, romero y ambroxan marino.",
    descripcionLarga: "Energía pura y sofisticación. Diseñada para destacar en climas cálidos con una ráfaga Cítrica-Especiada de alta proyección.",
    imagen: "public/images/jean_lowe.webp",
    stock: 15,
    notas: {
      salida: "Toronja rosada, Jengibre fresco y Bergamota",
      corazon: "Romero, Salvia silvestre y Geranio",
      fondo: "Ambroxan, Ámbar cristalino y Maderas rubias"
    }
  },

 
  {
    id: 29,
    nombre: "Atlantis Extrait",
    marca: "French Avenue",
    precio: 48990,
    categoria: "Frescos",
    acordes: ['marino', 'fresco', 'cítrico', 'aromático', 'amaderado'],
    tamanos: [
      { ml: '50 ml', precio: 35990, stock: 4 },
      { ml: '100 ml', precio: 48990, stock: 11 }
    ],
    descripcion: "Exclusivo extracto marino e intensamente fresco con cítricos mediterráneos y ámbar gris.",
    descripcionLarga: "Una interpretación de lujo de la frescura oceánica. Atlantis Extrait ofrece una concentración impecable con brisa marina, bergamota chispeante y un fondo profundo de ámbar gris.",
    imagen: "public/images/atlantis_extrait.webp",
    stock: 15,
    notas: {
      salida: "Bergamota de Calabria, Cítricos marinos y Pimienta rosa",
      corazon: "Notas oceánicas, Salvia silvestre y Lavanda",
      fondo: "Ámbar gris, Almizcle blanco y Madera de Guayaco"
    }
  },
  {
    id: 30,
    nombre: "Afnan 9 PM",
    marca: "Afnan",
    precio: 35990,
    categoria: "Gourmand",
    acordes: ['dulce', 'afrutado', 'cálido especiado', 'vainilla', 'lavanda', 'amaderado'],
    descripcion: "Dulce combinación nocturna de manzana verde, canela, lavanda y tonka.",
    descripcionLarga: "El rey de las salidas nocturnas. Un perfume juvenil, vibrante y dulce con una fijación excepcional.",
    imagen: "public/images/afnan.webp",
    stock: 28,
    notas: {
      salida: "Manzana, Canela, Lavanda silvestre y Bergamota",
      corazon: "Flor de Azahar del Naranjo y Lirio de los Valles",
      fondo: "Vainilla, Habba Tonka, Ámbar y Pachulí"
    }
  },
  {
    id: 31,
    nombre: "Versace Eros Flame",
    marca: "Versace",
    precio: 84990,
    categoria: "Orientales",
    acordes: ['cítrico', 'cálido especiado', 'amaderado', 'vainilla', 'aromático', 'fresco especiado'],
    tamanos: [
      { ml: '75 ml', precio: 69990, stock: 4 },
      { ml: '100 ml', precio: 84990, stock: 6 },
      { ml: '125 ml', precio: 99990, stock: 3 }
    ],
    descripcion: "Contraste apasionado entre cítricos italianos picantes, pimienta y tonka.",
    descripcionLarga: "Un perfume encendido de pasión. Mezcla chinotto italiano con romero, pimienta negra y maderas sensuales.",
    imagen: "public/images/versace_eros.webp",
    stock: 13,
    notas: {
      salida: "Chinotto, Mandarina, Pimienta Negra, Romero y Limón",
      corazon: "Pimiento, Geranio y Rosa",
      fondo: "Vainilla, Habba Tonka, Cedro de Texas, Sándalo y Pachulí"
    }
  },
  {
    id: 32,
    nombre: "Versace Dylan Blue",
    marca: "Versace",
    precio: 79990,
    categoria: "Frescos",
    acordes: ['cítrico', 'fresco especiado', 'acuático', 'amaderado', 'incienso', 'aromático'],
    tamanos: [
      { ml: '50 ml', precio: 59990, stock: 3 },
      { ml: '75 ml', precio: 69990, stock: 4 },
      { ml: '100 ml', precio: 79990, stock: 6 },
      { ml: '125 ml', precio: 92990, stock: 3 }
    ],
    descripcion: "Aroma mediterráneo azul con notas acuáticas, bergamota, incienso y pimienta.",
    descripcionLarga: "Captura la frescura del mar y la sofisticación nocturna. Muy versátil y alabado en cualquier época del año.",
    imagen: "public/images/dylan_blue.jpg",
    stock: 16,
    notas: {
      salida: "Notas acuáticas, Bergamota de Calabria, Pomelo y Hojas de Higuera",
      corazon: "Hojas de Violeta, Papiro, Pachulí, Pimienta Negra y Ambroxan",
      fondo: "Almizcle, Incienso, Haba Tonka y Azafrán"
    }
  },
  {
    id: 33,
    nombre: "Lattafa Teriaq Intense",
    marca: "Lattafa",
    precio: 42990,
    categoria: "Gourmand",
    acordes: ['dulce', 'cálido especiado', 'licoroso', 'ron', 'vainilla', 'ámbar'],
    tamanos: [
      { ml: '50 ml', precio: 31990, stock: 3 },
      { ml: '100 ml', precio: 42990, stock: 12 }
    ],
    descripcion: "Intensa y opulenta poción licorosa de ron, canela, cuero suave y miel de vainilla.",
    descripcionLarga: "Una propuesta gourmand de nivel nicho. Teriaq Intense eleva la sensualidad con acordes borbónicos, especias ardientes y una dulzura cremosa de ámbar y vainilla.",
    imagen: "public/images/Lattafa-Teriaq-Intense-Perfume-Lattafa-Teriaq-Intense-Decant-5-8ML.webp",
    stock: 15,
    notas: {
      salida: "Ron añejo, Canela en rama y Bergamota",
      corazon: "Miel dorada, Cuero fino y Ciruela madura",
      fondo: "Vainilla Bourbon, Ámbar denso y Haba Tonka"
    }
  },
  {
    id: 34,
   nombre: "Lattafa Art of Universe",
    marca: "Lattafa",
    precio: 39990,
    categoria: "Amaderados",
    acordes: ['amaderado', 'cálido especiado', 'ámbar', 'aromático', 'fresco especiado'],
    tamanos: [
      { ml: '50 ml', precio: 29990, stock: 4 },
      { ml: '100 ml', precio: 39990, stock: 10 }
    ],
    descripcion: "Mística mezcla cósmica con maderas nobles, cardamomo, iris y resinas doradas.",
    descripcionLarga: "Parte de la colección artística de Lattafa. Combina la calidez del cardamomo y la elegancia del iris sobre una base amaderada y ambarada altamente envolvente.",
    imagen: "public/images/Lattafa-Art-Of-Universe-EDP.jpg",
    stock: 14,
    notas: {
      salida: "Cardamomo, Bergamota y Pimienta negra",
      corazon: "Iris mantecoso, Incienso y Salvia",
      fondo: "Sándalo cremoso, Ámbar mineral y Cedro del Atlas"
    }
  },
  {
    id: 35,
    nombre: "Lattafa Khamrah Qahwa",
    marca: "Lattafa",
    precio: 42990,
    categoria: "Gourmand",
    acordes: ['cálido especiado', 'café', 'dulce', 'canela', 'vainilla', 'amaderado'],
    descripcion: "La versión enriquecida de Khamrah con notas de café arábigo tostado y cardamomo.",
    descripcionLarga: "Añade un toque picante y un concentrado de café tostado a la fórmula original de Khamrah. Pura adicción gourmet.",
    imagen: "public/images/khamra_qahwa.webp",
    stock: 20,
    notas: {
      salida: "Canela, Cardamomo y Jengibre",
      corazon: "Café, Praliné, Dátiles y Confite",
      fondo: "Vainilla, Habba Tonka, Benzoin y Ámbar"
    }
  },
  {
    id: 36,
    nombre: "Armaf Odyssey Aqua",
    marca: "Armaf",
    precio: 34990,
    categoria: "Frescos",
    acordes: ['fresco', 'cítrico', 'acuático', 'aromático', 'amaderado'],
    tamanos: [
      { ml: '50 ml', precio: 24990, stock: 5 },
      { ml: '100 ml', precio: 34990, stock: 15 }
    ],
    descripcion: "Refrescante brisa acuática con toronja chispeante, pimienta rosa y menta mentolada.",
    descripcionLarga: "Elegancia vital para climas cálidos. Fusiona acordes marinos vigorizantes con toques mentolados y un fondo amaderado limpio de gran fijación.",
    imagen: "public/images/Armaf-Odyssey-Aqua-2.jpg",
    stock: 20,
    notas: {
      salida: "Toronja rosada, Naranja sanguina y Menta fresca",
      corazon: "Notas acuáticas, Pimienta rosa y Lavanda",
      fondo: "Ambroxan, Madera de Cedro y Musgo de roble"
    }
  }
];