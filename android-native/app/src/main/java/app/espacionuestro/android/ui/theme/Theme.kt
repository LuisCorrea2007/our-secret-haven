package app.espacionuestro.android.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val EspacioNuestroColors = lightColorScheme(
    primary = Color(0xFFB85C72),
    onPrimary = Color.White,
    secondary = Color(0xFFB9825B),
    background = Color(0xFFFFF9F5),
    surface = Color(0xFFFFF9F5),
    surfaceVariant = Color(0xFFF5E9E1),
    onBackground = Color(0xFF342A27),
    onSurface = Color(0xFF342A27),
)

@Composable
fun EspacioNuestroTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = EspacioNuestroColors,
        content = content,
    )
}
