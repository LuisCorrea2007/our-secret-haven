package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import app.espacionuestro.android.data.remote.SupabaseClientProvider
import io.github.jan.supabase.auth.auth
import io.github.jan.supabase.auth.providers.builtin.Email
import kotlinx.coroutines.launch

@Composable
fun AuthScreen(modifier: Modifier = Modifier, onAuthenticated: () -> Unit = {}) {
    val client = remember { SupabaseClientProvider.client }
    val scope = rememberCoroutineScope()
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var displayEmail by remember { mutableStateOf(client?.auth?.currentUserOrNull()?.email) }
    var createAccount by remember { mutableStateOf(false) }
    var busy by remember { mutableStateOf(false) }
    var message by remember { mutableStateOf<String?>(null) }

    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp)
    ) {
        Column(
            modifier = Modifier.padding(18.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text("Tu cuenta", style = MaterialTheme.typography.titleLarge)
            Text(
                "Accede con la misma cuenta que utilizas en Espacio Nuestro.",
                style = MaterialTheme.typography.bodyMedium
            )

            if (!SupabaseClientProvider.isConfigured || client == null) {
                Text(
                    "Falta configurar Supabase para esta compilación. La app local sigue disponible; el inicio de sesión se habilitará al configurar la URL y la clave publicable.",
                    color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodyMedium
                )
                return@Column
            }

            if (displayEmail != null) {
                Text("Sesión iniciada como", style = MaterialTheme.typography.labelMedium)
                Text(displayEmail!!, style = MaterialTheme.typography.bodyLarge)
                Button(
                    enabled = !busy,
                    onClick = {
                        scope.launch {
                            busy = true
                            message = null
                            try {
                                client.auth.signOut()
                                displayEmail = null
                                message = "Sesión cerrada en este dispositivo."
                            } catch (_: Exception) {
                                message = "No se pudo cerrar la sesión. Inténtalo otra vez."
                            } finally {
                                busy = false
                            }
                        }
                    }
                ) {
                    Text("Cerrar sesión")
                }
            } else {
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Correo electrónico") },
                    singleLine = true
                )
                OutlinedTextField(
                    value = password,
                    onValueChange = { password = it },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Contraseña (mínimo 8 caracteres)") },
                    singleLine = true,
                    visualTransformation = PasswordVisualTransformation()
                )
                Button(
                    modifier = Modifier.fillMaxWidth(),
                    enabled = !busy && email.contains("@") && password.length >= 8,
                    onClick = {
                        scope.launch {
                            busy = true
                            message = null
                            try {
                                if (createAccount) {
                                    client.auth.signUpWith(Email) {
                                        this.email = email.trim()
                                        this.password = password
                                    }
                                    displayEmail = client.auth.currentUserOrNull()?.email
                                    onAuthenticated()
                                    message = if (displayEmail == null) {
                                        "Cuenta enviada. Si el proyecto exige confirmar el correo, revisa tu bandeja antes de entrar."
                                    } else {
                                        "Cuenta creada y sesión iniciada."
                                    }
                                } else {
                                    client.auth.signInWith(Email) {
                                        this.email = email.trim()
                                        this.password = password
                                    }
                                    displayEmail = client.auth.currentUserOrNull()?.email ?: email.trim()
                                    onAuthenticated()
                                    message = "Sesión iniciada correctamente."
                                }
                            } catch (_: Exception) {
                                message = if (createAccount) {
                                    "No se pudo crear la cuenta. Revisa los datos, la conexión y la configuración de Auth en Supabase."
                                } else {
                                    "No se pudo iniciar sesión. Comprueba el correo, la contraseña y la conexión."
                                }
                            } finally {
                                busy = false
                            }
                        }
                    }
                ) {
                    if (busy) {
                        CircularProgressIndicator()
                    } else {
                        Text(if (createAccount) "Crear cuenta" else "Iniciar sesión")
                    }
                }
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.Center
                ) {
                    OutlinedButton(
                        enabled = !busy,
                        onClick = {
                            createAccount = !createAccount
                            message = null
                        }
                    ) {
                        Text(if (createAccount) "Ya tengo cuenta" else "Crear una cuenta nueva")
                    }
                }
            }

            message?.let {
                Text(it, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
