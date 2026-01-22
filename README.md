# 🕵️ AENIGMA: The Evolution of Secrets 🔐

## 📝 Descripción del Proyecto

AENIGMA es una aplicación web interactiva de tipo juego criptográfico que simula la evolución histórica de las técnicas de esteganografía y criptografía, desde métodos antiguos hasta tecnologías modernas. El juego está inspirado en el famoso enigma de Cicada 3301 y está diseñado para desafiar las habilidades de resolución de problemas de los jugadores mediante siete niveles progresivos que integran técnicas criptográficas auténticas.

El proyecto combina elementos educativos con desafíos prácticos, permitiendo a los participantes aprender sobre métodos históricos como las tablillas de cera griegas y los acrósticos romanos, mientras simultáneamente dominan técnicas contemporáneas como la esteganografía LSB, el análisis DCT y la factorización RSA. Cada nivel presenta una metodología diferente que los jugadores deben descifrar utilizando herramientas integradas en el propio juego o conocimientos externos de criptografía clásica y moderna.

La arquitectura del sistema está construida como una aplicación de página única (SPA) que carga dinámicamente el contenido de cada nivel, mantiene el progreso del jugador mediante almacenamiento local y proporciona un sistema de terminal integrado que permite la ejecución de comandos para facilitar la resolución de los puzzles más complejos.

## ✨ Características Principales

El juego incorpora múltiples características que lo distinguen de otras plataformas de desafíos criptográficos. En primer lugar, presenta una progresión narrativa que conecta cada nivel con la evolución histórica de las técnicas de ocultación de información, proporcionando contexto histórico y técnico para cada desafío. Los jugadores no solo resuelven puzzles, sino que también aprenden sobre la historia de la criptografía y la esteganografía a lo largo de los siglos.

El sistema de herramientas integradas incluye un editor hexadecimal para análisis de datos en formato raw, un conversor binario para trabajar con representaciones bit a bit, un descifrador de César con selector deslizante para experimentar con diferentes desplazamientos, un analizador de frecuencia para ataques estadísticos, una calculadora RSA completa para factorización y descifrado, y un decodificador de runas para puzzles basados en el sistema rúnico antiguo. Cada herramienta está diseñada para ser utilizada dentro del contexto de los niveles específicos donde resulta relevante.

El sistema de logros recompensa a los jugadores por completar hitos específicos, como terminar el primer nivel, dominar técnicas particulares o completar el juego sin utilizar pistas. Estos logros se almacenan localmente y persisten entre sesiones, incentivando la rejugabilidad y el dominio completo de todas las técnicas presentadas.

## 🎮 Niveles del Juego

### 🏺 Nivel 1: Tablillas de Cera

Este nivel introduce a los jugadores en la esteganografía física antigua mediante el concepto de las tablillas de cera griegas. Según el ejemplo histórico de Demaratus, quien advirtió a Grecia sobre la invasión de Jerjes escribiendo en la madera y cubriendo con cera, los participantes deben utilizar su cursor como una herramienta de raspado para revelar un mensaje oculto bajo una capa de cera digital. El efecto visual simula el proceso físico de raspar la superficie de cera para descubrir el texto escrito debajo, proporcionando una experiencia táctil e interactiva que demuestra el principio fundamental de la esteganografía: ocultar información a simple vista.

La mecánica utiliza tecnología Canvas de HTML5 para crear un efecto de raspado en tiempo real, donde el movimiento del mouse o el toque en dispositivos tácticos elimina gradualmente la capa de cera virtual hasta revelar completamente el mensaje secreto. El nivel está clasificado como principiante y establece las bases conceptuales para entender cómo la información puede ocultarse dentro de un medio que parece inocente o irrelevante a primera vista.

### 📜 Nivel 2: Acrósticos Romanos

