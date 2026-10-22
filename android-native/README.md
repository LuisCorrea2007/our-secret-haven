# Espacio Nuestro — Android nativo

Aplicación Android nativa de Espacio Nuestro, separada de la implementación web React.

## Stack

- Kotlin
- Jetpack Compose + Material 3
- Single Activity
- ViewModel + StateFlow/UDF
- Room para persistencia local
- DataStore para preferencias
- WorkManager para tareas persistentes
- CameraX para cámara
- Android Biometric para autenticación biométrica

La arquitectura sigue las recomendaciones actuales de Android para una UI impulsada por estado, separación de capas y repositorios. citehttps://developer.android.com/topic/architecture

## Estado actual

La rama `android-native` contiene el esqueleto compilable del proyecto, navegación inferior y la base para persistencia y capacidades nativas.

## Próximos módulos

1. Autenticación y sesión persistente.
2. Dashboard con contador de relación.
3. Notas + respuestas + adjuntos.
4. Galería + cámara + MediaStore.
5. Calendario + recordatorios + notificaciones.
6. Diario y deseos.
7. Chat efímero.
8. Biometría y almacenamiento seguro.
9. Sincronización con el backend existente.
10. Widgets y deep links.
11. Pruebas instrumentadas y release AAB/APK.
