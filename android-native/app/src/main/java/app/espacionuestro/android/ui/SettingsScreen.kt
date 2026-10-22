package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import app.espacionuestro.android.data.remote.SupabaseClientProvider
import io.github.jan.supabase.auth.auth
import kotlinx.coroutines.launch

@Composable
fun SettingsScreen(modifier: Modifier = Modifier, onSignedOut: () -> Unit = {}) {
    val client = SupabaseClientProvider.client
    val scope = rememberCoroutineScope()
    var email by remember { mutableStateOf(client?.auth?.currentUserOrNull()?.email ?: "") }
    var busy by remember { mutableStateOf(false) }
    var message by remember { mutableStateOf<String?>(null) }
    Column(modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 24.dp), verticalArrangement = Arrangement.spacedBy(18.dp)) {
        Text("Ajustes", style = MaterialTheme.typography.headlineMedium)
        Text("Tu perfil y la configuración de Nuestro Espacio.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        Card(shape = RoundedCornerShape(22.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
            Column(Modifier.fillMaxWidth().padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Cuenta", style = MaterialTheme.typography.titleLarge)
                if (email.isNotBlank()) {
                    Text(email, style = MaterialTheme.typography.bodyMedium)
                    Button(enabled = !busy, onClick = {
                        scope.launch {
                            busy = true
                            message = null
                            runCatching { client?.auth?.signOut() }
                                .onSuccess { email = ""; message = "Sesión cerrada."; onSignedOut() }
                                .onFailure { message = "No se pudo cerrar la sesión." }
                            busy = false
                        }
                    }, modifier = Modifier.fillMaxWidth()) { Text("Cerrar sesión") }
                } else {
                    Text("No hay una sesión activa en este dispositivo.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                message?.let { Text(it, style = MaterialTheme.typography.bodySmall) }
            }
        }
        Card(shape = RoundedCornerShape(22.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
            Column(Modifier.fillMaxWidth().padding(18.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Privacidad", style = MaterialTheme.typography.titleLarge)
                Text("La aplicación no contiene claves privadas. Solo utiliza la clave publicable de Supabase. Los datos compartidos se protegerán mediante las políticas de Row Level Security del proyecto.", color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
        Card(shape = RoundedCornerShape(22.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
            Column(Modifier.fillMaxWidth().padding(18.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Aplicación", style = MaterialTheme.typography.titleLarge)
                Text("Nuestro Espacio · versión 1.0.0", style = MaterialTheme.typography.bodyMedium)
                Text("Kotlin + Jetpack Compose · Android nativo", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text("Supabase: ${if (SupabaseClientProvider.isConfigured) "configurado" else "sin configurar"}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}
