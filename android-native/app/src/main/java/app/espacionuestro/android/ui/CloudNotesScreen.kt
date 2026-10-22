package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun CloudNotesScreen(modifier: Modifier = Modifier, vm: CoupleCloudViewModel = viewModel()) {
    val notes by vm.notes.collectAsStateWithLifecycle()
    val error by vm.error.collectAsStateWithLifecycle()
    var title by remember { mutableStateOf("") }
    var content by remember { mutableStateOf("") }
    var showDialog by remember { mutableStateOf(false) }
    Column(modifier.fillMaxSize().padding(horizontal = 18.dp, vertical = 16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Text("Notas de ustedes", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.SemiBold)
        Text("Palabras, ideas y recuerdos que quieren conservar.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        Button(onClick = { showDialog = true }, modifier = Modifier.fillMaxWidth()) { Icon(Icons.Default.Add, null); Spacer(Modifier.width(8.dp)); Text("Escribir una nota") }
        error?.let { msg -> Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer), shape = RoundedCornerShape(14.dp)) { Text(msg, Modifier.padding(12.dp), color = MaterialTheme.colorScheme.onErrorContainer, style = MaterialTheme.typography.bodySmall) } }
        if (notes.isEmpty()) {
            Card(shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
                Column(Modifier.fillMaxWidth().padding(22.dp), verticalArrangement = Arrangement.spacedBy(8.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(Icons.Default.EditNote, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(34.dp))
                    Text("Todavía no hay notas", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text("Crea la primera nota. Para sincronizarla, inicia sesión con una cuenta configurada en Supabase.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                    TextButton(onClick = vm::refresh) { Text("Volver a intentar") }
                }
            }
        } else {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp), contentPadding = PaddingValues(bottom = 18.dp)) {
                items(notes, key = { it.id }) { note ->
                    Card(shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)) {
                        Column(Modifier.fillMaxWidth().padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(note.title, Modifier.weight(1f), style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                                IconButton(onClick = { vm.toggleNoteFavorite(note.id, !note.is_favorite) }) { Icon(if (note.is_favorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder, "Marcar favorita", tint = MaterialTheme.colorScheme.primary) }
                                IconButton(onClick = { vm.deleteNote(note.id) }) { Icon(Icons.Default.DeleteOutline, "Eliminar nota") }
                            }
                            Text(note.content, style = MaterialTheme.typography.bodyMedium)
                            Text(note.created_at.take(10), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
    if (showDialog) AlertDialog(
        onDismissRequest = { showDialog = false },
        title = { Text("Nueva nota") },
        text = { Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            OutlinedTextField(title, { title = it }, label = { Text("Título") }, singleLine = true, modifier = Modifier.fillMaxWidth())
            OutlinedTextField(content, { content = it }, label = { Text("Recuerdo o mensaje") }, minLines = 4, modifier = Modifier.fillMaxWidth())
        } },
        confirmButton = { Button(enabled = title.isNotBlank() && content.isNotBlank(), onClick = { vm.addNote(title.trim(), content.trim()); title = ""; content = ""; showDialog = false }) { Text("Guardar") } },
        dismissButton = { TextButton(onClick = { showDialog = false }) { Text("Cancelar") } }
    )
}
