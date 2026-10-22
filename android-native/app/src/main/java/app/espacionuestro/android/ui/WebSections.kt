package app.espacionuestro.android.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
private fun WebPageHeader(kicker: String, title: String, description: String) {
    Column(verticalArrangement = Arrangement.spacedBy(7.dp)) {
        Text(kicker.uppercase(), style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.primary, letterSpacing = androidx.compose.ui.unit.TextUnit(2f, androidx.compose.ui.unit.TextUnitType.Sp))
        Text(title, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.SemiBold)
        Text(description, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun WebSurfaceCard(content: @Composable ColumnScope.() -> Unit) {
    Card(
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.45f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) { Column(Modifier.fillMaxWidth().padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp), content = content) }
}

@Composable
fun VideosScreen(modifier: Modifier = Modifier) {
    var note by remember { mutableStateOf(false) }
    Column(modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 24.dp), verticalArrangement = Arrangement.spacedBy(20.dp)) {
        WebPageHeader("Recuerdos en movimiento", "Nuestros videos", "Un espacio para conservar esos momentos que también merecen volver a vivirse.")
        WebSurfaceCard {
            Icon(Icons.Default.VideoLibrary, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(30.dp))
            Text("Su colección de videos", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
            Text("Cuando agreguen videos, aparecerán aquí organizados para volver a verlos juntos.", color = MaterialTheme.colorScheme.onSurfaceVariant)
            OutlinedButton(onClick = { note = true }, modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Default.Add, null); Spacer(Modifier.width(8.dp)); Text("Cómo agregar videos")
            }
        }
        if (note) AlertDialog(onDismissRequest = { note = false }, title = { Text("Agregar videos") },
            text = { Text("La selección de videos desde el dispositivo se incorporará a esta sección. La galería actual permite elegir fotos y contenido multimedia.") },
            confirmButton = { TextButton(onClick = { note = false }) { Text("Entendido") } })
    }
}

@Composable
fun WishesScreen(modifier: Modifier = Modifier) {
    var wish by remember { mutableStateOf("") }
    var wishes by remember { mutableStateOf(listOf<String>()) }
    Column(modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 24.dp), verticalArrangement = Arrangement.spacedBy(18.dp)) {
        WebPageHeader("Sueños compartidos", "Lista de deseos", "Ideas pequeñas y grandes que quieren cumplir juntos.")
        WebSurfaceCard {
            Text("Un deseo para los dos", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
            OutlinedTextField(wish, { wish = it }, modifier = Modifier.fillMaxWidth(), placeholder = { Text("Escriban algo que sueñan hacer…") }, singleLine = true)
            Button(onClick = { if (wish.isNotBlank()) { wishes = wishes + wish.trim(); wish = "" } }, enabled = wish.isNotBlank(), modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Default.Add, null); Spacer(Modifier.width(8.dp)); Text("Guardar deseo")
            }
        }
        if (wishes.isEmpty()) WebSurfaceCard {
            Icon(Icons.Default.AutoAwesome, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(28.dp))
            Text("Aquí empiezan sus próximos sueños", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text("Añadan planes, lugares y experiencias que quieran vivir en pareja.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        } else wishes.forEachIndexed { i, item ->
            WebSurfaceCard {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Favorite, null, tint = MaterialTheme.colorScheme.primary)
                    Spacer(Modifier.width(10.dp)); Text(item, Modifier.weight(1f))
                    IconButton(onClick = { wishes = wishes.filterIndexed { index, _ -> index != i } }) { Icon(Icons.Default.DeleteOutline, "Eliminar") }
                }
            }
        }
    }
}

@Composable
fun DiaryScreen(modifier: Modifier = Modifier) {
    var title by remember { mutableStateOf("") }
    var body by remember { mutableStateOf("") }
    var entries by remember { mutableStateOf(listOf<Pair<String, String>>()) }
    Column(modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 24.dp), verticalArrangement = Arrangement.spacedBy(18.dp)) {
        WebPageHeader("Lo que vivimos", "Diario de recuerdos", "Pensamientos, anécdotas y pequeños momentos que no quieren olvidar.")
        WebSurfaceCard {
            Text("Una página nueva", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
            OutlinedTextField(title, { title = it }, modifier = Modifier.fillMaxWidth(), label = { Text("Título del recuerdo") }, singleLine = true)
            OutlinedTextField(body, { body = it }, modifier = Modifier.fillMaxWidth(), label = { Text("Escriban aquí…") }, minLines = 4)
            Button(onClick = { if (title.isNotBlank() && body.isNotBlank()) { entries = listOf(title.trim() to body.trim()) + entries; title = ""; body = "" } },
                enabled = title.isNotBlank() && body.isNotBlank(), modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Default.EditNote, null); Spacer(Modifier.width(8.dp)); Text("Guardar entrada")
            }
        }
        if (entries.isEmpty()) WebSurfaceCard {
            Text("Todavía no hay entradas", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text("Empiecen a construir su historia una página a la vez.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        } else entries.forEach { entry ->
            WebSurfaceCard {
                Text(entry.first, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                Text(entry.second)
            }
        }
    }
}

@Composable
fun FunScreen(modifier: Modifier = Modifier) {
    val questions = listOf(
        "¿Qué recuerdo nuestro te hace sonreír siempre?",
        "¿Qué plan nuevo te gustaría hacer conmigo?",
        "¿Qué detalle pequeño te hace sentir amado/a?",
        "¿Qué canción te recuerda a nuestra historia?",
        "¿Qué te gustaría que nunca dejáramos de hacer juntos?"
    )
    var index by remember { mutableIntStateOf(0) }
    Column(modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 24.dp), verticalArrangement = Arrangement.spacedBy(20.dp)) {
        WebPageHeader("Un momento para ustedes", "Diversión en pareja", "Preguntas y pequeñas dinámicas para descubrirse un poco más.")
        WebSurfaceCard {
            Icon(Icons.Default.Favorite, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(32.dp))
            Text("Pregunta del momento", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
            Text(questions[index], style = MaterialTheme.typography.headlineSmall)
            Button(onClick = { index = (index + 1) % questions.size }, modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Default.Casino, null); Spacer(Modifier.width(8.dp)); Text("Otra pregunta")
            }
        }
        WebSurfaceCard {
            Text("Cómo jugar", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Text("Lean la pregunta por turnos, respondan con sinceridad y guarden las respuestas que quieran recordar.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
