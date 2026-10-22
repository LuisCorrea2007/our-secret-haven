package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp

private data class Destination(val label: String, val icon: ImageVector)

@Composable
fun EspacioNuestroApp() {
    val destinations = listOf(
        Destination("Inicio", Icons.Default.Home),
        Destination("Notas", Icons.Default.MenuBook),
        Destination("Galería", Icons.Default.PhotoLibrary),
        Destination("Agenda", Icons.Default.CalendarMonth),
        Destination("Nosotros", Icons.Default.Favorite)
    )
    var selected by remember { mutableIntStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar {
                destinations.forEachIndexed { index, destination ->
                    NavigationBarItem(
                        selected = selected == index,
                        onClick = { selected = index },
                        icon = { Icon(destination.icon, contentDescription = destination.label) },
                        label = { Text(destination.label) }
                    )
                }
            }
        }
    ) { padding ->
        val contentModifier = Modifier.padding(padding)
        when (selected) {
            0 -> HomeScreen(contentModifier, onOpenNotes = { selected = 1 }, onOpenGallery = { selected = 2 }, onOpenAgenda = { selected = 3 }, onOpenMore = { selected = 4 })
            1 -> NotesScreen(contentModifier)
            2 -> GalleryScreen(contentModifier)
            3 -> CalendarScreen(contentModifier)
            else -> AboutScreen(contentModifier)
        }
    }
}

@Composable
private fun AboutScreen(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Nuestro espacio", style = MaterialTheme.typography.headlineMedium)
        Text("Un lugar privado para guardar recuerdos, escribirnos y planear momentos juntos.")
        Card {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Diseñada para ustedes", style = MaterialTheme.typography.titleMedium)
                Text("La app está construida con Kotlin y componentes nativos de Android.")
            }
        }
        MoreFeaturesScreen()\n        AuthScreen()
    }
}
