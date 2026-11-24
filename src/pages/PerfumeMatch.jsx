import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { productosIniciales } from '../data/productos';

const PREGUNTAS_QUIZ = [
  {
    id: 'plan',
    paso: 'Pregunta 1 de 10',
    titulo: 'Es viernes por la noche, ¿cuál es tu plan ideal?',
    subtitulo: 'Tu panorama favorito dice mucho sobre el aura que dejas al caminar.',
    opciones: [
      {
        id: 'cita',
        titulo: 'Cena a la luz de las velas',
        descripcion: 'Conversación íntima, miradas cómplices y un toque de misterio.',
        icono: 'fa-wine-glass',
        arquetipo: 'dulce',
        tagResultado: 'Vibra romántica y envolvente',
        keywords: ['vainilla', 'dulce', 'floral', 'rosa', 'ambar', 'intenso', 'cacao']
      },
      {
        id: 'fiesta',
        titulo: 'Fiesta VIP hasta el amanecer',
        descripcion: 'Luces de neón, pista llena y ganas de ser el alma de la noche.',
        icono: 'fa-champagne-glasses',
        arquetipo: 'dulce',
        tagResultado: 'Energía nocturna imparable',
        keywords: ['dulce', 'caramelo', 'tonka', 'vainilla', 'afrutado', 'intenso', 'licoroso']
      },
      {
        id: 'aire_libre',
        titulo: 'Terraza al atardecer o escapada',
        descripcion: 'Brisa fresca, buena compañía y cero complicaciones.',
        icono: 'fa-sun',
        arquetipo: 'fresco',
        tagResultado: 'Espíritu libre y refrescante',
        keywords: ['citrico', 'fresco', 'bergamota', 'limon', 'acuatico', 'marino', 'verde']
      },
      {
        id: 'gala',
        titulo: 'Evento exclusivo o galería de arte',
        descripcion: 'Look impecable, detalles de lujo y presencia inolvidable.',
        icono: 'fa-crown',
        arquetipo: 'elegante',
        tagResultado: 'Estilo sofisticado y de lujo',
        keywords: ['amaderado', 'aromatico', 'floral', 'iris', 'cedro', 'elegante', 'almizcle']
      }
    ]
  },
  {
    id: 'destino',
    paso: 'Pregunta 2 de 10',
    titulo: 'Elige un pasaje solo de ida, ¿a dónde te vas?',
    subtitulo: 'Cada rincón del mundo tiene su propia firma aromática.',
    opciones: [
      {
        id: 'amalfi',
        titulo: 'La Costa Amalfitana en verano',
        descripcion: 'Sol mediterráneo, limoneros en flor y mar cristalino.',
        icono: 'fa-umbrella-beach',
        arquetipo: 'fresco',
        tagResultado: 'Alma mediterránea y cítrica',
        keywords: ['citrico', 'mandarina', 'bergamota', 'limon', 'fresco', 'acuatico', 'menta']
      },
      {
        id: 'paris',
        titulo: 'Un jardín secreto en París',
        descripcion: 'Pétalos aterciopelados, romance clásico y elegancia natural.',
        icono: 'fa-spa',
        arquetipo: 'elegante',
        tagResultado: 'Encanto floral parisino',
        keywords: ['floral', 'rosa', 'peonia', 'jazmin', 'iris', 'blanco floral', 'atalcado']
      },
      {
        id: 'dubai',
        titulo: 'Un palacio bajo las estrellas en Dubái',
        descripcion: 'Especias exóticas, maderas preciosas y lujo hipnótico.',
        icono: 'fa-moon',
        arquetipo: 'exotico',
        tagResultado: 'Fascinación oriental y exótica',
        keywords: ['oud', 'oriental', 'especiado', 'canela', 'ambar', 'incienso', 'calido especiado']
      },
      {
        id: 'bosque',
        titulo: 'Una cabaña de diseño en el bosque',
        descripcion: 'Aire puro, madera noble, chimenea encendida y calma absoluta.',
        icono: 'fa-tree',
        arquetipo: 'elegante',
        tagResultado: 'Carácter amaderado y noble',
        keywords: ['amaderado', 'madera', 'cedro', 'sandalo', 'vetiver', 'terroso', 'musgoso']
      }
    ]
  },
  {
    id: 'alimento',
    paso: 'Pregunta 3 de 10',
    titulo: 'Si tu personalidad fuera un plato o alimento, ¿cuál sería?',
    subtitulo: 'Dime qué sabores te conquistan en la mesa y sabremos qué notas van contigo.',
    opciones: [
      {
        id: 'postre',
        titulo: 'Volcán de chocolate con vainilla y caramelo',
        descripcion: 'Dulce, cálido, adictivo e imposible de olvidar.',
        icono: 'fa-candy-cane',
        arquetipo: 'dulce',
        tagResultado: 'Toque gourmand y adictivo',
        keywords: ['dulce', 'vainilla', 'caramelo', 'tonka', 'afrutado', 'coco', 'almendra']
      },
      {
        id: 'ceviche',
        titulo: 'Ceviche fresco con limón, naranja y menta',
        descripcion: 'Chispeante, ligero, vibrante y lleno de energía.',
        icono: 'fa-droplet',
        arquetipo: 'fresco',
        tagResultado: 'Frescura cítrica y vibrante',
        keywords: ['citrico', 'fresco', 'menta', 'limon', 'bergamota', 'acuatico', 'ozonico']
      },
      {
        id: 'especiado',
        titulo: 'Plato oriental con canela, cardamomo y frutos secos',
        descripcion: 'Intenso, exótico y con capas llenas de carácter.',
        icono: 'fa-fire',
        arquetipo: 'exotico',
        tagResultado: 'Carácter intenso y especiado',
        keywords: ['especiado', 'canela', 'oud', 'cafe', 'tabaco', 'calido especiado', 'ron']
      },
      {
        id: 'gourmet',
        titulo: 'Tabla de quesos finos, higos y frutos rojos',
        descripcion: 'Sofisticado, equilibrado y con un toque de distinción.',
        icono: 'fa-gem',
        arquetipo: 'elegante',
        tagResultado: 'Elegancia gourmet y refinada',
        keywords: ['floral', 'rosa', 'amaderado', 'aromatico', 'lavanda', 'atalcado']
      }
    ]
  },
  {
    id: 'outfit',
    paso: 'Pregunta 4 de 10',
    titulo: '¿Cuál es tu look infalible cuando quieres sentirte imparable?',
    subtitulo: 'Tu estilo al vestir y tu perfume son mejores amigos.',
    opciones: [
      {
        id: 'cuero',
        titulo: 'Chaqueta de cuero o tonos oscuros seductores',
        descripcion: 'Rebelde, magnético y con mucha seguridad.',
        icono: 'fa-fire',
        arquetipo: 'dulce',
        tagResultado: 'Estilo audaz y magnético',
        keywords: ['cuero', 'vainilla', 'ambar', 'dulce', 'tabaco', 'ahumado']
      },
      {
        id: 'lino',
        titulo: 'Lino blanco, denim claro y gafas de sol',
        descripcion: 'Relajado, pulcro y naturalmente atractivo.',
        icono: 'fa-glasses',
        arquetipo: 'fresco',
        tagResultado: 'Frescura casual impecable',
        keywords: ['citrico', 'fresco', 'bergamota', 'acuatico', 'marino', 'verde', 'herbal']
      },
      {
        id: 'sastre',
        titulo: 'Blazer estructurado o vestido satinado',
        descripcion: 'Corte impecable, elegancia pura y cero esfuerzo.',
        icono: 'fa-shirt',
        arquetipo: 'elegante',
        tagResultado: 'Elegancia atemporal',
        keywords: ['amaderado', 'floral', 'rosa', 'cedro', 'aromatico', 'lavanda']
      },
      {
        id: 'joyas',
        titulo: 'Accesorios dorados y prendas con personalidad única',
        descripcion: 'Opulento, exótico y hecho para destacar.',
        icono: 'fa-crown',
        arquetipo: 'exotico',
        tagResultado: 'Aura opulenta y exótica',
        keywords: ['oud', 'oriental', 'especiado', 'ambar', 'incienso', 'licoroso']
      }
    ]
  },
  {
    id: 'estacion',
    paso: 'Pregunta 5 de 10',
    titulo: 'Si pudieras vivir en una sola estación del año, ¿cuál sería?',
    subtitulo: 'La temperatura ideal revela qué notas florecen mejor en tu piel.',
    opciones: [
      {
        id: 'verano',
        titulo: 'Verano eterno junto al océano',
        descripcion: 'Días largos, sol radiante y brisa salada.',
        icono: 'fa-sun',
        arquetipo: 'fresco',
        tagResultado: 'Energía solar y veraniega',
        keywords: ['citrico', 'fresco', 'limon', 'mandarina', 'acuatico', 'marino', 'tropical']
      },
      {
        id: 'primavera',
        titulo: 'Primavera llena de flores recién abiertas',
        descripcion: 'Luz suave, jardines en flor y aire renovado.',
        icono: 'fa-spa',
        arquetipo: 'elegante',
        tagResultado: 'Delicadeza floral primaveral',
        keywords: ['floral', 'rosa', 'peonia', 'jazmin', 'iris', 'verde', 'blanco floral']
      },
      {
        id: 'otono',
        titulo: 'Otoño dorado con tardes de café',
        descripcion: 'Hojas secas, abrigos suaves y calidez envolvente.',
        icono: 'fa-leaf',
        arquetipo: 'dulce',
        tagResultado: 'Calidez otoñal envolvente',
        keywords: ['vainilla', 'caramelo', 'tonka', 'dulce', 'cafe', 'almendra']
      },
      {
        id: 'invierno',
        titulo: 'Invierno nocturno frente a la chimenea',
        descripcion: 'Noches frías, maderas nobles y aromas profundos.',
        icono: 'fa-snowflake',
        arquetipo: 'exotico',
        tagResultado: 'Profundidad intensa de invierno',
        keywords: ['amaderado', 'oud', 'ambar', 'especiado', 'canela', 'ahumado', 'cuero']
      }
    ]
  },
  {
    id: 'superpoder',
    paso: 'Pregunta 6 de 10',
    titulo: 'Si pudieras elegir un superpoder real, ¿cuál tendrías?',
    subtitulo: 'Tu elección revela cómo te gusta moverte y conectar con el mundo.',
    opciones: [
      {
        id: 'carisma',
        titulo: 'Carisma magnético instantáneo',
        descripcion: 'Caer bien al instante y dejar una impresión inolvidable en todos.',
        icono: 'fa-heart',
        arquetipo: 'dulce',
        tagResultado: 'Carisma magnético que roba miradas',
        keywords: ['dulce', 'vainilla', 'afrutado', 'caramelo', 'tonka', 'ambar']
      },
      {
        id: 'tiempo',
        titulo: 'Controlar el tiempo a tu antojo',
        descripcion: 'Moverte siempre con calma, precisión y seguridad sin afán.',
        icono: 'fa-clock',
        arquetipo: 'elegante',
        tagResultado: 'Presencia distinguida y serena',
        keywords: ['amaderado', 'aromatico', 'cedro', 'vetiver', 'lavanda', 'sandalo']
      },
      {
        id: 'teletransporte',
        titulo: 'Teletransportarte a cualquier rincón oculto',
        descripcion: 'Explorar lugares misteriosos y vivir experiencias fuera de lo común.',
        icono: 'fa-wand-magic-sparkles',
        arquetipo: 'exotico',
        tagResultado: 'Espíritu misterioso y fuera de serie',
        keywords: ['oud', 'oriental', 'especiado', 'incienso', 'ahumado', 'cuero']
      },
      {
        id: 'volar',
        titulo: 'Volar libremente sobre el océano',
        descripcion: 'Sentir el aire puro, la libertad total y una energía sin límites.',
        icono: 'fa-feather',
        arquetipo: 'fresco',
        tagResultado: 'Energía libre y armoniosa',
        keywords: ['fresco', 'citrico', 'acuatico', 'marino', 'ozonico', 'fresco especiado']
      }
    ]
  },
  {
    id: 'pelicula',
    paso: 'Pregunta 7 de 10',
    titulo: 'Si tu vida fuera una película, ¿cuál sería?',
    subtitulo: 'Cada historia merece una esencia protagonista.',
    opciones: [
      {
        id: 'romance',
        titulo: 'Diario de una Pasión',
        descripcion: 'Química explosiva, momentos intensos y final épico.',
        icono: 'fa-heart',
        arquetipo: 'dulce',
        tagResultado: 'Química apasionada y dulce',
        keywords: ['vainilla', 'floral', 'rosa', 'dulce', 'afrutado', 'ambar']
      },
      {
        id: 'aventura',
        titulo: 'Piratas del Caribe',
        descripcion: 'Libertad total, adrenalina y horizontes abiertos.',
        icono: 'fa-compass',
        arquetipo: 'fresco',
        tagResultado: 'Espíritu aventurero y fresco',
        keywords: ['citrico', 'fresco', 'bergamota', 'acuatico', 'verde', 'marino']
      },
      {
        id: 'alta_sociedad',
        titulo: 'El Diablo Viste a la Moda',
        descripcion: 'Pasarelas, arquitectura clásica y glamour eterno.',
        icono: 'fa-film',
        arquetipo: 'elegante',
        tagResultado: 'Glamour cinematográfico',
        keywords: ['floral', 'amaderado', 'iris', 'atalcado', 'blanco floral', 'cedro']
      },
      {
        id: 'misterio',
        titulo: 'Dune',
        descripcion: 'Secretos ocultos, intriga y magnetismo oscuro.',
        icono: 'fa-moon',
        arquetipo: 'exotico',
        tagResultado: 'Intriga y magnetismo oriental',
        keywords: ['oud', 'oriental', 'especiado', 'canela', 'incienso', 'terroso']
      }
    ]
  },
  {
    id: 'accesorio',
    paso: 'Pregunta 8 de 10',
    titulo: 'Elige un amuleto que llevarías siempre contigo:',
    subtitulo: 'Los pequeños detalles revelan tu verdadera esencia.',
    opciones: [
      {
        id: 'reloj',
        titulo: 'Un reloj clásico de colección',
        descripcion: 'Precisión, distinción y elegancia que nunca falla.',
        icono: 'fa-crown',
        arquetipo: 'elegante',
        tagResultado: 'Distinción clásica',
        keywords: ['amaderado', 'cedro', 'aromatico', 'vetiver', 'lavanda', 'musgoso']
      },
      {
        id: 'brujula',
        titulo: 'Una brújula hacia la próxima escapada',
        descripcion: 'Curiosidad, aire puro y movimiento constante.',
        icono: 'fa-compass',
        arquetipo: 'fresco',
        tagResultado: 'Frescura en movimiento',
        keywords: ['fresco', 'citrico', 'marino', 'acuatico', 'menta', 'herbal']
      },
      {
        id: 'llave',
        titulo: 'Una llave dorada hacia fiestas secretas',
        descripcion: 'Carisma, diversión y noches llenas de historia.',
        icono: 'fa-key',
        arquetipo: 'dulce',
        tagResultado: 'Carisma nocturno irresistible',
        keywords: ['dulce', 'caramelo', 'tonka', 'vainilla', 'tropical', 'afrutado']
      },
      {
        id: 'talisman',
        titulo: 'Un talismán antiguo tallado en madera exótica',
        descripcion: 'Carácter místico, profundidad y autenticidad.',
        icono: 'fa-gem',
        arquetipo: 'exotico',
        tagResultado: 'Misticismo amaderado y especiado',
        keywords: ['oud', 'sandalo', 'oriental', 'especiado', 'pachuli', 'ahumado']
      }
    ]
  },
  {
    id: 'elemento',
    paso: 'Pregunta 9 de 10',
    titulo: '¿Con qué elemento de la naturaleza te identificas más?',
    subtitulo: 'Tu temperamento natural define la fuerza y el estilo de tu esencia.',
    opciones: [
      {
        id: 'agua',
        titulo: 'Agua cristalina en movimiento',
        descripcion: 'Adaptable, transparente, refrescante y lleno de vida.',
        icono: 'fa-droplet',
        arquetipo: 'fresco',
        tagResultado: 'Fluidez y frescura natural',
        keywords: ['citrico', 'fresco', 'limon', 'bergamota', 'acuatico', 'marino']
      },
      {
        id: 'tierra',
        titulo: 'Tierra firme y bosques milenarios',
        descripcion: 'Estable, elegante, confiable y con raíces profundas.',
        icono: 'fa-tree',
        arquetipo: 'elegante',
        tagResultado: 'Solidez y elegancia natural',
        keywords: ['floral', 'amaderado', 'cedro', 'terroso', 'musgoso', 'pachuli']
      },
      {
        id: 'aire',
        titulo: 'Brisa cálida con aroma a flores y frutas',
        descripcion: 'Encantador, cercano, dulce e imposible de ignorar.',
        icono: 'fa-star',
        arquetipo: 'dulce',
        tagResultado: 'Calidez encantadora y dulce',
        keywords: ['vainilla', 'dulce', 'ambar', 'afrutado', 'floral', 'tropical']
      },
      {
        id: 'fuego',
        titulo: 'Fuego intenso bajo las estrellas',
        descripcion: 'Apasionado, magnético, misterioso y con huella imborrable.',
        icono: 'fa-fire',
        arquetipo: 'exotico',
        tagResultado: 'Intensidad ardiente y magnética',
        keywords: ['oud', 'oriental', 'especiado', 'canela', 'ron', 'licoroso', 'tabaco']
      }
    ]
  },
  {
    id: 'musica',
    paso: 'Pregunta 10 de 10',
    titulo: '¿Qué género musical escuchas más en tu día a día?',
    subtitulo: 'Dinos qué música te hace vibrar para calcular tu compatibilidad perfecta.',
    opciones: [
      {
        id: 'rnb',
        titulo: 'R&B, Pop sensual o Reggaetón lento',
        descripcion: 'Ritmos envolventes, dulces y con mucha actitud.',
        icono: 'fa-music',
        arquetipo: 'dulce',
        tagResultado: 'Actitud sensual y moderna',
        keywords: ['dulce', 'vainilla', 'floral', 'afrutado', 'caramelo', 'ambar']
      },
      {
        id: 'electronica',
        titulo: 'Electrónica, Techno o Trap intenso',
        descripcion: 'Vibración alta, bajos potentes y adrenalina pura.',
        icono: 'fa-bolt',
        arquetipo: 'exotico',
        tagResultado: 'Potencia y fijación extrema',
        keywords: ['oriental', 'oud', 'especiado', 'cuero', 'ahumado', 'cafe']
      },
      {
        id: 'indie',
        titulo: 'Indie, Pop acústico o Lo-Fi',
        descripcion: 'Auténtico, relajado, luminoso y sin pretensiones.',
        icono: 'fa-headphones',
        arquetipo: 'fresco',
        tagResultado: 'Estilo relajado y auténtico',
        keywords: ['fresco', 'citrico', 'verde', 'floral', 'acuatico', 'fresco especiado']
      },
      {
        id: 'clasico',
        titulo: 'Jazz, Soul o Rock clásico',
        descripcion: 'Lo que nunca pasa de moda porque tiene alma propia.',
        icono: 'fa-record-vinyl',
        arquetipo: 'elegante',
        tagResultado: 'Esencia clásica e inolvidable',
        keywords: ['amaderado', 'aromatico', 'cedro', 'sandalo', 'lavanda', 'vetiver']
      }
    ]
  }
];