Los acrósticos representan una de las técnicas literarias más antiguas de ocultación de mensajes, donde las primeras letras de cada verso o línea forman un mensaje secundario. En este nivel, los jugadores reciben un poema en latín que contiene un acróstico cifrado con el método César. La solución requiere que el participante extraiga las primeras letras de cada verso, identifique el patrón de desplazamiento del cifrado César (que se deduce del número de versos en el poema) y descifre el mensaje resultante para obtener la palabra clave que desbloquea el siguiente nivel.

El nivel incluye una visualización interactiva de la rueda de César que permite a los jugadores experimentar con diferentes desplazamientos y comprender visualmente cómo funciona la sustitución monoalfabética. Esta mecánica pedagógica refuerza el aprendizaje del cifrado clásico mientras desafía al jugador a aplicar análisis criptográfico básico para determinar el desplazamiento correcto.

### 🖼️ Nivel 3: Velo Digital LSB

La esteganografía LSB (Least Significant Bit) representa el primer contacto del jugador con las técnicas digitales modernas de ocultación de información. Este método modifica el bit menos significativo de cada byte de píxel en una imagen para ocultar datos, cambios que son imperceptibles para el ojo humano pero detectables mediante análisis computacional. El nivel presenta una imagen aparentemente normal que contiene un mensaje oculto en el canal azul, donde cada bit menos significativo representa una parte del mensaje cifrado.

Los jugadores disponen de herramientas para manipular los canales de color y seleccionar diferentes bits para visualización, permitiéndoles ver cómo cambia la imagen cuando se modifican los bits más significativos versus los menos significativos. La solución requiere extraer sistemáticamente los bits del canal azul, recombinarlos en grupos de ocho para formar caracteres ASCII y descifrar el nombre oculto que sirve como respuesta del nivel.

### 🔍 Nivel 4: Rejilla de Cardano

La rejilla de Cardano, desarrollada por Girolamo Cardano en el siglo XVI, representa un hito en la criptografía histórica como uno de los primeros sistemas de transposición mecánica. El método utiliza una hoja perforada que, al colocarse sobre un texto aparentemente aleatorio de letras y girarse en cuatro posiciones de 90 grados, revela las letras que forman el mensaje secreto en cada orientación. Este nivel recrea digitalmente la experiencia de utilizar una rejilla giratoria, permitiendo a los jugadores rotar la plantilla y extraer las letras visibles en cada posición.

La implementación técnica utiliza CSS Grid para crear la matriz de letras y transformaciones CSS para la rotación de la rejilla overlay. Los jugadores deben identificar la configuración correcta de la rejilla, rotarla en las cuatro posiciones cardinales y leer las letras visibles en cada orientación para reconstruir el mensaje completo. El nivel combina elementos de puzzle visual con lógica criptográfica, requiriendo que el jugador comprenda el principio de la rejilla rotativa para resolverlo eficientemente.

### 📊 Nivel 5: Análisis DCT

La Transformada Discreta del Coseno (DCT) constituye el fundamento de la compresión de imágenes JPEG y, por extensión, de muchas técnicas modernas de esteganografía en el dominio de la frecuencia. Este nivel desafía a los jugadores a analizar los coeficientes DCT de una imagen JPEG, identificando patrones estadísticos anómalos que revelan la presencia de información oculta. A diferencia de la esteganografía espacial LSB, que modifica directamente los valores de píxeles, los métodos DCT operan en el dominio de la frecuencia después de la transformación del bloque 8x8 utilizado en la compresión JPEG.

La interfaz presenta una visualización de los bloques DCT donde los coeficientes modificados aparecen con intensidad alterada. Los jugadores deben identificar estos bloques anómalos, extraer los valores numéricos y convertirlos a caracteres ASCII para revelar el mensaje oculto. El nivel demuestra cómo la esteganografía moderna opera en múltiples dominios y cómo el análisis espectral puede revelar información que no es visible en el espacio de la imagen.

### 🔑 Nivel 6: Factorización RSA

