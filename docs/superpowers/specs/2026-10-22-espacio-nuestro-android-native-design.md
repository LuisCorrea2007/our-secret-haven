# Espacio Nuestro — Android Nativo

## Estado
Propuesta de arquitectura para una aplicación Android nativa, derivada del producto web existente `our-secret-haven`.

## 1. Objetivo

Crear una aplicación Android profesional para **Espacio Nuestro**, nativa y mantenible, usando Kotlin + Jetpack Compose. La aplicación debe conservar las capacidades funcionales del producto web actual, pero adaptar la experiencia a móvil y añadir capacidades reales del dispositivo cuando aporten valor.

La APK no será un WebView de la aplicación React. La web continuará existiendo como producto independiente y la aplicación Android consumirá el mismo backend/datos cuando sea viable.

## 2. Alcance funcional inicial

La aplicación debe cubrir, como mínimo, las capacidades actualmente documentadas en el proyecto web:

- autenticación y sesión persistente;
- panel principal y contador de relación;
- notas, respuestas, reacciones y favoritos;
- adjuntos de audio y PDF;
- galería de fotos y álbumes;
- calendario, propuestas y cuenta regresiva;
- deseos compartidos;
- diario de la relación;
- diversión/trivia;
- videos diarios y comentarios;
- notificaciones internas;
- configuración de la relación y de la cuenta.

La documentación del repositorio identifica además como pendientes el chat efímero de 24 horas, distancia entre usuarios, notificaciones push, widget Android, mejoras de galería y login rápido. Estas funciones se tratarán como módulos de la hoja de ruta y no como simples pantallas de demostración. fileciteturn7file0L2-L10

## 3. Principios técnicos

1. **Native-first:** Kotlin y APIs Android, sin WebView como núcleo de la aplicación.
2. **Offline-aware:** la UI debe poder abrirse y consultar datos cacheados sin conexión; las operaciones sincronizables deben tener estados de pendiente/error.
3. **Privacy-first:** mínimo de permisos, secretos fuera del código, almacenamiento local protegido y comunicación HTTPS.
4. **Single source of truth:** repositorios como frontera de acceso a datos.
5. **Unidirectional Data Flow:** estado hacia la UI y eventos hacia ViewModels.
6. **Testability:** lógica de dominio y repositorios comprobables sin depender de una Activity.
7. **Graceful degradation:** una capacidad de hardware ausente no debe romper la aplicación.
8. **YAGNI:** no se incorporarán sensores o servicios sin una función concreta.

La arquitectura recomendada actualmente por Android prioriza una capa de datos clara, repositorios, coroutines/flows, ViewModels, UDF y Jetpack Compose para aplicaciones nuevas. citeturn0search1turn0search0

## 4. Arquitectura propuesta

```text
Android App
│
├── app
│   ├── MainActivity
│   ├── navigation
│   └── dependency graph
│
├── core
│   ├── ui
│   ├── design system
│   ├── networking
│   ├── database
│   ├── security
│   ├── media
│   └── device
│
├── feature
│   ├── auth
│   ├── home
│   ├── notes
│   ├── gallery
│   ├── calendar
│   ├── wishes
│   ├── diary
│   ├── fun
│   ├── videos
│   ├── chat
│   ├── notifications
│   ├── profile
│   └── settings
│
└── data
    ├── remote
    ├── local
    ├── repository
    └── sync
```

Compose se utilizará como toolkit de UI nativa. Se seguirá el modelo de estado/eventos de Compose y ViewModel, evitando que los composables modifiquen directamente el estado de negocio. citeturn0search0

## 5. Stack Android

- Kotlin.
- Jetpack Compose.
- Material 3 como base de componentes, con un tema visual propio de Espacio Nuestro.
- Navigation 3 para navegación/deep links si la versión estable disponible en el momento de implementación lo permite.
- ViewModel + StateFlow.
- Coroutines.
- Room para persistencia estructurada local.
- DataStore para preferencias/configuración no relacional.
- Retrofit/OkHttp para API HTTP si el backend existente expone REST compatible.
- Kotlin serialization para DTOs cuando resulte adecuado.
- WorkManager para sincronizaciones y tareas diferidas.
- CameraX para captura de imágenes/video cuando la funcionalidad lo requiera.
- Android Keystore para secretos y material criptográfico local.

Android recomienda una aplicación de una sola Activity para apps multipantalla modernas, con Compose y navegación. citeturn0search1

