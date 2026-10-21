// src/data/productos.js

export const productosIniciales = [
  // --- AZZARO ---
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

  // --- EMPORIO ARMANI ---
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

  // --- PACO RABANNE ---
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

  // --- RAYHAAN ---
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

  // --- LATTAFA ---
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
    nombre: "Lattafa Yara EDP",
    marca: "Lattafa",
    precio: 29990,
    categoria: "Florales",
    acordes: ['dulce', 'atalcado', 'tropical', 'afrutado', 'floral', 'vainilla'],
    descripcion: "Suave y cremosa mezcla de orquídeas, frutas tropicales y crema batida de vainilla.",
    descripcionLarga: "Icono femenino irresistible. Entrega una sensación atalcada, dulce y frutal extremadamente reconfortante.",
    imagen: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    stock: 25,
    notas: {
      salida: "Orquídea, Heliotropo y Tangerina",
      corazon: "Acorde Gourmand y Frutas tropicales",
      fondo: "Vainilla, Almizcle y Sándalo"
    }
  },
  {
    id: 16,
    nombre: "Lattafa Bade'e Al Oud Honor & Glory",
    marca: "Lattafa",
    precio: 38990,
    categoria: "Gourmand",
    acordes: ['afrutado', 'dulce', 'cálido especiado', 'vainilla', 'amaderado'],
    descripcion: "Exquisita armonía de piña brulée, canela, cúrcuma y crema de vainilla.",
    descripcionLarga: "Una obra maestra gourmet. Mezcla el dulzor frutal de la piña caramelizada con especias nobles y fondo amaderado.",
    imagen: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    stock: 16,
    notas: {
      salida: "Piña Brulee y Cúrcuma",
      corazon: "Canela, Pimienta negra y Benzoin",
      fondo: "Vainilla, Cashmeran, Sándalo y Moss"
    }
  },

  // --- MAISON ALHAMBRA ---
  {
    id: 17,
    nombre: "Maison Alhambra Jean Lowe Noir",
    marca: "Maison Alhambra",
    precio: 35990,
    categoria: "Amaderados",
    acordes: ['incienso', 'amaderado', 'cuero', 'rosa', 'cálido especiado', 'ahumado'],
    descripcion: "Profunda combinación de incienso, rosa de Damasco y madera de Oud ahumada.",
    descripcionLarga: "Elegancia nocturna de nicho. Inspirado en perfumes orientales oscuros con una estela sofisticada de cuero y resinas.",
    imagen: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&q=80&w=600",
    stock: 14,
    notas: {
      salida: "Incienso y Salvia",
      corazon: "Rosa, Azafrán y Pachulí",
      fondo: "Oud, Cuero y Ámbar"
    }
  },
  {
    id: 18,
    nombre: "Maison Alhambra Porto Neroli",
    marca: "Maison Alhambra",
    precio: 31990,
    categoria: "Cítricos",
    acordes: ['cítrico', 'blanco floral', 'fresco', 'aromático', 'verde'],
    descripcion: "Chispeante aroma de azahar italiano, neroli, bergamota y brisa de la Riviera.",
    descripcionLarga: "Un viaje directo a la costa italiana. Captura la brisa fresca del mar y los campos de limoneros en flor.",
    imagen: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600",
    stock: 19,
    notas: {
      salida: "Neroli, Limón de Amalfi, Mandarina y Bergamota",
      corazon: "Flor de Azahar del Naranjo, Jazmín y Pitósporo",
      fondo: "Ámbar, Angélica y Almizcle"
    }
  },

  // --- DIOR ---
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
    nombre: "Dior Fahrenheit EDT",
    marca: "Dior",
    precio: 109990,
    categoria: "Amaderados",
    acordes: ['cuero', 'amaderado', 'fresco especiado', 'verde', 'floral', 'ozónico'],
    tamanos: [
      { ml: '50 ml', precio: 84990, stock: 2 },
      { ml: '75 ml', precio: 96990, stock: 2 },
      { ml: '100 ml', precio: 109990, stock: 2 },
      { ml: '125 ml', precio: 124990, stock: 1 }
    ],
    descripcion: "Leyenda olfativa única con cuero suave, violeta y acorde amaderado ahumado.",
    descripcionLarga: "Una firma audaz y atemporal que juega con los contrastes del frío y el fuego. Fusión inolvidable de flor de violeta y cuero.",
    imagen: "https://images.unsplash.com/photo-1506812574058-fc75fa93fead?auto=format&fit=crop&q=80&w=600",
    stock: 7,
    notas: {
      salida: "Flor de Múscat, Lavanda, Cedro, Manzanilla y Hawthorn",
      corazon: "Hojas de Violeta, Nuez Moscada, Cedro y Sándalo",
      fondo: "Cuero, Vetiver, Almizcle y Ámbar"
    }
  },

  // --- CHANEL ---
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
    nombre: "Chanel Allure Homme Sport Eau Extrême",
    marca: "Chanel",
    precio: 124990,
    categoria: "Frescos",
    acordes: ['aromático', 'fresco especiado', 'cítrico', 'amaderado', 'dulce', 'verde'],
    tamanos: [
      { ml: '75 ml', precio: 104990, stock: 2 },
      { ml: '100 ml', precio: 124990, stock: 4 },
      { ml: '125 ml', precio: 142990, stock: 2 }
    ],
    descripcion: "Fragancia de alta adrenalina con mandarina siciliana, ciprés y tonka sensual.",
    descripcionLarga: "Para el hombre que busca sensaciones extremas. Combina notas efervescentes con un fondo almizclado intenso.",
    imagen: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=600",
    stock: 8,
    notas: {
      salida: "Mandarina, Mint, Ciprés y Salvia",
      corazon: "Pimienta picante",
      fondo: "Haba Tonka, Almizcle, Cedro y Sándalo"
    }
  },

  // --- YVES SAINT LAURENT ---
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

  // --- GUERLAIN ---
  {
    id: 25,
    nombre: "Guerlain L'Homme Idéal EDP",
    marca: "Guerlain",
    precio: 112990,
    categoria: "Gourmand",
    acordes: ['dulce', 'almendra', 'cuero', 'cálido especiado', 'afrutado', 'amaderado'],
    descripcion: "Sensual fragancia con almendra amarga, cuero elegante y vainilla de Madagascar.",
    descripcionLarga: "El hombre ideal es un mito, pero su perfume es una realidad. Mezcla de almendra cautivadora con especias cálidas.",
    imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    stock: 9,
    notas: {
      salida: "Almendra, Especias, Lavanda y Bergamota",
      corazon: "Cereza, Vainilla, Incienso y Rosa",
      fondo: "Cuero, Habba Tonka y Sándalo"
    }
  },
  {
    id: 26,
    nombre: "Guerlain Aqua Allegoria Mandarine Basilic",
    marca: "Guerlain",
    precio: 98990,
    categoria: "Cítricos",
    acordes: ['cítrico', 'fresco especiado', 'herbal', 'verde', 'fresco'],
    descripcion: "Refrescante destello de mandarina jugosa combinada con albahaca fresca.",
    descripcionLarga: "Un perfume chispeante e iluminado por el sol. Celebra la jugosidad cítrica de la mandarina con finas notas herbales.",
    imagen: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600",
    stock: 11,
    notas: {
      salida: "Clementina, Naranjo amargo, Flor de Azahar y Té Verde",
      corazon: "Mandarina, Albahaca, Manzanilla y Peonía",
      fondo: "Sándalo y Ámbar"
    }
  },

  // --- CALVIN KLEIN ---
  {
    id: 27,
    nombre: "Calvin Klein CK One EDT",
    marca: "Calvin Klein",
    precio: 39990,
    categoria: "Cítricos",
    acordes: ['cítrico', 'verde', 'fresco', 'blanco floral', 'aromático'],
    descripcion: "La icónica fragancia unisex ultra fresca con té verde, piña y almizcle.",
    descripcionLarga: "Un clásico universal que transmite pureza y libertad. Perfecto para el uso diario y para compartir en pareja.",
    imagen: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    stock: 35,
    notas: {
      salida: "Limón, Notas Verdes, Bergamota, Piña y Mandarina",
      corazon: "Lirio de los Valles, Jazmín, Violeta y Nuez Moscada",
      fondo: "Acorde Verde, Almizcle, Cedro, Sándalo y Ámbar"
    }
  },
  {
    id: 28,
    nombre: "Calvin Klein Eternity for Men",
    marca: "Calvin Klein",
    precio: 45990,
    categoria: "Frescos",
    acordes: ['aromático', 'fresco especiado', 'cítrico', 'amaderado', 'herbal'],
    descripcion: "Aroma fougère intemporal con lavanda, salvia, geranio y sándalo.",
    descripcionLarga: "Una expresión de amor eterno y espíritu familiar. Combina acordes florales masculinos con madera cálida.",
    imagen: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    stock: 20,
    notas: {
      salida: "Lavanda, Limón, Bergamota y Salvia",
      corazon: "Baya de Enebro, Salvia, Cilantro, Geranio y Azahar",
      fondo: "Sándalo, Vetiver, Palo de Rosa de Brasil y Ámbar"
    }
  },

  // --- OTRAS MARCAS VIRALES ---
  {
    id: 29,
    nombre: "Club de Nuit Intense Man Limited Edition",
    marca: "Armaf",
    precio: 59990,
    categoria: "Cítricos",
    acordes: ['cítrico', 'afrutado', 'amaderado', 'ahumado', 'cuero', 'fresco'],
    tamanos: [
      { ml: '100 ml', precio: 59990, stock: 18 },
      { ml: '150 ml', precio: 79990, stock: 6 }
    ],
    descripcion: "Potente acorde de piña ahumada, abedul y bergamota de proyección gigante.",
    descripcionLarga: "El rey indiscutido de los perfumes cumplidores. Un aroma amaderado especiado con notas cítricas y fondo ahumado.",
    imagen: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    stock: 24,
    notas: {
      salida: "Piña, Limón, Lima, Bergamota y Pimienta Negra",
      corazon: "Abedul, Jazmín y Rosa",
      fondo: "Almizcle Blanco, Ámbar Gris, Pachulí y Vainilla"
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
    nombre: "Parfums de Marly Layton",
    marca: "Parfums de Marly",
    precio: 189990,
    categoria: "Orientales",
    acordes: ['cálido especiado', 'vainilla', 'amaderado', 'afrutado', 'lavanda', 'fresco'],
    descripcion: "Alta perfumería francesa con manzana acaramelada, lavanda noble y vainilla.",
    descripcionLarga: "Elegancia aristocrática en estado puro. Un perfume oriental seductor que destaca por su opulencia y refinamiento.",
    imagen: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&q=80&w=600",
    stock: 5,
    notas: {
      salida: "Manzana, Lavanda, Bergamota y Mandarina",
      corazon: "Jazmín, Violeta y Geranio",
      fondo: "Vainilla, Cardamomo, Sándalo, Pimienta y Pachulí"
    }
  },
  {
    id: 34,
    nombre: "Club de Nuit Untold",
    marca: "Armaf",
    precio: 58990,
    categoria: "Orientales",
    acordes: ['ámbar', 'cálido especiado', 'amaderado', 'dulce', 'blanco floral'],
    descripcion: "Aroma ambarado y azucarado con azafrán, madera de ámbar y jazmín cristalino.",
    descripcionLarga: "Inspirado en los aromas ambarados más lujosos del mundo. Una estela de azafrán y resinas que dura días en la ropa.",
    imagen: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=600",
    stock: 17,
    notas: {
      salida: "Azafrán y Jazmín",
      corazon: "Amberwood y Ámbar Gris",
      fondo: "Resina de Abeto y Cedro"
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
    nombre: "Viktor&Rolf Spicebomb Extreme",
    marca: "Viktor&Rolf",
    precio: 104990,
    categoria: "Orientales",
    acordes: ['cálido especiado', 'tabaco', 'vainilla', 'dulce', 'amaderado', 'aromático'],
    tamanos: [
      { ml: '50 ml', precio: 82990, stock: 3 },
      { ml: '100 ml', precio: 104990, stock: 6 }
    ],
    descripcion: "Explosión especiada de tabaco rubio, pimienta negra, comino y vainilla bourbon.",
    descripcionLarga: "Una bomba olfativa de seducción para el invierno. Su frasco en forma de granada encierra una estela cálida e inolvidable.",
    imagen: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    stock: 9,
    notas: {
      salida: "Pimienta negra, Alcaravea y Lavanda",
      corazon: "Tabaco rico y Canela",
      fondo: "Vainilla de Borbón y Notas de Ámbar"
    }
  }
];