Este nivel está directamente inspirado en los desafíos de Cicada 3301, particularmente en el famoso Puzzle 3 que requería factorizar un número semiprimo grande para descifrar un mensaje cifrado con RSA. Los jugadores reciben un mensaje en escritura rúnica antigua que, al decodificarse, revela un número N que es el producto de dos primos grandes. El exponent público e también se proporciona, pero la clave privada d debe calcularse encontrando los factores primos de N.

El proceso de solución requiere que el jugador traduzca las runas a letras latinas usando la referencia proporcionada, convierta el resultado a un número entero, factorice N para encontrar los primos p y q, calcule φ(n) = (p-1)(q-1), y finalmente calcule d como el inverso modular de e módulo φ(n). La calculadora RSA integrada en el juego facilita estos cálculos, pero el jugador debe proporcionar los valores correctos de p y q, que deben encontrarse mediante factorización del módulo N.

Este nivel representa uno de los desafíos más técnicos del juego, requiriendo comprensión de la aritmética modular, el algoritmo de Euclides extendido para el cálculo de inversos modulares, y la relación entre la factorización de enteros y la seguridad del sistema criptográfico RSA.

### 🧬 Nivel 7: Enigma Final

El nivel final integra todas las técnicas aprendidas en un desafío de múltiples capas que requiere la resolución coordinada de cinco puzzles diferentes, cada uno utilizando una metodología distinta. Las capas incluyen esteganografía visual LSB, análisis de espectro acústico, matemáticas RSA, decodificación rúnica y geolocalización. Cada capa revela una letra diferente, y las cinco letras combinadas forman la palabra clave final que completa el juego.

La capa geográfica presenta coordenadas de latitud y longitud que corresponden a una ubicación real, agregando un elemento de geolocalización que conecta el mundo digital con el físico. Los jugadores deben investigar la ubicación y proporcionar la letra inicial del nombre del lugar como parte de la solución final.

Este nivel representa la culminación del viaje educativo del jugador, demostrando cómo las diferentes técnicas de ocultación y cifrado pueden combinarse para crear sistemas de seguridad robustos y, simultáneamente, cómo un atacante determinado puede combinar múltiples vectores de ataque para comprometer la seguridad de un sistema.

## 💻 Requisitos del Sistema

Para ejecutar AENIGMA, el sistema debe cumplir con los siguientes requisitos técnicos. El navegador web debe ser compatible con HTML5, CSS3 y JavaScript ES6, lo cual incluye todos los navegadores modernos como Chrome, Firefox, Safari y Edge en sus versiones actuales. Se recomienda una resolución de pantalla mínima de 1280x720 píxeles para una experiencia óptima, aunque el diseño responsivo adapta la interfaz para pantallas más pequeñas.

El juego no requiere instalación de software adicional ni bibliotecas externas, ya que todos los recursos se cargan directamente desde los archivos locales. Sin embargo, se recomienda habilitar JavaScript en el navegador y permitir el almacenamiento local para que el sistema de progreso y logros funcione correctamente. El consumo de recursos es mínimo, requiriendo solo unos pocos megabytes de memoria RAM y capacidad de procesamiento estándar para las operaciones de Canvas y cálculo criptográfico.

## 🚀 Instalación y Ejecución

Para ejecutar el juego localmente, simplemente clone o descargue el repositorio completo y abra el archivo index.html en cualquier navegador web moderno. La estructura del proyecto es completamente estática y no requiere un servidor web para funcionar, aunque se puede servir mediante cualquier servidor HTTP estático para mejorar la velocidad de carga o para hosting en servicios como GitHub Pages, Netlify o Vercel.

La estructura de archivos incluye el archivo principal index.html en la raíz del proyecto, una carpeta css/ que contiene todos los estilos de la aplicación, una carpeta js/ con los módulos JavaScript que incluyen game-data.js con los datos de niveles, level-manager.js con la lógica de juego, tools.js con las herramientas criptográficas y main.js como punto de entrada principal, y opcionalmente una carpeta assets/ para recursos multimedia adicionales.

