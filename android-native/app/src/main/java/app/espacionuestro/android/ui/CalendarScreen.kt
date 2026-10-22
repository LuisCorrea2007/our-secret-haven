package app.espacionuestro.android.ui
import android.content.Context
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import org.json.JSONArray
import org.json.JSONObject
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale
private data class CoupleEvent(val title:String,val date:String,val note:String)
private fun loadEvents(c:Context):List<CoupleEvent>{val raw=c.getSharedPreferences("espacio_nuestro",0).getString("events","[]")?:"[]";return runCatching{val a=JSONArray(raw);(0 until a.length()).map{i->a.getJSONObject(i).let{CoupleEvent(it.optString("title"),it.optString("date"),it.optString("note"))}}.sortedBy{it.date}}.getOrDefault(emptyList())}
private fun saveEvents(c:Context,es:List<CoupleEvent>){val a=JSONArray();es.forEach{a.put(JSONObject().put("title",it.title).put("date",it.date).put("note",it.note))};c.getSharedPreferences("espacio_nuestro",0).edit().putString("events",a.toString()).apply()}
@Composable fun CalendarScreen(modifier:Modifier=Modifier){
 val c=LocalContext.current;var events by remember{mutableStateOf(loadEvents(c))};var editing by remember{mutableStateOf(false)};var title by remember{mutableStateOf("")};var date by remember{mutableStateOf(LocalDate.now().plusDays(1).toString())};var note by remember{mutableStateOf("")}
 Column(modifier.fillMaxSize().padding(20.dp),verticalArrangement=Arrangement.spacedBy(14.dp)){
 Text("Nuestra agenda",style=MaterialTheme.typography.headlineMedium);Text("Fechas importantes, citas y pequeños planes para los dos.",color=MaterialTheme.colorScheme.onSurfaceVariant)
 Card(shape=RoundedCornerShape(24.dp),colors=CardDefaults.cardColors(containerColor=MaterialTheme.colorScheme.primaryContainer),modifier=Modifier.fillMaxWidth()){Row(Modifier.padding(18.dp),verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.spacedBy(14.dp)){Icon(Icons.Default.CalendarMonth,null,modifier=Modifier.size(34.dp),tint=MaterialTheme.colorScheme.onPrimaryContainer);Column{Text(LocalDate.now().format(DateTimeFormatter.ofPattern("EEEE d 'de' MMMM",Locale.forLanguageTag("es"))).replaceFirstChar{it.uppercase()},style=MaterialTheme.typography.titleMedium,color=MaterialTheme.colorScheme.onPrimaryContainer);Text("${events.size} planes guardados en este dispositivo",color=MaterialTheme.colorScheme.onPrimaryContainer)}}}
 Button(onClick={editing=true},modifier=Modifier.fillMaxWidth()){Icon(Icons.Default.Add,null);Spacer(Modifier.width(8.dp));Text("Agregar un plan")}
 if(events.isEmpty()) Card(shape=RoundedCornerShape(20.dp)){Column(Modifier.padding(22.dp),verticalArrangement=Arrangement.spacedBy(8.dp)){Text("Todavía no hay planes",style=MaterialTheme.typography.titleMedium);Text("Guarden aquí su próxima cita, aniversario o actividad.")}}
 else LazyColumn(verticalArrangement=Arrangement.spacedBy(10.dp),contentPadding=PaddingValues(bottom=24.dp)){itemsIndexed(events,key={i,e->"${e.date}-${e.title}-${i}"}){i,e->Card(shape=RoundedCornerShape(18.dp)){Row(Modifier.fillMaxWidth().padding(16.dp),verticalAlignment=Alignment.CenterVertically){Column(Modifier.weight(1f),verticalArrangement=Arrangement.spacedBy(4.dp)){Text(e.title,style=MaterialTheme.typography.titleMedium);Text(e.date,color=MaterialTheme.colorScheme.primary);if(e.note.isNotBlank())Text(e.note)};IconButton(onClick={events=events.filterIndexed{j,_->j!=i};saveEvents(c,events)}){Icon(Icons.Default.Delete,"Eliminar plan")}}}}}
 }
 if(editing) AlertDialog(onDismissRequest={editing=false},title={Text("Nuevo plan juntos")},text={Column(verticalArrangement=Arrangement.spacedBy(8.dp)){OutlinedTextField(title,{title=it},label={Text("¿Qué haremos?")},singleLine=true);OutlinedTextField(date,{date=it},label={Text("Fecha (AAAA-MM-DD)")},singleLine=true);OutlinedTextField(note,{note=it},label={Text("Nota opcional")},minLines=2)}},confirmButton={Button(enabled=title.isNotBlank()&&runCatching{LocalDate.parse(date);true}.getOrDefault(false),onClick={events=(events+CoupleEvent(title.trim(),date,note.trim())).sortedBy{it.date};saveEvents(c,events);title="";note="";date=LocalDate.now().plusDays(1).toString();editing=false}){Text("Guardar")}},dismissButton={TextButton(onClick={editing=false}){Text("Cancelar")}})
}