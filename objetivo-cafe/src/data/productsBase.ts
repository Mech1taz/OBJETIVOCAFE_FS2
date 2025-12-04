import type { Product } from '../types';

export const productsBase: Product[] = [
    // --- CAFÉS (IDs 1-10) ---
    { 
        id: 1, 
        nombre: "Café de Colombia 250g", 
        precio: 12990, 
        tipo: "cafe", 
        opciones: ["Grano entero", "Italiana", "Prensa Francesa", "Filtro"], 
        imagen: "img/cafe_colombia.png", 
        descripcion: "Balanceado, cuerpo medio y acidez vibrante.",
        descripcionLarga: "Cultivado en las famosas zonas cafeteras de los Andes colombianos. Tamaño grande y uniforme del grano, garantizando una torrefacción pareja. Es un café confiable y lleno de sabor.",
        notas: "Cacao, naranja caramelizada, nueces.",
        stock:12
    },
    { 
        id: 2, 
        nombre: "Café Etiopía 250g", 
        precio: 14990, 
        tipo: "cafe", 
        opciones: ["Grano entero", "Italiana", "Prensa Francesa", "Filtro"], 
        imagen: "img/cafe_etiopia.png", 
        descripcion: "Perfil floral y cítrico.",
        descripcionLarga: "Originario de la región de Yirgacheffe, famosa por producir algunos de los mejores cafés del mundo. Es un café de la variedad heirloom, secado en camas africanas. Su proceso lavado resalta su acidez brillante y su perfil floral.",
        notas: "Bergamota (Earl Grey), jazmín, limón, melocotón y un final limpio.",
        stock:12
    },
    { 
        id: 3, 
        nombre: "Café Honduras 250g", 
        precio: 13490, 
        tipo: "cafe", 
        opciones: ["Grano entero", "Italiana", "Prensa Francesa", "Filtro"], 
        imagen: "img/cafe_honduras.png", 
        descripcion: "Notas a chocolate y nuez.",
        descripcionLarga: "Cultivado a más de 1,200 metros sobre el nivel del mar en las montañas de Honduras. 'SHG' significa que es de crecimiento estrictamente alto, resultando en un grano más denso y de desarrollo de sabor más lento.",
        notas: "Chocolate con leche, caramelo, avellana y un toque cítrico de naranja.",
        stock:12
    },
    { 
        id: 4, 
        nombre: "Café Salvador Honey 250g", 
        precio: 12990, 
        tipo: "cafe", 
        opciones: ["Grano entero", "Italiana", "Prensa Francesa", "Filtro"], 
        imagen: "img/cafe_salvador_honey.png", 
        descripcion: "Dulzor natural procesado con miel.",
        descripcionLarga: "Proveniente de fincas salvadoreñas que utilizan el método honey. El grano se seca con una capa de mucílago (la 'miel'), lo que reduce la acidez y aumenta la dulzura, el cuerpo y sabores afrutados.",
        notas: "Panela, uva roja, almibarado, con un cuerpo meloso.",
        stock:12
    },
    { 
        id: 5, 
        nombre: "Café México 250g", 
        precio: 14990, 
        tipo: "cafe", 
        opciones: ["Grano entero", "Italiana", "Prensa Francesa", "Filtro"], 
        imagen: "img/cafe_mexico.png", 
        descripcion: "Suave con notas especiadas.",
        descripcionLarga: "Proveniente de la región montañosa de Chiapas, cerca de la frontera con Guatemala. Este café es orgánico, ya que los pequeños productores utilizan métodos tradicionales y de bajo impacto. Su perfil es suave y agradable.",
        notas: "Nueces (avellana, almendra), leche condensada, cacao suave y especias.",
        stock:12
    },
    { 
        id: 6, 
        nombre: "Café Descafeinado 250g", 
        precio: 12990, 
        tipo: "cafe", 
        opciones: ["Grano entero", "Italiana", "Prensa Francesa", "Filtro"], 
        imagen: "img/cafe_descafeinado.png", 
        descripcion: "Todo el sabor sin cafeína.",
        descripcionLarga: "Aroma a chocolate y nuez con toques de caramelo achocolatado y una fragancia cítrica a naranja. Procesado con método Swiss Water para remover la cafeína naturalmente.",
        notas: "Chocolate, caramelo, nuez tostada. Cuerpo medio y baja acidez.",
        stock:12
    },

    // --- CAFETERAS (IDs 100+) ---
    { 
        id: 101, 
        nombre: "Cafetera Francesa 600ml", 
        precio: 13990, 
        tipo: "cafetera", 
        opciones: [], 
        imagen: "img/cafetera_francesa.png", 
        descripcion: "La clásica prensa, ahora irrompible.",
        descripcionLarga: "La versión clásica con estructura resistente añade un toque elegante a tu mesa. El café se infusiona en agua caliente y luego se separa con un filtro de malla metálica que permite el paso de aceites y partículas finas.",
        notas: "Capacidad: 600ml (3 tazas aprox).",
        stock:4
    },
    { 
        id: 102, 
        nombre: "Prensa Francesa Bambú 1L", 
        precio: 20990, 
        tipo: "cafetera", 
        opciones: [], 
        imagen: "img/cafetera_francesa_bambu.png", 
        descripcion: "Diseño elegante con acabados en bambú.",
        descripcionLarga: "Ideal para compartir. El café se infusiona en agua caliente y luego se separa con un filtro de malla metálica. Esta versión de 1L con estructura de bambú es funcional, duradera y muy elegante.",
        notas: "Capacidad: 1 Litro. Material: Vidrio y Bambú.",
        stock:4
    },
    { 
        id: 103, 
        nombre: "Moka Italiana 350ml", 
        precio: 14990, 
        tipo: "cafetera", 
        opciones: [], 
        imagen: "img/italiana_350ml.png", 
        descripcion: "Espresso casero tradicional.",
        descripcionLarga: "Clásica cafetera italiana de aluminio de 350ml. Ideal para preparar café con un sabor intenso y cuerpo completo. Perfecta para los amantes del espresso casero que buscan intensidad.",
        notas: "Material: Aluminio. Tipo: Fuego directo.",
        stock:5
    },
    { 
        id: 104, 
        nombre: "Aeropress Go", 
        precio: 74990, 
        tipo: "cafetera", 
        opciones: [], 
        imagen: "img/aeropress_go.png", 
        descripcion: "La cafetera viajera más versátil.",
        descripcionLarga: "Sistema de inmersión y presión manual. Incluye todo en un kit de viaje (taza, cuchara, soporte). Es muy indulgente con el tipo de molienda, lo que la hace perfecta para principiantes y expertos.",
        notas: "Incluye: Kit de viaje completo y 350 filtros.",
        stock: 7
    },
    { 
        id: 105, 
        nombre: "Chemex", 
        precio: 59990, 
        tipo: "cafetera", 
        opciones: [], 
        imagen: "img/chemex.png", 
        descripcion: "Para un café limpio y brillante.",
        descripcionLarga: "Fabricada en vidrio con un elegante diseño de reloj de arena y un collar de madera. Utiliza filtros de papel extra gruesos que retienen los aceites y sedimentos, logrando una taza de una claridad excepcional.",
        notas: "Material: Vidrio borosilicato y madera.",
        stock: 8
    },
    { 
        id: 106, 
        nombre: "V60", 
        precio: 29990, 
        tipo: "cafetera", 
        opciones: [], 
        imagen: "img/v60.png", 
        descripcion: "Filtrado manual de precisión.",
        descripcionLarga: "Un dripper o vertedor cónico (generalmente de cerámica o vidrio) que usa filtros en forma de cono. Su diseño permite controlar la velocidad y turbulencia del agua, dando al usuario el poder de manipular la extracción.",
        notas: "Requiere filtros cónicos V60.",
        stock: 3
    },

    // --- ACCESORIOS (IDs 200+) ---
    { 
        id: 201, 
        nombre: "Pesa Timemore", 
        precio: 50990, 
        tipo: "accesorio", 
        opciones: [], 
        imagen: "img/pesa_timemore.png", 
        descripcion: "Alta precisión para tus recetas.",
        descripcionLarga: "Precisión de 0.1g para la preparación perfecta. Es resistente al agua y tiene un cronómetro incorporado para que puedas controlar el tiempo de vertido (bloom) y la extracción total.",
        notas: "Material: Acrílico / Resistencia al agua.",
        stock: 4
    },
    { 
        id: 202, 
        nombre: "Filtros Aeropress", 
        precio: 8990, 
        tipo: "accesorio", 
        opciones: [], 
        imagen: "img/filtros_aeropress.png", 
        descripcion: "Repuestos originales.",
        descripcionLarga: "Paquete de filtros de papel para Aeropress originales. Diseñados para una extracción rápida y limpia, estos filtros aseguran que tu café esté libre de sedimentos y con un sabor óptimo.",
        notas: "Cantidad: 350 unidades.",
        stock: 4
    },
    { 
        id: 203, 
        nombre: "Timemore Chestnut C3 Pro", 
        precio: 119990, 
        tipo: "accesorio", 
        opciones: [], 
        imagen: "img/molino_timemore.png", 
        descripcion: "Molino manual profesional.",
        descripcionLarga: "Molino manual de alta precisión con fresas cónicas de acero inoxidable. Su nuevo eje central lo hace más estable, logrando una molienda uniforme para cualquier método, desde espresso hasta prensa francesa.",
        notas: "Características: Fresas S2C, cuerpo aluminio, mango plegable.",
        stock: 6
    },
    { 
        id: 204, 
        nombre: "Molino Manual Zebrang", 
        precio: 79990, 
        tipo: "accesorio", 
        opciones: [], 
        imagen: "img/molino_zebrang.png", 
        descripcion: "Compacto y duradero.",
        descripcionLarga: "Diseño elegante, funcional y práctico de la marca Zebrang (Hario). Contiene muelas de acero inoxidable, dejando una molienda uniforme para café de filtro. Perfecto para llevar de camping o viaje.",
        notas: "Material: Plástico resistente y Acero Inoxidable.",
        stock: 7
    }
];