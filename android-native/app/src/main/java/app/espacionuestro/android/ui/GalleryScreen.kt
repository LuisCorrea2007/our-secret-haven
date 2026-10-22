package app.espacionuestro.android.ui

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddPhotoAlternate
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage

@Composable
fun GalleryScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val selectedUris = remember { mutableStateListOf<android.net.Uri>() }
    val picker = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickMultipleVisualMedia(30)
    ) { uris ->
        selectedUris.clear()
        selectedUris.addAll(uris)
    }

    Column(
        modifier = modifier.fillMaxSize().padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Nuestros recuerdos", style = MaterialTheme.typography.headlineMedium)
        Text("Elige fotos o vídeos del dispositivo. La selección no se sube a ningún servidor.")
        Button(
            onClick = {
                picker.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageAndVideo))
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            androidx.compose.material3.Icon(Icons.Default.AddPhotoAlternate, contentDescription = null)
            Text("  Elegir fotos y vídeos")
        }
        if (selectedUris.isEmpty()) {
            Card {
                Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Tu galería empieza aquí", style = MaterialTheme.typography.titleMedium)
                    Text("Selecciona recuerdos para verlos en esta pantalla. La app usa el selector seguro de Android y no necesita permiso general de almacenamiento.")
                }
            }
        } else {
            Text("${selectedUris.size} elementos seleccionados")
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 120.dp),
                contentPadding = PaddingValues(bottom = 24.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(selectedUris, key = { it.toString() }) { uri ->
                    AsyncImage(
                        model = uri,
                        contentDescription = "Recuerdo seleccionado",
                        modifier = Modifier.fillMaxWidth().padding(2.dp)
                    )
                }
            }
        }
    }
}
