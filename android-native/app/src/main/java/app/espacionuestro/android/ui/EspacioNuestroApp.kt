package app.espacionuestro.android.ui

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
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
import app.espacionuestro.android.data.remote.SupabaseClientProvider
import io.github.jan.supabase.auth.auth

private data class Destination(val label: String, val icon: ImageVector)

@Composable
fun EspacioNuestroApp() {
    val client = SupabaseClientProvider.client
    var signedIn by remember { mutableStateOf(client?.auth?.currentUserOrNull() != null) }
    if (SupabaseClientProvider.isConfigured && !signedIn) {
        AuthScreen(
            Modifier.fillMaxSize().padding(20.dp),
            onAuthenticated = { signedIn = true }
        )
        return
    }

    val destinations = listOf(
        Destination("Panel", Icons.Default.AutoAwesome),
        Destination("Notas", Icons.Default.EditNote),
        Destination("Galería", Icons.Default.Collections),
        Destination("Videos", Icons.Default.Videocam),
        Destination("Citas", Icons.Default.CalendarMonth),
        Destination("Deseos", Icons.Default.AutoAwesome),
        Destination("Diario", Icons.Default.FavoriteBorder),
        Destination("Diversión", Icons.Default.SentimentSatisfiedAlt),
        Destination("Ajustes", Icons.Default.Settings)
    )
    var selected by remember { mutableIntStateOf(0) }
    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            Surface(color = MaterialTheme.colorScheme.background.copy(alpha = .97f)) {
                Column {
                    Row(Modifier.fillMaxWidth().height(62.dp).padding(horizontal = 18.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(9.dp)) {
                        Surface(shape = CircleShape, color = MaterialTheme.colorScheme.primaryContainer) {
                            Icon(Icons.Default.Favorite, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.padding(8.dp).size(18.dp))
                        }
                        Text("Nuestro Espacio", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                        IconButton(onClick = { selected = 8 }) { Icon(Icons.Default.Settings, "Ajustes", tint = MaterialTheme.colorScheme.onSurfaceVariant) }
                    }
                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = .45f))
                }
            }
        },
        bottomBar = {
            Surface(color = MaterialTheme.colorScheme.background.copy(alpha = .98f)) {
                Column {
                    HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = .45f))
                    Row(Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()).padding(horizontal = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                        destinations.forEachIndexed { index, destination ->
                            NavigationBarItem(
                                modifier = Modifier.width(72.dp), selected = selected == index, onClick = { selected = index },
                                icon = { Icon(destination.icon, destination.label, Modifier.size(21.dp)) },
                                label = { Text(destination.label, maxLines = 1, style = MaterialTheme.typography.labelSmall) },
                                alwaysShowLabel = true,
                                colors = NavigationBarItemDefaults.colors(selectedIconColor = MaterialTheme.colorScheme.primary, selectedTextColor = MaterialTheme.colorScheme.primary, indicatorColor = MaterialTheme.colorScheme.secondaryContainer, unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant, unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant)
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
            7 -> FunScreen(contentModifier)
            else -> SettingsScreen(contentModifier) { signedIn = false }
        }
    }
}