## 6. Diseño visual

La aplicación conservará la identidad de Espacio Nuestro del producto web, pero no copiará literalmente un layout de escritorio.

Dirección visual:

- estética romántica, elegante y privada;
- crema/beige/terracota suave y acentos dorados según el producto existente;
- tipografía de títulos equivalente a la identidad web y tipografía de lectura altamente legible;
- superficies limpias y profundidad moderada;
- animaciones cortas y funcionales;
- navegación inferior para las áreas principales;
- gestos y controles adaptados a uso táctil;
- soporte para tamaños de pantalla diferentes;
- accesibilidad mediante tamaños táctiles, contraste y content descriptions.

## 7. Mapa de funcionalidades web → Android

| Web actual | Android nativo |
|---|---|
| Panel | HomeScreen |
| Notas | NotesListScreen + NoteDetailScreen |
| Audios | AudioRecorder + AudioPlayer |
| PDFs | PdfViewer/intent seguro |
| Galería | GalleryScreen + AlbumScreen + PhotoViewer |
| Calendario | CalendarScreen + EventDetail |
| Deseos | WishesScreen |
| Diario | DiaryScreen |
| Diversión | FunScreen |
| Videos | DailyVideosScreen + VideoPlayer |
| Ajustes | SettingsScreen |
| Autenticación | Auth flow |
| Notificaciones | NotificationCenter + Android notifications |
| Chat futuro | EphemeralChatScreen |
| Distancia futura | CoupleDistanceScreen |

## 8. Capacidades del hardware

Se implementará una capa `core/device` para aislar APIs Android del resto del dominio.

### Cámara

Usar CameraX para captura de fotos y, cuando corresponda, video. Las capturas se guardarán mediante MediaStore o almacenamiento de aplicación según el caso. CameraX tiene soporte desde API 21 y está diseñado para casos de uso modernos de cámara. citeturn0search8

### Micrófono

Usarlo para grabar notas de voz. La grabación debe indicar claramente cuándo está activa y detenerse ante condiciones de ciclo de vida apropiadas.

### Biometría

Usar BiometricPrompt para desbloqueo rápido de la aplicación cuando el usuario lo habilite. La contraseña/token no debe guardarse como texto plano.

### Hápticos

Usar vibración/haptic feedback en acciones significativas: confirmaciones, selección, reacciones y determinados eventos de UI. Debe ser configurable y respetar las capacidades del dispositivo.

### Sensores

Los sensores se incorporarán solamente si una función de producto los justifica. Se podrá detectar acelerómetro, giroscopio, proximidad y otros sensores disponibles sin hacerlos obligatorios.

### Bluetooth / BLE