## 🏗️ Arquitectura Técnica

La aplicación sigue el patrón de diseño de aplicación de página única (SPA) donde toda la interfaz se carga inicialmente y el contenido de cada nivel se renderiza dinámicamente según sea necesario. El sistema de gestión de estado mantiene el progreso del jugador, los niveles desbloqueados, los logros obtenidos y las estadísticas de tiempo en un objeto centralizado que se serializa en almacenamiento local para persistencia.

El sistema de niveles utiliza una arquitectura modular donde cada nivel define su propio tipo de contenido (texto, imagen, interactivo, criptográfico o multicapa) y proporciona los datos específicos necesarios para su renderización. El LevelManager determina qué tipo de componente renderizar y configura las herramientas apropiadas para cada nivel, mientras que las herramientas criptográficas están desacopladas y pueden invocarse desde cualquier nivel que las requiera.

El sistema de terminal proporciona una interfaz de línea de comandos integrada que permite a los jugadores ejecutar comandos para consultar el estado del juego, solicitar pistas, navegar entre niveles y realizar operaciones de guardado y carga, todo sin abandonar la interfaz principal del juego.

## 🧮 Técnicas Criptográficas Implementadas

El juego implementa una variedad de técnicas criptográficas que abarcan desde métodos históricos hasta aproximaciones modernas. En el ámbito de la esteganografía, se incluyen la esteganografía espacial LSB que modifica bits individuales de píxeles, el análisis DCT para esteganografía en imágenes JPEG comprimidas, rejillas de Cardano para transposición visual y técnicas de ocultación en canales de color.

En criptografía simétrica, el cifrado César proporciona una introducción accesible a los cifrados de sustitución, mientras que las técnicas de transposición como el escítalo espartano demuestran métodos de rearranque de caracteres. La criptografía asimétrica RSA aparece en los niveles avanzados, requiriendo comprensión de aritmética modular, factorización de enteros y el concepto de claves públicas y privadas.

Las técnicas de análisis incluyen frequency analysis para ataques a cifrados monoalfabéticos, identificación de patrones en coeficientes DCT para detección de esteganografía JPEG, y factorización de enteros semiprimos para comprometer sistemas RSA de tamaño manejable.

## Contribuciones y Desarrollo Futuro

El proyecto está diseñado para ser extensible, permitiendo la adición de nuevos niveles que introduzcan técnicas criptográficas adicionales. Las áreas de desarrollo futuro potencial incluyen la implementación de cifrado Vigenère con análisis de clave, esteganografía en archivos de audio mediante espectrogramas, técnicas de esteganografía basadas en aprendizaje profundo utilizando redes neuronales, y desafíos de criptoanálisis más avanzados que requieran herramientas externas.

Las contribuciones son bienvenidas mediante solicitudes de extracción que añadan niveles educativos, mejoren la interfaz de usuario, corrijan errores o expandan las herramientas criptográficas disponibles. El proyecto mantiene documentación interna clara que facilita la comprensión de la arquitectura para nuevos desarrolladores.

## 📄 Licencia

Este proyecto es de propiedad privada. Todos los derechos están reservados. No se permite el uso, reproducción, distribución o modificación de este software sin el permiso expreso del autor.

## 🤝 Reconocimientos

El diseño del juego está inspirado en los legendarios puzzles de Cicada 3301, que representan uno de los desafíos criptográficos más enigmáticos y sofisticados de la historia de internet. Las técnicas históricas de esteganografía documentadas en el juego provienen de fuentes académicas y cryptológicas que documentan el desarrollo de la criptografía a lo largo de los siglos.

AENIGMA busca honrar esta tradición de desafíos intelectuales creando una experiencia educativa que combine historia, matemáticas y programación en un formato interactivo accesible para entusiastas de la criptografía de todos los niveles de experiencia.
