package app.espacionuestro.android.ui
import android.content.Context
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
private data class SavedEntry(val id:Long,val title:String,val body:String,val date:String)
private fun readEntries(c:Context,key:String):List<SavedEntry>{val raw=c.getSharedPreferences("espacio_nuestro",0).getString(key,"[]")?:"[]";return runCatching{val a=JSONArray(raw);(0 until a.length()).map{i->a.getJSONObject(i).let{SavedEntry(it.optLong("id"),it.optString("title"),it.optString("body"),it.optString("date"))}}.reversed()}.getOrDefault(emptyList())}
private fun writeEntries(c:Context,key:String,list:List<SavedEntry>){val a=JSONArray();list.forEach{a.put(JSONObject().put("id",it.id).put("title",it.title).put("body",it.body).put("date",it.date))};c.getSharedPreferences("espacio_nuestro",0).edit().putString(key,a.toString()).apply()}
@Composable fun MoreFeaturesScreen(modifier:Modifier=Modifier){
 val context=LocalContext.current;var section by remember{mutableStateOf("Diario")};var diary by remember{mutableStateOf(readEntries(context,"diary"))};var wishes by remember{mutableStateOf(readEntries(context,"wishes"))};var title by remember{mutableStateOf("")};var body by remember{mutableStateOf("")};var editor by remember{mutableStateOf(false)}
 val prompts=listOf("¿Cuál fue el primer momento en que supiste que era especial?","¿Qué pequeño plan te gustaría hacer juntos?","¿Qué recuerdo te hace sonreír siempre?","¿Qué cosa nueva te gustaría aprender en pareja?","¿Qué detalle te hace sentir amado/a?")
 var promptIndex by remember{mutableIntStateOf((System.currentTimeMillis()%prompts.size).toInt())}
 Column(modifier.fillMaxSize().padding(20.dp),verticalArrangement=Arrangement.spacedBy(14.dp)){
 Text("Nuestro mundo",style=MaterialTheme.typography.headlineMedium);Text("Un lugar para escribir, soñar y descubrir cosas juntos.",color=MaterialTheme.colorScheme.onSurfaceVariant)
 Row(horizontalArrangement=Arrangement.spacedBy(8.dp),modifier=Modifier.fillMaxWidth()){listOf("Diario","Deseos","Juego").forEach{label->FilterChip(selected=section==label,onClick={section=label},label={Text(label)})}}
 when(section){
 "Diario"->{Text("Diario de recuerdos",style=MaterialTheme.typography.titleLarge);Text("Guarden pensamientos y momentos que no quieren olvidar.");Button(onClick={title="";body="";editor=true},modifier=Modifier.fillMaxWidth()){Text("Escribir en el diario")};EntryList(diary,{entry->diary=diary.filterNot{it.id==entry.id};writeEntries(context,"diary",diary)},empty="Todavía no hay entradas en el diario.")}
 "Deseos"->{Text("La lista de deseos",style=MaterialTheme.typography.titleLarge);Text("Ideas pequeñas y grandes que les gustaría cumplir juntos.");Button(onClick={title="";body="";editor=true},modifier=Modifier.fillMaxWidth()){Text("Agregar un deseo")};EntryList(wishes,{entry->wishes=wishes.filterNot{it.id==entry.id};writeEntries(context,"wishes",wishes)},empty="Aquí pueden guardar sus próximos sueños.")}
 else->{Card(shape=RoundedCornerShape(24.dp),colors=CardDefaults.cardColors(containerColor=MaterialTheme.colorScheme.primaryContainer)){Column(Modifier.fillMaxWidth().padding(20.dp),verticalArrangement=Arrangement.spacedBy(14.dp)){Icon(Icons.Default.Favorite,null,tint=MaterialTheme.colorScheme.onPrimaryContainer);Text("Pregunta para los dos",style=MaterialTheme.typography.titleLarge,color=MaterialTheme.colorScheme.onPrimaryContainer);Text(prompts[promptIndex],style=MaterialTheme.typography.bodyLarge,color=MaterialTheme.colorScheme.onPrimaryContainer);Button(onClick={promptIndex=(promptIndex+1)%prompts.size},modifier=Modifier.fillMaxWidth()){Text("Otra pregunta")}}};Text("Respondan por turnos o usen la pregunta para iniciar una conversación.")}
 }
 }
 if(editor)AlertDialog(onDismissRequest={editor=false},title={Text(if(section=="Diario")"Nueva entrada" else "Nuevo deseo")},text={Column(verticalArrangement=Arrangement.spacedBy(10.dp)){OutlinedTextField(title,{title=it},label={Text("Título")},singleLine=true);OutlinedTextField(body,{body=it},label={Text(if(section=="Diario")"¿Qué quieres recordar?" else "¿Cómo les gustaría cumplirlo?")},minLines=4)}},confirmButton={Button(enabled=title.isNotBlank()&&body.isNotBlank(),onClick={val item=SavedEntry(System.currentTimeMillis(),title.trim(),body.trim(),SimpleDateFormat("dd/MM/yyyy",Locale("es")).format(Date()));if(section=="Diario"){diary=listOf(item)+diary;writeEntries(context,"diary",diary)}else{wishes=listOf(item)+wishes;writeEntries(context,"wishes",wishes)};editor=false}){Text("Guardar")}},dismissButton={TextButton(onClick={editor=false}){Text("Cancelar")}})
}
@Composable private fun EntryList(entries:List<SavedEntry>,onDelete:(SavedEntry)->Unit,empty:String){
 if(entries.isEmpty())Card(shape=RoundedCornerShape(20.dp)){Text(empty,Modifier.padding(20.dp),color=MaterialTheme.colorScheme.onSurfaceVariant)}
 else LazyColumn(verticalArrangement=Arrangement.spacedBy(10.dp),contentPadding=PaddingValues(bottom=24.dp)){items(entries,key={it.id}){entry->Card(shape=RoundedCornerShape(18.dp)){Column(Modifier.fillMaxWidth().padding(16.dp),verticalArrangement=Arrangement.spacedBy(7.dp)){Row(verticalAlignment=androidx.compose.ui.Alignment.CenterVertically){Text(entry.title,Modifier.weight(1f),style=MaterialTheme.typography.titleMedium);IconButton(onClick={onDelete(entry)}){Icon(Icons.Default.Delete,"Eliminar")}};Text(entry.body);Text(entry.date,style=MaterialTheme.typography.labelSmall,color=MaterialTheme.colorScheme.onSurfaceVariant)}}}}
}
