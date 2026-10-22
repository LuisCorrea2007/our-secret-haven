package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material3.Icon
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
            0 -> HomeScreen(contentModifier)
            1 -> NotesScreen(contentModifier)
            2 -> GalleryScreen(contentModifier)
            3 -> CalendarScreen(contentModifier)
            else -> AboutScreen(contentModifier)
        }
    }
}

@Composable
private fun AboutScreen(modifier: Modifier = Modifier) {
    androidx.compose.foundation.layout.Column(
        modifier = modifier
            .androidxComposeFillMaxSize()
            .padding(androidx.compose.ui.unit.dp(24)),
        verticalArrangement = androidx.compose.foundation.layout.Arrangement.spacedBy(androidx.compose.ui.unit.dp(12))
    ) {
        Text("Nuestro espacio", style = androidx.compose.material3.MaterialTheme.typography.headlineMedium)
        Text("Un lugar privado para guardar recuerdos, escribirnos y planear momentos juntos.")
        androidx.compose.material3.Card {
            androidx.compose.foundation.layout.Column(Modifier.padding(androidx.compose.ui.unit.dp(16))) {
                Text("Diseñada para ustedes", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
                Text("La app está construida con Kotlin y componentes nativos de Android.")
            }
        }
    }
}

private fun Modifier.androidxComposeFillMaxSize(): Modifier =
    this.then(androidx.compose.foundation.layout.fillMaxSize())
