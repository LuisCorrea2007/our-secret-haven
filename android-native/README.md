# Espacio Nuestro — Android nativo

Aplicación Android nativa construida con Kotlin y Jetpack Compose, mantenida en paralelo a la aplicación web React. Las pantallas principales no usan WebView.

## Stack

- Kotlin + Jetpack Compose + Material 3.
- Single Activity y navegación inferior nativa.
- ViewModel + StateFlow y flujo de estado unidireccional.
- Room para notas locales y persistencia offline.
- DataStore y WorkManager disponibles en dependencias; integración funcional pendiente.
- CameraX disponible en dependencias; captura integrada en una fase posterior.
- Android Photo Picker para seleccionar imágenes y vídeos sin permiso general de almacenamiento.
- Android Biometric disponible en dependencias; flujo de desbloqueo pendiente.

## Módulos implementados en esta fase

- **Inicio:** panel inicial y contador de días desde el 24 de junio de 2025.
- **Notas:** crear, listar, marcar como favoritas y eliminar notas. Se guardan localmente con Room y funcionan sin conexión.
- **Galería:** selector nativo de Android para imágenes y vídeos; la selección se muestra en una cuadrícula local y no se carga a un servidor.
- **Agenda:** primera pantalla informativa; eventos persistentes, sincronización y recordatorios aún pendientes.
- **Nosotros:** pantalla informativa nativa y base de inicio de sesión/registro por correo con Supabase Auth.
- **Configuración de Supabase:** lee `supabase.url` y `supabase.publishableKey` desde `android-native/local.properties`, o `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` desde el entorno de CI. Nunca usar `service_role` en una app cliente.
- **CI:** GitHub Actions compila `assembleDebug` en esta rama y publica el APK como artefacto si la compilación termina correctamente.

## Configurar Supabase para Android

Añade estas propiedades a \`android-native/local.properties\` (conserva también el \`sdk.dir\` que Android Studio haya generado):

\`\`\`properties
supabase.url=https://TU-PROYECTO.supabase.co
supabase.publishableKey=TU_CLAVE_PUBLICABLE
\`\`\`

También se admiten las variables de entorno \`SUPABASE_URL\` y \`SUPABASE_PUBLISHABLE_KEY\`. No subas \`local.properties\` al repositorio ni uses claves \`service_role\`/secretas en Android. Si Supabase no está configurado, las funciones locales siguen disponibles y la pantalla de cuenta indica que falta configuración.

La autenticación es una primera integración. La sincronización de notas y medios sigue desactivada hasta auditar y corregir las políticas RLS de los datos compartidos.

## Compilar localmente

Requisitos: Android Studio actualizado, JDK 17 y Android SDK 36.

Desde este directorio ejecuta `gradle assembleDebug`.

Si la compilación termina correctamente, el APK de depuración queda en `app/build/outputs/apk/debug/app-debug.apk`.

## Límites conocidos

Esta es una primera entrega funcional, no una versión lista para producción. Aún no incluye autenticación conectada al backend, sincronización entre dos dispositivos, cifrado de la base local, carga remota de medios, chat, push, widgets ni generación firmada para Play Store. Las notas permanecen en el dispositivo donde se crearon hasta implementar sincronización explícita.

No se deben incluir claves privadas, contraseñas, tokens ni archivos de firma en el repositorio. Para publicar una versión release se configurará la firma mediante secretos de CI.