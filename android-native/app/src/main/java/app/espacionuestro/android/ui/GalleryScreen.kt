package app.espacionuestro.android.ui

import android.content.Context
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddPhotoAlternate
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import org.json.JSONArray
import org.json.JSONObject

private data class GalleryMemory(val uri:String,val favorite:Boolean)
private fun loadGallery(c:Context):List<GalleryMemory> = runCatching {
 val a=JSONArray(c.getSharedPreferences("espacio_nuestro",0).getString("gallery","[]")?:"[]")
 (0 until a.length()).map{a.getJSONObject(it).let{GalleryMemory(it.optString("uri"),it.optBoolean("favorite"))}}
}.getOrDefault(emptyList())
private fun saveGallery(c:Context,items:List<GalleryMemory>){val a=JSONArray();items.forEach{a.put(JSONObject().put("uri",it.uri).put("favorite",it.favorite))};c.getSharedPreferences("espacio_nuestro",0).edit().putString("gallery",a.toString()).apply()}

@Composable
fun GalleryScreen(modifier:Modifier=Modifier){
 val context=LocalContext.current
 var memories by remember{mutableStateOf(loadGallery(context))}
 var onlyFavorites by remember{mutableStateOf(false)}
 val picker=rememberLauncherForActivityResult(ActivityResultContracts.PickMultipleVisualMedia(50)){uris->
  val current=memories.toMutableList()
  uris.forEach{uri->
   runCatching{context.contentResolver.takePersistableUriPermission(uri,android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION)}
   if(current.none{it.uri==uri.toString()})current.add(GalleryMemory(uri.toString(),false))
  }
  memories=current;saveGallery(context,memories)
 }
 Column(modifier.fillMaxSize().padding(horizontal=18.dp,vertical=16.dp),verticalArrangement=Arrangement.spacedBy(12.dp)){
  Text("Nuestros recuerdos",style=MaterialTheme.typography.headlineMedium)
  Text("Una colección privada de fotos y vídeos seleccionados desde tu teléfono.",color=MaterialTheme.colorScheme.onSurfaceVariant)
  Card(shape=RoundedCornerShape(22.dp),colors=CardDefaults.cardColors(containerColor=MaterialTheme.colorScheme.primaryContainer)){
   Row(Modifier.fillMaxWidth().padding(16.dp),verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.spacedBy(12.dp)){
    Icon(Icons.Default.Favorite,null,tint=MaterialTheme.colorScheme.onPrimaryContainer,modifier=Modifier.size(30.dp))
    Column(Modifier.weight(1f)){Text("${memories.size} recuerdos",style=MaterialTheme.typography.titleMedium,color=MaterialTheme.colorScheme.onPrimaryContainer);Text("Guardados en este dispositivo",style=MaterialTheme.typography.bodySmall,color=MaterialTheme.colorScheme.onPrimaryContainer)}
   }
  }
  Row(horizontalArrangement=Arrangement.spacedBy(8.dp),verticalAlignment=Alignment.CenterVertically){
   Button(onClick={picker.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageAndVideo))},modifier=Modifier.weight(1f)){Icon(Icons.Default.AddPhotoAlternate,null);Spacer(Modifier.width(7.dp));Text("Añadir")}
   FilterChip(selected=onlyFavorites,onClick={onlyFavorites=!onlyFavorites},label={Text("Favoritos")})
  }
  val visible=memories.filter{!onlyFavorites||it.favorite}
  if(visible.isEmpty()) Card(shape=RoundedCornerShape(20.dp)){Column(Modifier.fillMaxWidth().padding(22.dp),horizontalAlignment=Alignment.CenterHorizontally,verticalArrangement=Arrangement.spacedBy(8.dp)){Icon(Icons.Default.AddPhotoAlternate,null,modifier=Modifier.size(34.dp),tint=MaterialTheme.colorScheme.primary);Text(if(onlyFavorites)"Aún no hay favoritos" else "Tu álbum empieza aquí",style=MaterialTheme.typography.titleMedium);Text(if(onlyFavorites)"Marca recuerdos con el corazón para encontrarlos aquí." else "Añade fotos y vídeos. La selección se conserva en este dispositivo y no se sube a ningún servidor.",color=MaterialTheme.colorScheme.onSurfaceVariant)}}
  else LazyVerticalGrid(columns=GridCells.Adaptive(minSize=140.dp),contentPadding=PaddingValues(bottom=24.dp),horizontalArrangement=Arrangement.spacedBy(9.dp),verticalArrangement=Arrangement.spacedBy(9.dp),modifier=Modifier.weight(1f)){
   items(visible,key{it.uri}){memory->
    Card(shape=RoundedCornerShape(16.dp)){
     Column {
      AsyncImage(model=Uri.parse(memory.uri),contentDescription="Recuerdo de la galería",modifier=Modifier.fillMaxWidth().height(150.dp))
      Row(Modifier.fillMaxWidth().padding(horizontal=5.dp),verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.SpaceBetween){
       IconButton(onClick={memories=memories.map{if(it.uri==memory.uri)it.copy(favorite=!it.favorite)else it};saveGallery(context,memories)}){Icon(if(memory.favorite)Icons.Default.Favorite else Icons.Default.FavoriteBorder,if(memory.favorite)"Quitar favorito" else "Marcar favorito",tint=if(memory.favorite)MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant)}
       IconButton(onClick={memories=memories.filterNot{it.uri==memory.uri};saveGallery(context,memories)}){Icon(Icons.Default.Delete,"Quitar de la galería")}
      }
     }
    }
   }
  }
 }
}