package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

private data class Destination(val label: String, val icon: ImageVector)

@Composable
fun EspacioNuestroApp() {
    val destinations = listOf(
        Destination("Panel", Icons.Default.AutoAwesome),
        Destination("Notas", Icons.Default.EditNote),
        Destination("Galería", Icons.Default.Collections),
        Destination("Videos", Icons.Default.Videocam),
        Destination("Citas", Icons.Default.CalendarMonth),
        Destination("Deseos", Icons.Default.AutoAwesome),
        Destination("Diario", Icons.Default.FavoriteBorder),
        Destination("Diversión", Icons.Default.SentimentSatisfiedAlt)
    )
    var selected by remember { mutableIntStateOf(0) }
    var settingsOpen by remember { mutableStateOf(false) }

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            Surface(
                color = MaterialTheme.colorScheme.background.copy(alpha = 0.97f),
                shadowElevation = 0.dp,
                tonalElevation = 0.dp
            ) {
                Column {
                    Row(
                        Modifier.fillMaxWidth().height(62.dp).padding(horizontal = 18.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(9.dp)
                    ) {
                        Surface(shape = CircleShape, color = MaterialTheme.colorScheme.primaryContainer) {
                            Icon(Icons.Default.Favorite, contentDescription = null, tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.padding(8.dp).size(18.dp))
                        }
                        Text("Nuestro Espacio", style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                        IconButton(onClick = { settingsOpen = true }) {
                            Icon(Icons.Default.Settings, contentDescription = "Ajustes", tint = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.45f))
                }
            }
        },
        bottomBar = {
            Surface(color = MaterialTheme.colorScheme.background.copy(alpha = 0.98f)) {
                Column {
                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.45f))
                    NavigationBar(
                        containerColor = MaterialTheme.colorScheme.background,
                        tonalElevation = 0.dp,
                        windowInsets = WindowInsets.navigationBars
                    ) {
                        destinations.forEachIndexed { index, destination ->
                            NavigationBarItem(
                                selected = selected == index,
                                onClick = { selected = index },
                                icon = { Icon(destination.icon, contentDescription = destination.label, modifier = Modifier.size(21.dp)) },
                                label = { Text(destination.label, maxLines = 1, style = MaterialTheme.typography.labelSmall) },
                                alwaysShowLabel = true,
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = MaterialTheme.colorScheme.primary,
                                    selectedTextColor = MaterialTheme.colorScheme.primary,
                                    indicatorColor = MaterialTheme.colorScheme.secondaryContainer,
                                    unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                                    unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            )
                        }
                    }
                }
            }
        }
    ) { padding ->
        val contentModifier = Modifier.padding(padding)
        when (selected) {
            0 -> HomeScreen(contentModifier, onOpenNotes = { selected = 1 }, onOpenGallery = { selected = 2 }, onOpenAgenda = { selected = 4 }, onOpenMore = { selected = 5 })
            1 -> NotesScreen(contentModifier)
            2 -> GalleryScreen(contentModifier)
            3 -> VideosScreen(contentModifier)
            4 -> CalendarScreen(contentModifier)
            5 -> WishesScreen(contentModifier)
            6 -> DiaryScreen(contentModifier)
            else -> FunScreen(contentModifier)
        }
    }
    if (settingsOpen) {
        AlertDialog(
            onDismissRequest = { settingsOpen = false },
            title = { Text("Ajustes", style = MaterialTheme.typography.headlineSmall) },
            text = { Text("La configuración de perfil y sincronización compartida se completará cuando se conecte de forma segura el backend. Por ahora, tus datos locales permanecen en este dispositivo.") },
            confirmButton = { TextButton(onClick = { settingsOpen = false }) { Text("Cerrar") } }
        )
    }
}
