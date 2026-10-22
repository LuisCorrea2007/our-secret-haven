package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale

@Composable
fun CalendarScreen(modifier: Modifier = Modifier, vm: CoupleCloudViewModel = viewModel()) {
    val events by vm.events.collectAsStateWithLifecycle()
    var editing by remember { mutableStateOf(false) }
    var title by remember { mutableStateOf("") }
    var date by remember { mutableStateOf(LocalDate.now().plusDays(1).toString()) }
    var note by remember { mutableStateOf("") }
    Column(modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Text("Nuestra agenda", style = MaterialTheme.typography.headlineMedium)
        Text("Fechas importantes, citas y pequeños planes para los dos.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        Card(shape = RoundedCornerShape(24.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer), modifier = Modifier.fillMaxWidth()) {
            Row(Modifier.padding(18.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(14.dp)) {
                Icon(Icons.Default.CalendarMonth, null, modifier = Modifier.size(34.dp), tint = MaterialTheme.colorScheme.primary)
                Column { Text(LocalDate.now().format(DateTimeFormatter.ofPattern("EEEE d 'de' MMMM", Locale.forLanguageTag("es"))).replaceFirstChar { it.uppercase() }, style = MaterialTheme.typography.titleMedium); Text("${events.size} planes sincronizados", color = MaterialTheme.colorScheme.onSurfaceVariant) }
            }
        }
        Button(onClick = { editing = true }, modifier = Modifier.fillMaxWidth()) { Icon(Icons.Default.Add, null); Spacer(Modifier.width(8.dp)); Text("Agregar un plan") }
        if (events.isEmpty()) Card(shape = RoundedCornerShape(20.dp)) { Column(Modifier.padding(22.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) { Text("Todavía no hay planes", style = MaterialTheme.typography.titleMedium); Text("Guarden aquí su próxima cita, aniversario o actividad.") } }
        else LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp), contentPadding = PaddingValues(bottom = 24.dp)) {
            items(events, key = { it.id }) { e ->
                Card(shape = RoundedCornerShape(18.dp)) {
                    Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) { Text(e.title, style = MaterialTheme.typography.titleMedium); Text(e.date, color = MaterialTheme.colorScheme.primary); e.description?.let { if (it.isNotBlank()) Text(it) } }
                        IconButton(onClick = { vm.deleteEvent(e.id) }) { Icon(Icons.Default.Delete, "Eliminar plan") }
                    }
                }
            }
        }
    }
    if (editing) AlertDialog(
        onDismissRequest = { editing = false },
        title = { Text("Nuevo plan juntos") },
        text = { Column(verticalArrangement = Arrangement.spacedBy(8.dp)) { OutlinedTextField(title, { title = it }, label = { Text("¿Qué haremos?") }, singleLine = true); OutlinedTextField(date, { date = it }, label = { Text("Fecha (AAAA-MM-DD)") }, singleLine = true); OutlinedTextField(note, { note = it }, label = { Text("Nota opcional") }, minLines = 2) } },
        confirmButton = { Button(enabled = title.isNotBlank() && runCatching { LocalDate.parse(date); true }.getOrDefault(false), onClick = { vm.addEvent(title.trim(), date, note.trim().ifBlank { null }); title = ""; note = ""; editing = false }) { Text("Guardar") } },
        dismissButton = { TextButton(onClick = { editing = false }) { Text("Cancelar") } }
    )
}
