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
- **Nosotros:** pantalla informativa nativa.
- **CI:** GitHub Actions compila `assembleDebug` en esta rama y publica el APK como artefacto si la compilación termina correctamente.

## Compilar localmente

Requisitos: Android Studio actualizado, JDK 17 y Android SDK 36.

Desde este directorio ejecuta `gradle assembleDebug`.

Si la compilación termina correctamente, el APK de depuración queda en `app/build/outputs/apk/debug/app-debug.apk`.

## Límites conocidos

Esta es una primera entrega funcional, no una versión lista para producción. Aún no incluye autenticación conectada al backend, sincronización entre dos dispositivos, cifrado de la base local, carga remota de medios, chat, push, widgets ni generación firmada para Play Store. Las notas permanecen en el dispositivo donde se crearon hasta implementar sincronización explícita.

No se deben incluir claves privadas, contraseñas, tokens ni archivos de firma en el repositorio. Para publicar una versión release se configurará la firma mediante secretos de CI.