const ARQUETIPOS_INFO = {
  dulce: {
    titulo: 'El Imán Irresistible',
    descripcion:
      'Tu energía es cálida, magnética y adictiva. Te van los aromas con personalidad envolvente que dejan huella y despiertan curiosidad apenas entras a un lugar.'
  },
  fresco: {
    titulo: 'Espíritu Solar & Libre',
    descripcion:
      'Irradias buena vibra, claridad y dinamismo. Tus fragancias ideales son luminosas, limpias y refrescantes, perfectas para acompañarte a cualquier hora.'
  },
  elegante: {
    titulo: 'Ícono de Elegancia Pura',
    descripcion:
      'Tienes un gusto refinado y atemporal. Conectas con composiciones equilibradas, sofisticadas y con clase que hablan por ti sin exagerar.'
  },
  exotico: {
    titulo: 'Aura Mística & de Autor',
    descripcion:
      'Huyes de lo común y buscas destacar con carácter. Te fascinan las notas profundas, especiadas y misteriosas con estela duradera.'
  }
};

const PALABRAS_PERFIL = {
  dulce: ['dulce', 'vainilla', 'caramelo', 'tonka', 'afrutado', 'coco', 'tropical', 'cacao', 'almendra'],
  fresco: ['fresco', 'citrico', 'limon', 'bergamota', 'mandarina', 'acuatico', 'marino', 'menta', 'verde', 'ozonico', 'fresco especiado'],
  elegante: ['floral', 'rosa', 'peonia', 'jazmin', 'iris', 'amaderado', 'cedro', 'sandalo', 'vetiver', 'aromatico', 'lavanda', 'atalcado', 'blanco floral'],
  exotico: ['oud', 'oriental', 'especiado', 'calido especiado', 'canela', 'ambar', 'incienso', 'ahumado', 'cuero', 'cafe', 'ron', 'licoroso', 'tabaco']
};

