package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
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
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier

private data class Destination(val label: String, val icon: androidx.compose.ui.graphics.vector.ImageVector)

@Composable
fun EspacioNuestroApp() {
    val destinations = listOf(
        Destination("Inicio", Icons.Default.Home),
        Destination("Notas", Icons.Default.MenuBook),
        Destination("Galería", Icons.Default.PhotoLibrary),
        Destination("Nosotros", Icons.Default.Favorite),
    )
    var selected by remember { mutableStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar {
                destinations.forEachIndexed { index, destination ->
                    NavigationBarItem(
                        selected = selected == index,
                        onClick = { selected = index },
                        icon = { Icon(destination.icon, contentDescription = destination.label) },
                        label = { Text(destination.label) },
                    )
                }
            }
        }
    ) { padding ->
        when (selected) {
            0 -> HomeScreen(Modifier.padding(padding))
            1 -> PlaceholderScreen("Notas", Modifier.padding(padding))
            2 -> PlaceholderScreen("Galería", Modifier.padding(padding))
            3 -> PlaceholderScreen("Nosotros", Modifier.padding(padding))
        }
    }
}