Se reservará un módulo para dispositivos complementarios o experiencias futuras. En Android 12+ los permisos deben declararse según la operación concreta (`BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, `BLUETOOTH_ADVERTISE`). No se solicitará ubicación salvo que el caso de uso realmente derive ubicación desde los resultados del escaneo. citeturn0search10

### NFC

Opcional y condicionado a un caso de uso real. No se añadirá como permiso/capacidad obligatoria en la primera versión.

### Ubicación

Se utilizará solamente para la función de distancia entre los miembros de la pareja si ambos la habilitan. Debe existir control explícito, frecuencia limitada y posibilidad de desactivación.

### Notificaciones

Notificaciones locales para recordatorios y notificaciones push para eventos remotos. La arquitectura deberá permitir reemplazar proveedor push sin contaminar las features.

### Widgets

Widget Android para información útil de la relación, inicialmente con contador/fecha/evento próximo. Debe consumir una fuente de datos local y no depender de una pantalla abierta.

## 9. Datos y sincronización

La aplicación utilizará una arquitectura local-first:

```text
UI
 ↓
ViewModel
 ↓
Repository
 ↙       ↘
Room     Remote API
 ↓          ↓
Cache      Server
```

Room será la fuente local estructurada. El repositorio decidirá cuándo leer cache, cuándo consultar red y cuándo encolar una operación.

Las operaciones que puedan ejecutarse offline se almacenarán como pendientes y se sincronizarán cuando vuelva la conectividad.

## 10. Backend existente

El repositorio web actualmente usa React/TypeScript con TanStack Start y contiene dependencias de Supabase/Firebase y autenticación cloud, además de una capa de servidor. fileciteturn6file0L2-L10

Por tanto, antes de implementar cada módulo Android se deberá verificar el contrato real de API y autenticación del código actual. No se asumirá que las rutas descritas en README sean endpoints existentes.

El README describe un objetivo self-hosted y un modelo de datos/API mucho más amplio que lo que puede inferirse únicamente del árbol actual. fileciteturn8file0L2-L2

## 11. Seguridad

- HTTPS obligatorio para producción.
- Tokens almacenados de forma segura.
- Android Keystore para claves/secrets locales.
- No registrar tokens, contraseñas ni contenido privado en logs.
- Validación de respuestas de API.
- Manejo explícito de expiración de sesión.
- Biometría como desbloqueo local, no como sustituto de autorización del servidor.
- Permisos solicitados just-in-time.
- Protección de archivos temporales.
- Eliminación segura de cache sensible cuando el usuario cierre sesión, según política definida.

## 12. Rendimiento

Objetivo: experiencia fluida en teléfonos de gama media, incluyendo el Honor X8b como dispositivo de referencia.

- imágenes con thumbnails y tamaños adecuados;
- carga perezosa de galerías/listas;
- reproducción multimedia sin precargar contenido innecesario;
- procesamiento pesado fuera del hilo principal;
- WorkManager para trabajos diferidos;
- evitar listeners de sensores permanentes;
- limitar frecuencia de ubicación;
- cache con límites de tamaño;
- paginación en listas grandes;
- manejo eficiente de memoria de fotos/videos.

## 13. Privacidad de la pareja

La aplicación debe tratar fotos, audios, videos, diario, ubicación y chat como contenido privado.

La ubicación será una función opt-in y no se compartirá fuera del contexto autorizado de la pareja. El chat efímero tendrá expiración verificable en servidor y limpieza local.

## 14. Compatibilidad

La versión mínima de Android se determinará en la fase de implementación según las APIs requeridas, buscando maximizar cobertura sin sacrificar las capacidades modernas. Las APIs de hardware deben comprobar disponibilidad en runtime.

## 15. Testing

- Unit tests para casos de uso y repositorios.
- Tests de ViewModel.
- Compose UI tests para flujos críticos.
- Tests de navegación.
- Tests de sincronización offline/online.
- Tests de permisos y degradación de hardware.
- Tests de autenticación.
- Pruebas manuales en emulador y dispositivo físico.

## 16. Fases de construcción

### Fase A — Foundation

Proyecto Android, Gradle, Compose, tema, navegación, arquitectura, DI, networking, Room, seguridad y manejo de errores.

### Fase B — Auth + Home

Login, sesión persistente, biometría opcional, perfil y dashboard.

### Fase C — Core relationship features

Notas, galería, calendario, deseos, diario y notificaciones.

### Fase D — Multimedia

Audio, PDF, cámara, fotos, videos, compresión/cache y permisos.

### Fase E — Couple features

Chat efímero, distancia y presencia/estado.

### Fase F — Android integrations

Push notifications, widgets, compartir, deep links, hápticos y otras integraciones justificadas.

### Fase G — Hardening

Offline/sync, seguridad, rendimiento, accesibilidad, pruebas, firma y generación de APK/AAB.

## 17. Criterios de aceptación

La primera release candidata debe:

- instalarse como APK en Android;
- arrancar sin depender de una WebView;
- navegar entre las funciones principales;
- autenticarse contra el backend real;
- mantener sesión de forma segura;
- funcionar con cache cuando no haya conexión para contenido previamente sincronizado;
- manejar correctamente permisos;
- utilizar al menos cámara/micrófono/biometría/notificaciones donde las funciones correspondientes estén implementadas;
- no bloquearse si una capacidad de hardware no existe;
- mantener una experiencia consistente con Espacio Nuestro;
- generar APK de debug y AAB de release reproducibles.

## 18. Decisiones explícitas

- **Kotlin + Jetpack Compose:** elegido sobre WebView/Capacitor porque el objetivo es una aplicación verdaderamente nativa.
- **Room + DataStore:** elegidos para persistencia local y preferencias.
- **Repository + ViewModel + UDF:** elegidos para separar UI, estado y datos según las recomendaciones actuales de Android. citeturn0search1turn0search0
- **Hardware por módulos:** evita acoplar la aplicación a un teléfono específico.
- **Backend compartido:** evita duplicar usuarios y contenido entre web y Android.
- **No NFC/BLE/GPS por obligación:** se incorporarán únicamente donde exista una función concreta.
