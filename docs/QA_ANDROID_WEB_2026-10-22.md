# QA de Nuestro Espacio — 2026-10-22

## Alcance y resultado

- Rama de trabajo: `android-native`; `main` no se modifica.
- Web: `npm install --no-audit --no-fund` completó y `npm run build` completó correctamente.
- Web lint: `npm run lint` falla con 907 errores y 7 advertencias. La mayoría de los errores son reglas de formato Prettier, pero también hay usos de `any` y problemas que deben revisarse individualmente. No se aplicó un formateo masivo porque produciría un diff grande y no relacionado.
- Android: `gradle testDebugUnitTest assembleDebug assembleRelease --no-daemon --max-workers=2` completó correctamente.
- Pruebas unitarias Android: `NO-SOURCE`; no hay pruebas unitarias implementadas. La compilación no equivale a QA funcional de cada pantalla.
- Aviso de bundle web: chunk JavaScript principal de aproximadamente 578 kB sin comprimir; conviene dividirlo.
- `npm ci` inicialmente falló porque package.json y package-lock.json estaban desincronizados; `npm install` corrigió el lockfile y el build web quedó funcionando.

## Inventario de funciones de la web

Las rutas autenticadas implementadas incluyen Panel, Notas (lista y detalle), Galería, Videos, Calendario/Citas, Deseos, Diario, Diversión y Ajustes. La aplicación nativa tiene destinos para Panel, Notas, Galería, Videos, Citas, Deseos, Diario, Diversión y Ajustes, pero no se ha demostrado paridad funcional completa.

## Diferencias conocidas / pendientes para la APK

1. **Paridad visual:** la interfaz Android actual está hecha en Jetpack Compose. Aunque usa una paleta crema/terracota similar, no renderiza los CSS reales de `src/styles.css`, ni los mismos componentes React/Tailwind. No afirmar que el diseño web está copiado.
2. **Notas:** hay pantalla nativa conectada al repositorio Supabase; deben probarse CRUD, adjuntos, reacciones y permisos con dos cuentas reales.
3. **Galería y Videos:** selección/visualización local no equivale a subida a Storage ni sincronización entre teléfonos. Confirmar subida, URLs firmadas, borrado y persistencia.
4. **Diario, Diversión y Deseos:** existen pantallas, pero validar que cada operación persista en las mismas tablas que la web; la existencia de una pantalla no demuestra paridad de datos.
5. **Citas:** validar alta/edición/borrado, zonas horarias, recurrencia si existe en web, y respuestas entre miembros.
6. **Autenticación:** probar registro, inicio/cierre de sesión, recuperación, expiración/renovación de token y OAuth. El flujo Google depende de configuración de proveedores y redirects.
7. **Espacio compartido:** falta demostrar que dos cuentas vinculadas ven exclusivamente los datos del mismo espacio y que usuarios ajenos no pueden acceder.
8. **Seguridad:** auditar y restringir RLS de tablas y políticas de Storage antes de considerar producción. Nunca incluir la service-role key en el cliente Android.
9. **QA visual/funcional:** falta una matriz de pruebas automatizadas de cada pantalla y un recorrido manual completo en dispositivo real; el arranque en emulador por sí solo no valida todos los flujos.

## Criterio de salida a producción

No declarar la APK lista para producción hasta conseguir: paridad visual verificada contra capturas de la web, CRUD y sincronización multiusuario verificados, RLS revisado, subida de medios probada, autenticación probada y pruebas automatizadas mínimas para los flujos críticos.
