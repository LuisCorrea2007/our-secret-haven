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
import java.time.LocalDate

@Composable
fun CloudWishesScreen(modifier: Modifier = Modifier, vm: CoupleCloudViewModel = viewModel()) {
    val wishes by vm.wishes.collectAsStateWithLifecycle()
    var title by remember { mutableStateOf("") }
    var desc by remember { mutableStateOf("") }
    var dialog by remember { mutableStateOf(false) }
    Column(modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Sueños compartidos", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.SemiBold)
        Text("Lo que quieren vivir juntos.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        Button(onClick = { dialog = true }, modifier = Modifier.fillMaxWidth()) { Icon(Icons.Default.Add, null); Spacer(Modifier.width(8.dp)); Text("Nuevo deseo") }
        if (wishes.isEmpty()) EmptyCard("Todavía no hay deseos", "Añadan el primer plan que quieran cumplir juntos.")
        else LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(wishes, key = { it.id }) { w ->
                Card(shape = RoundedCornerShape(20.dp)) {
                    Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                        Checkbox(checked = w.is_completed, onCheckedChange = { vm.toggleWish(w.id, it) })
                        Column(Modifier.weight(1f)) {
                            Text(w.title, style = MaterialTheme.typography.titleMedium)
                            w.description?.let { if (it.isNotBlank()) Text(it, color = MaterialTheme.colorScheme.onSurfaceVariant) }
                        }
                        IconButton(onClick = { vm.deleteWish(w.id) }) { Icon(Icons.Default.DeleteOutline, "Eliminar") }
                    }
                }
            }
        }
    }
    if (dialog) {
        AlertDialog(
            onDismissRequest = { dialog = false },
            title = { Text("Nuevo deseo") },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(title, { title = it }, label = { Text("Título") }, singleLine = true)
                    OutlinedTextField(desc, { desc = it }, label = { Text("Descripción") }, minLines = 2)
                }
            },
            confirmButton = { Button(enabled = title.isNotBlank(), onClick = { vm.addWish(title.trim(), desc.trim().ifBlank { null }); title = ""; desc = ""; dialog = false }) { Text("Guardar") } },
            dismissButton = { TextButton(onClick = { dialog = false }) { Text("Cancelar") } }
        )
    }
}

@Composable
fun CloudDiaryScreen(modifier: Modifier = Modifier, vm: CoupleCloudViewModel = viewModel()) {
    val entries by vm.milestones.collectAsStateWithLifecycle()
    var title by remember { mutableStateOf("") }
    var desc by remember { mutableStateOf("") }
    var date by remember { mutableStateOf(LocalDate.now().toString()) }
    var dialog by remember { mutableStateOf(false) }
    Column(modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Diario de recuerdos", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.SemiBold)
        Text("Su historia, guardada en la nube.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        Button(onClick = { dialog = true }, modifier = Modifier.fillMaxWidth()) { Icon(Icons.Default.Add, null); Spacer(Modifier.width(8.dp)); Text("Nueva entrada") }
        if (entries.isEmpty()) EmptyCard("Aún no hay recuerdos", "Escriban aquí los momentos que quieran conservar.")
        else LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(entries, key = { it.id }) { e ->
                Card(shape = RoundedCornerShape(20.dp)) {
                    Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(e.title, style = MaterialTheme.typography.titleMedium)
                            Text(e.date, color = MaterialTheme.colorScheme.primary)
                            e.description?.let { if (it.isNotBlank()) Text(it) }
                        }
                        IconButton(onClick = { vm.deleteMilestone(e.id) }) { Icon(Icons.Default.DeleteOutline, "Eliminar") }
                    }
                }
            }
        }
    }
    if (dialog) {
        AlertDialog(
            onDismissRequest = { dialog = false },
            title = { Text("Nueva entrada") },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(title, { title = it }, label = { Text("Título") }, singleLine = true)
                    OutlinedTextField(date, { date = it }, label = { Text("Fecha") }, singleLine = true)
                    OutlinedTextField(desc, { desc = it }, label = { Text("Recuerdo") }, minLines = 3)
                }
            },
            confirmButton = { Button(enabled = title.isNotBlank() && runCatching { LocalDate.parse(date); true }.getOrDefault(false), onClick = { vm.addMilestone(title.trim(), date, desc.trim().ifBlank { null }); title = ""; desc = ""; dialog = false }) { Text("Guardar") } },
            dismissButton = { TextButton(onClick = { dialog = false }) { Text("Cancelar") } }
        )
    }
}

@Composable
fun CloudFunScreen(modifier: Modifier = Modifier, vm: CoupleCloudViewModel = viewModel()) {
    val items by vm.funItems.collectAsStateWithLifecycle()
    var custom by remember { mutableStateOf("") }
    var dialog by remember { mutableStateOf(false) }
    val question = items.firstOrNull()?.content ?: "¿Qué recuerdo nuestro te hace sonreír siempre?"
    Column(modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Diversión en pareja", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.SemiBold)
        Text("Preguntas para conocerse y guardar nuevas respuestas.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        Card(shape = RoundedCornerShape(24.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)) {
            Column(Modifier.fillMaxWidth().padding(22.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                Icon(Icons.Default.Favorite, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(30.dp))
                Text("Pregunta del momento", style = MaterialTheme.typography.titleMedium)
                Text(question, style = MaterialTheme.typography.headlineSmall)
                Button(onClick = { if (items.size > 1) vm.deleteFun(items.first().id) }, modifier = Modifier.fillMaxWidth()) { Text("Siguiente pregunta") }
            }
        }
        Button(onClick = { dialog = true }, modifier = Modifier.fillMaxWidth()) { Icon(Icons.Default.Add, null); Spacer(Modifier.width(8.dp)); Text("Agregar una pregunta") }
        if (items.isNotEmpty()) Text("${items.size} preguntas guardadas en la cuenta", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
    if (dialog) {
        AlertDialog(
            onDismissRequest = { dialog = false },
            title = { Text("Nueva pregunta") },
            text = { OutlinedTextField(custom, { custom = it }, label = { Text("Pregunta") }, minLines = 2) },
            confirmButton = { Button(enabled = custom.isNotBlank(), onClick = { vm.addFun(custom.trim()); custom = ""; dialog = false }) { Text("Guardar") } },
            dismissButton = { TextButton(onClick = { dialog = false }) { Text("Cancelar") } }
        )
    }
}

@Composable
private fun EmptyCard(title: String, body: String) {
    Card(shape = RoundedCornerShape(20.dp)) { Column(Modifier.fillMaxWidth().padding(22.dp), verticalArrangement = Arrangement.spacedBy(7.dp)) { Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold); Text(body, color = MaterialTheme.colorScheme.onSurfaceVariant) } }
}