const normalizarTexto = (texto = '') =>
  String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const normalizarRutaImagen = (ruta) => {
  if (typeof ruta !== 'string' || ruta.trim() === '') return '';
  let limpia = ruta.trim().replace(/^public\//, '/');
  if (!limpia.startsWith('http') && !limpia.startsWith('/')) {
    limpia = `/${limpia}`;
  }
  return limpia;
};

const IMAGEN_RESPALDO =
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';

// Genera un número pseudoaleatorio estable dentro de la misma sesión de resultados
const ruidoControlado = (semilla, idProducto) => {
  const x = Math.sin((semilla + 1) * 9973 + (Number(idProducto) || 1) * 7919) * 10000;
  return x - Math.floor(x); // Valor entre 0 y 1
};

export function PerfumeMatch({ productos = [], agregarAlCarrito }) {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [semillaVariedad, setSemillaVariedad] = useState(() => Math.random());

  const listaCatalogo = (productos.length > 0 ? productos : productosIniciales).filter(
    (p) => Number(p.precio) > 0
  );

  const preguntaActiva = PREGUNTAS_QUIZ[pasoActual];
  const progreso = Math.round(((pasoActual + 1) / PREGUNTAS_QUIZ.length) * 100);

  const seleccionarOpcion = (opcion) => {
    const nuevasRespuestas = {
      ...respuestas,
      [preguntaActiva.id]: opcion
    };
    setRespuestas(nuevasRespuestas);

    if (pasoActual < PREGUNTAS_QUIZ.length - 1) {
      setPasoActual((prev) => prev + 1);
    } else {
      setMostrarResultado(true);
    }
  };

  const volverPasoAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual((prev) => prev - 1);
    }
  };

  const reiniciarQuiz = () => {
    setRespuestas({});
    setPasoActual(0);
    setMostrarResultado(false);
    setSemillaVariedad(Math.random());
  };

  const obtenerImagenPerfume = (prod) => {
    const enIniciales = productosIniciales.find(
      (p) =>
        p.id === prod.id ||
        p.nombre?.toLowerCase().trim() === prod.nombre?.toLowerCase().trim()
    );
    const rutaProducto = normalizarRutaImagen(prod.imagen);
    const rutaInicial = normalizarRutaImagen(enIniciales?.imagen);
    return rutaProducto || rutaInicial || IMAGEN_RESPALDO;
  };

  const manejarErrorImagenPerfume = (e, prod) => {
    const img = e.currentTarget;
    const enIniciales = productosIniciales.find(
      (p) =>
        p.id === prod.id ||
        p.nombre?.toLowerCase().trim() === prod.nombre?.toLowerCase().trim()
    );
    const rutaInicial = normalizarRutaImagen(enIniciales?.imagen);

    if (rutaInicial && !img.src.endsWith(rutaInicial)) {
      img.src = rutaInicial;
    } else {
      img.onerror = null;
      img.src = IMAGEN_RESPALDO;
    }
  };

  const obtenerConteoArquetipos = () => {
    const conteo = { dulce: 0, fresco: 0, elegante: 0, exotico: 0 };
    Object.values(respuestas).forEach((op) => {
      if (op?.arquetipo && conteo[op.arquetipo] !== undefined) {
        conteo[op.arquetipo] += 1;
      }
    });
    return conteo;
  };

  const obtenerArquetipoDominante = () => {
    const conteo = obtenerConteoArquetipos();
    const ganador = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0]?.[0] || 'dulce';
    return ARQUETIPOS_INFO[ganador];
  };

  const detectarPerfilPerfume = (prod) => {
    const acordesNorm = Array.isArray(prod.acordes)
      ? prod.acordes.map((a) => normalizarTexto(a))
      : [];
    const textoBase = normalizarTexto(
      `${acordesNorm.join(' ')} ${prod.categoria || ''} ${prod.descripcion || ''}`
    );

    const perfil = { dulce: 0, fresco: 0, elegante: 0, exotico: 0 };

    Object.entries(PALABRAS_PERFIL).forEach(([tipo, listaPalabras]) => {
      listaPalabras.forEach((palabra) => {
        const pNorm = normalizarTexto(palabra);
        // Los acordes principales pesan mucho más que una palabra suelta en la descripción
        if (acordesNorm.some((ac) => ac.includes(pNorm))) {
          perfil[tipo] += 3;
        } else if (textoBase.includes(pNorm)) {
          perfil[tipo] += 1;
        }
      });
    });

    const total = Object.values(perfil).reduce((acc, v) => acc + v, 0) || 1;
    return {
      dulce: perfil.dulce / total,
      fresco: perfil.fresco / total,
      elegante: perfil.elegante / total,
      exotico: perfil.exotico / total
    };
  };

  const calcularMatches = () => {
    const opcionesElegidas = Object.values(respuestas);
    const conteoUsuario = obtenerConteoArquetipos();
    const totalRespuestas = opcionesElegidas.length || 1;

    const puntuados = listaCatalogo.map((prod) => {
      const acordesTexto = Array.isArray(prod.acordes)
        ? normalizarTexto(prod.acordes.join(' '))
        : '';
      const notasCorazonFondo = prod.notas
        ? normalizarTexto(`${prod.notas.corazon || ''} ${prod.notas.fondo || ''}`)
        : '';
      const textoSecundario = normalizarTexto(
        `${prod.categoria || ''} ${prod.descripcion || ''}`
      );

      const perfilPerfume = detectarPerfilPerfume(prod);

      // 1. Afinidad entre los arquetipos elegidos por el usuario y el ADN real del perfume
      let puntosAfinidad = 0;
      Object.entries(conteoUsuario).forEach(([tipo, cantidad]) => {
        const proporcionUsuario = cantidad / totalRespuestas;
        puntosAfinidad += proporcionUsuario * perfilPerfume[tipo] * 28;
      });

      // 2. Penalización por perfiles opuestos para evitar que perfumes pesados ganen siempre
      let penalizacion = 0;
      if (conteoUsuario.fresco >= 4 && perfilPerfume.exotico + perfilPerfume.dulce > 0.55) {
        penalizacion += 12;
      }
      if (conteoUsuario.exotico + conteoUsuario.dulce >= 5 && perfilPerfume.fresco > 0.55) {
        penalizacion += 10;
      }
      if (conteoUsuario.elegante >= 4 && perfilPerfume.exotico > 0.55) {
        penalizacion += 7;
      }

      // 3. Coincidencias por pregunta con TOPE (máximo 1 acierto fuerte por pregunta)
      let puntosKeywords = 0;
      const coincidencias = new Set();

      opcionesElegidas.forEach((opcion, idxPregunta) => {
        const pesoPregunta =
          idxPregunta === 1 || idxPregunta === 2 || idxPregunta === 4 ? 2.4 : 1.6;
        let aciertoEnPregunta = 0;

        opcion.keywords.forEach((kw) => {
          const kwNorm = normalizarTexto(kw);
          if (acordesTexto.includes(kwNorm)) {
            aciertoEnPregunta = Math.max(aciertoEnPregunta, pesoPregunta);
            coincidencias.add(opcion.tagResultado);
          } else if (
            notasCorazonFondo.includes(kwNorm) ||
            textoSecundario.includes(kwNorm)
          ) {
            aciertoEnPregunta = Math.max(aciertoEnPregunta, pesoPregunta * 0.65);
            coincidencias.add(opcion.tagResultado);
          }
        });

        puntosKeywords += aciertoEnPregunta;
      });

      // 4. Variación controlada para dar diversidad real entre perfumes compatibles
      const factorAleatorio = ruidoControlado(semillaVariedad, prod.id) * 6.5;

      const puntosTotales = Math.max(
        5,
        15 + puntosAfinidad + puntosKeywords - penalizacion + factorAleatorio
      );

      const razonesFinales =
        coincidencias.size > 0
          ? Array.from(coincidencias).slice(0, 4)
          : opcionesElegidas.slice(0, 4).map((o) => o.tagResultado);

      return {
        producto: prod,
        puntos: puntosTotales,
        razones: razonesFinales
      };
    });

    puntuados.sort((a, b) => b.puntos - a.puntos);

    // Seleccionar Top 3 intentando que las alternativas sean de marcas variadas si hay empate cercano
    const seleccionados = [];
    const marcasUsadas = new Set();

    for (const candidato of puntuados) {
      if (seleccionados.length === 0) {
        seleccionados.push(candidato);
        if (candidato.producto.marca) marcasUsadas.add(candidato.producto.marca);
      } else if (seleccionados.length < 3) {
        const marca = candidato.producto.marca;
        const diferenciaConPrimero = seleccionados[0].puntos - candidato.puntos;
        if (!marca || !marcasUsadas.has(marca) || diferenciaConPrimero > 6) {
          seleccionados.push(candidato);
          if (marca) marcasUsadas.add(marca);
        }
      }
      if (seleccionados.length === 3) break;
    }

    // Rellenar si faltara alguno para completar 3
    for (const candidato of puntuados) {
      if (seleccionados.length === 3) break;
      if (!seleccionados.some((s) => s.producto.id === candidato.producto.id)) {
        seleccionados.push(candidato);
      }
    }

    const maxPuntos = seleccionados[0]?.puntos || 1;

    return seleccionados.map((item, idx) => {
      const ratio = item.puntos / maxPuntos;
      const porcentajeBase = idx === 0 ? 97 : idx === 1 ? 91 : 86;
      const porcentaje = Math.min(
        99,
        Math.max(82, Math.round(porcentajeBase * (0.94 + ratio * 0.06)))
      );

      return {
        ...item,
        porcentaje
      };
    });
  };

  const obtenerStockProducto = (prod) => {
    if (Array.isArray(prod.tamanos) && prod.tamanos.length > 0) {
      return Number(prod.tamanos[0].stock ?? 0);
    }
    return Number(prod.stock ?? 0);
  };

  const resultados = mostrarResultado ? calcularMatches() : [];
  const matchPrincipal = resultados[0];
  const otrosMatches = resultados.slice(1);
  const arquetipo = mostrarResultado ? obtenerArquetipoDominante() : null;

  return (
    <main className="container my-5">
      <style>{`
        #root .tarjeta-match-clara.tarjeta-match-clara a:not(.btn-primary):not(.btn-success),
        body .tarjeta-match-clara.tarjeta-match-clara a:not(.btn-primary):not(.btn-success) {
          color: #000000 !important;
        }
        #root .tarjeta-match-clara.tarjeta-match-clara a.btn-outline-dark,
        body .tarjeta-match-clara.tarjeta-match-clara a.btn-outline-dark {
          color: #000000 !important;
          border-color: #000000 !important;
        }
        #root .tarjeta-match-clara.tarjeta-match-clara a.btn-outline-dark:hover,
        body .tarjeta-match-clara.tarjeta-match-clara a.btn-outline-dark:hover {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
      `}</style>

      <div className="text-center mb-4">
        <span
          className="badge rounded-pill px-3 py-2 mb-2 text-uppercase"
          style={{
            backgroundColor: 'rgba(185, 139, 69, 0.2)',
            color: '#f5d08a',
            border: '1px solid rgba(185, 139, 69, 0.45)',
            letterSpacing: '0.1em'
          }}
        >
          <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
          Test de Personalidad Olfativa
        </span>
        <h1 className="fw-bold display-6 mb-2" style={{ color: '#ffffff' }}>
          Descubre tu Perfume Match
        </h1>
        <p className="mx-auto" style={{ maxWidth: '620px', color: '#cbd5e1' }}>
          Dinos cómo eres, qué planes te mueven y cuál es tu vibra: nosotros encontramos la
          fragancia que parece hecha a tu medida.
        </p>
      </div>

      {!mostrarResultado ? (
        <section
          aria-label="Test de personalidad de perfumes"
          className="rounded-4 shadow-lg mx-auto overflow-hidden"
          style={{
            maxWidth: '820px',
            backgroundColor: '#162018',
            border: '1px solid rgba(255, 255, 255, 0.14)'
          }}
        >
          <div className="p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-semibold" style={{ color: '#ffc107' }}>
                {preguntaActiva.paso}
              </span>
              <span className="small" style={{ color: '#cbd5e1' }}>
                {progreso}% completado
              </span>
            </div>

            <div
              className="progress mb-4 rounded-pill"
              style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.14)' }}
            >
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${progreso}%`, transition: 'width 0.35s ease' }}
                aria-valuenow={progreso}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>

            <h2 className="fw-bold fs-3 mb-2" style={{ color: '#ffffff' }}>
              {preguntaActiva.titulo}
            </h2>
            <p className="small mb-4" style={{ color: '#cbd5e1' }}>
              {preguntaActiva.subtitulo}
            </p>

            <div className="row g-3">
              {preguntaActiva.opciones.map((opcion) => {
                const estaSeleccionada = respuestas[preguntaActiva.id]?.id === opcion.id;
                return (
                  <div key={opcion.id} className="col-12 col-md-6">
                    <button
                      type="button"
                      onClick={() => seleccionarOpcion(opcion)}
                      className="w-100 h-100 text-start p-3 rounded-4 border d-flex align-items-start gap-3"
                      style={{
                        backgroundColor: estaSeleccionada
                          ? 'rgba(255, 193, 7, 0.16)'
                          : 'rgba(255, 255, 255, 0.05)',
                        borderColor: estaSeleccionada
                          ? '#ffc107'
                          : 'rgba(255, 255, 255, 0.18)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                        style={{
                          width: '44px',
                          height: '44px',
                          backgroundColor: estaSeleccionada ? '#ffc107' : 'rgba(255,255,255,0.1)',
                          color: estaSeleccionada ? '#162018' : '#ffc107'
                        }}
                      >
                        <i className={`fa-solid ${opcion.icono} fs-5`} aria-hidden="true"></i>
                      </div>
                      <div>
                        <div className="fw-bold fs-5 mb-1" style={{ color: '#ffffff' }}>
                          {opcion.titulo}
                        </div>
                        <div className="small" style={{ color: '#cbd5e1' }}>
                          {opcion.descripcion}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
              <button
                type="button"
                className="btn btn-outline-light btn-sm rounded-pill px-3"
                onClick={volverPasoAnterior}
                disabled={pasoActual === 0}
              >
                <i className="fa-solid fa-arrow-left me-2" aria-hidden="true"></i>
                Anterior
              </button>

              <Link
                to="/productos"
                className="text-decoration-none small fw-semibold"
                style={{ color: '#ffc107' }}
              >
                Ver catálogo completo &rarr;
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section
          aria-label="Resultados de tu Perfume Match"
          className="mx-auto"
          style={{ maxWidth: '960px' }}
        >
          {arquetipo && (
            <div
              className="rounded-4 p-4 mb-4 text-center shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #162018 0%, #243528 100%)',
                border: '1px solid rgba(255, 193, 7, 0.35)'
              }}
            >
              <span
                className="text-uppercase small fw-bold d-block mb-1"
                style={{ color: '#ffc107' }}
              >
                Tu Arquetipo Olfativo
              </span>
              <h2 className="fw-bold fs-3 mb-2" style={{ color: '#ffffff' }}>
                {arquetipo.titulo}
              </h2>
              <p className="small mx-auto mb-0" style={{ maxWidth: '680px', color: '#cbd5e1' }}>
                {arquetipo.descripcion}
              </p>
            </div>
          )}

          {matchPrincipal && (
            <div
              className="tarjeta-match-clara border-0 rounded-4 shadow-lg overflow-hidden mb-5"
              style={{ backgroundColor: '#eaf4ed', color: '#000000' }}
            >
              <div className="row g-0 align-items-stretch">
                <div
                  className="col-12 col-md-5 bg-white p-4 d-flex align-items-center justify-content-center position-relative"
                  style={{ minHeight: '340px' }}
                >
                  <span
                    className="position-absolute top-0 start-0 m-3 badge rounded-pill bg-success px-3 py-2 fs-6 shadow-sm"
                    style={{ zIndex: 2 }}
                  >
                    <i className="fa-solid fa-heart me-1" aria-hidden="true"></i>
                    {matchPrincipal.porcentaje}% Match
                  </span>

                  <Link
                    to={`/producto/${matchPrincipal.producto.id}`}
                    className="d-flex align-items-center justify-content-center w-100 h-100"
                  >
                    <img
                      src={obtenerImagenPerfume(matchPrincipal.producto)}
                      alt={matchPrincipal.producto.nombre}
                      className="img-fluid"
                      style={{ maxHeight: '290px', objectFit: 'contain' }}
                      onError={(e) => manejarErrorImagenPerfume(e, matchPrincipal.producto)}
                    />
                  </Link>
                </div>

                <div className="col-12 col-md-7 p-4 p-lg-5" style={{ color: '#000000' }}>
                  <span className="badge bg-dark text-warning mb-2 px-3 py-1 rounded-pill">
                    Tu Alma Gemela en Perfume
                  </span>

                  <div
                    role="heading"
                    aria-level="2"
                    className="fw-bold fs-2 mb-2"
                    style={{ color: '#000000' }}
                  >
                    {matchPrincipal.producto.nombre}
                  </div>

                  <div className="mb-3" style={{ color: '#000000', fontSize: '1rem' }}>
                    {matchPrincipal.producto.descripcion}
                  </div>

                  {matchPrincipal.razones.length > 0 && (
                    <div className="mb-3">
                      <div className="small fw-bold mb-2" style={{ color: '#000000' }}>
                        Lo que los conecta:
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {matchPrincipal.razones.map((razon, i) => (
                          <span
                            key={i}
                            className="badge rounded-pill bg-white border px-3 py-2"
                            style={{ color: '#000000' }}
                          >
                            <i className="fa-solid fa-sparkles text-warning me-1" aria-hidden="true"></i>
                            {razon}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="d-flex align-items-baseline gap-3 my-3 pt-3 border-top">
                    <span className="fw-bold fs-3" style={{ color: '#000000' }}>
                      ${Number(matchPrincipal.producto.precio).toLocaleString('es-CL')}
                    </span>
                    <span className="small fw-semibold" style={{ color: '#1f2937' }}>
                      {obtenerStockProducto(matchPrincipal.producto) > 0
                        ? `Disponible (${obtenerStockProducto(matchPrincipal.producto)} unid.)`
                        : 'Sin stock'}
                    </span>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn btn-success fw-bold rounded-pill px-4 py-2"
                      onClick={() => agregarAlCarrito(matchPrincipal.producto)}
                      disabled={obtenerStockProducto(matchPrincipal.producto) <= 0}
                    >
                      <i className="fa-solid fa-cart-plus me-2" aria-hidden="true"></i>
                      {obtenerStockProducto(matchPrincipal.producto) <= 0
                        ? 'Agotado'
                        : 'Agregar mi Match al carrito'}
                    </button>

                    <Link
                      to={`/producto/${matchPrincipal.producto.id}`}
                      className="btn btn-outline-dark fw-semibold rounded-pill px-4 py-2"
                      style={{ color: '#000000', borderColor: '#000000' }}
                    >
                      Ver ficha completa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {otrosMatches.length > 0 && (
            <div className="mb-4">
              <h3 className="fw-bold fs-4 mb-3" style={{ color: '#ffffff' }}>
                Otros aromas que vibran con tu personalidad
              </h3>
              <div className="row g-4">
                {otrosMatches.map(({ producto, porcentaje }) => {
                  const stock = obtenerStockProducto(producto);
                  return (
                    <div key={producto.id} className="col-12 col-md-6">
                      <article
                        className="tarjeta-match-clara h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden"
                        style={{ color: '#000000' }}
                      >
                        <div className="row g-0 h-100 align-items-center">
                          <div className="col-4 p-3 text-center position-relative">
                            <span className="badge bg-warning text-dark fw-bold mb-2">
                              {porcentaje}% Match
                            </span>
                            <Link to={`/producto/${producto.id}`}>
                              <img
                                src={obtenerImagenPerfume(producto)}
                                alt={producto.nombre}
                                className="img-fluid"
                                style={{ maxHeight: '130px', objectFit: 'contain' }}
                                onError={(e) => manejarErrorImagenPerfume(e, producto)}
                              />
                            </Link>
                          </div>
                          <div className="col-8 p-3 d-flex flex-column justify-content-between">
                            <div>
                              <span className="badge bg-secondary mb-1">
                                {producto.categoria || 'Perfumes'}
                              </span>
                              <div role="heading" aria-level="5" className="fw-bold fs-6 mb-1">
                                <Link
                                  to={`/producto/${producto.id}`}
                                  className="text-decoration-none"
                                  style={{ color: '#000000' }}
                                >
                                  {producto.nombre}
                                </Link>
                              </div>
                              <div
                                className="small mb-2 text-truncate"
                                style={{ color: '#000000' }}
                              >
                                {producto.descripcion}
                              </div>
                            </div>
                            <div>
                              <div className="fw-bold mb-2" style={{ color: '#000000' }}>
                                ${Number(producto.precio).toLocaleString('es-CL')}
                              </div>
                              <div className="d-flex gap-2">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm rounded-pill fw-bold"
                                  onClick={() => agregarAlCarrito(producto)}
                                  disabled={stock <= 0}
                                >
                                  <i className="fa-solid fa-cart-plus me-1" aria-hidden="true"></i>
                                  {stock <= 0 ? 'Agotado' : 'Agregar'}
                                </button>
                                <Link
                                  to={`/producto/${producto.id}`}
                                  className="btn btn-outline-dark btn-sm rounded-pill"
                                  style={{ color: '#000000', borderColor: '#000000' }}
                                >
                                  Detalles
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={reiniciarQuiz}
              className="btn btn-outline-warning rounded-pill fw-bold px-4 py-2"
            >
              <i className="fa-solid fa-rotate-right me-2" aria-hidden="true"></i>
              Volver a hacer el test
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default PerfumeMatch;