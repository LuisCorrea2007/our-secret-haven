package app.espacionuestro.android.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val NuestroEspacioColors = lightColorScheme(
    primary = Color(0xFF9A573C),
    onPrimary = Color(0xFFFFFAF3),
    primaryContainer = Color(0xFFF1DED0),
    onPrimaryContainer = Color(0xFF38251D),
    secondary = Color(0xFFB18A53),
    onSecondary = Color(0xFF2C2117),
    secondaryContainer = Color(0xFFF0E4CB),
    onSecondaryContainer = Color(0xFF382A1C),
    tertiary = Color(0xFF9C6A68),
    background = Color(0xFFF9F5ED),
    surface = Color(0xFFFFFCF7),
    surfaceVariant = Color(0xFFF0E8DC),
    onBackground = Color(0xFF382E28),
    onSurface = Color(0xFF382E28),
    onSurfaceVariant = Color(0xFF796B60),
    outline = Color(0xFFD8C9B8),
    error = Color(0xFFB3261E),
)

@Composable
fun EspacioNuestroTheme(content: @Composable () -> Unit) {
    MaterialTheme(colorScheme = NuestroEspacioColors, content = content)
}
