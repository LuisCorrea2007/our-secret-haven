package app.espacionuestro.android.ui
import android.content.Context
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoStories
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.json.JSONArray
import org.json.JSONObject
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Composable
fun HomeScreen(modifier: Modifier = Modifier, onOpenNotes: () -> Unit = {}, onOpenGallery: () -> Unit = {}, onOpenAgenda: () -> Unit = {}, onOpenMore: () -> Unit = {}) {
 val anniversary=LocalDate.of(2025,6,24);val days=ChronoUnit.DAYS.between(anniversary,LocalDate.now()).coerceAtLeast(0)
 Column(modifier.fillMaxSize().padding(horizontal=20.dp,vertical=18.dp),verticalArrangement=Arrangement.spacedBy(16.dp)){
  Text("ESPACIO NUESTRO",style=MaterialTheme.typography.labelLarge,color=MaterialTheme.colorScheme.primary,fontWeight=FontWeight.Bold)
  Text("Un pequeño mundo para los dos.",style=MaterialTheme.typography.headlineMedium,fontWeight=FontWeight.SemiBold)
  Text("Un lugar privado para guardar recuerdos y seguir construyendo su historia.",style=MaterialTheme.typography.bodyLarge,color=MaterialTheme.colorScheme.onSurfaceVariant)
  Card(shape=RoundedCornerShape(30.dp),colors=CardDefaults.cardColors(containerColor=MaterialTheme.colorScheme.primaryContainer),modifier=Modifier.fillMaxWidth()){
   Column(Modifier.padding(24.dp),verticalArrangement=Arrangement.spacedBy(10.dp)){
    Icon(Icons.Default.Favorite,null,tint=MaterialTheme.colorScheme.onPrimaryContainer,modifier=Modifier.size(30.dp))
    Text("Desde el 24 de junio de 2025",style=MaterialTheme.typography.titleSmall,color=MaterialTheme.colorScheme.onPrimaryContainer)
    Text("$days días",style=MaterialTheme.typography.displaySmall,fontWeight=FontWeight.Bold,color=MaterialTheme.colorScheme.onPrimaryContainer)
    Text("y un recuerdo más por crear",style=MaterialTheme.typography.bodyLarge,color=MaterialTheme.colorScheme.onPrimaryContainer)
   }
  }
  Text("Su espacio compartido",style=MaterialTheme.typography.titleLarge,fontWeight=FontWeight.SemiBold)
  Row(horizontalArrangement=Arrangement.spacedBy(10.dp),modifier=Modifier.fillMaxWidth()){
   QuickFeature("Notas","Escribir",Icons.Default.AutoStories,Modifier.weight(1f),onOpenNotes)
   QuickFeature("Galería","Recuerdos",Icons.Default.Favorite,Modifier.weight(1f),onOpenGallery)
  }
  Row(horizontalArrangement=Arrangement.spacedBy(10.dp),modifier=Modifier.fillMaxWidth()){
   QuickFeature("Agenda","Hacer planes",Icons.Default.Lightbulb,Modifier.weight(1f),onOpenAgenda)
   QuickFeature("Nuestro mundo","Más cosas",Icons.Default.Lock,Modifier.weight(1f),onOpenMore)
  }
  Card(shape=RoundedCornerShape(20.dp),colors=CardDefaults.cardColors(containerColor=MaterialTheme.colorScheme.surfaceVariant)){
   Row(Modifier.padding(16.dp),horizontalArrangement=Arrangement.spacedBy(12.dp),verticalAlignment=Alignment.CenterVertically){
    Icon(Icons.Default.Lock,null,tint=MaterialTheme.colorScheme.primary)
    Column { Text("Privacidad primero",fontWeight=FontWeight.SemiBold);Text("Notas y planes se guardan en este dispositivo. La sincronización compartida se habilitará cuando esté protegida.",style=MaterialTheme.typography.bodySmall,color=MaterialTheme.colorScheme.onSurfaceVariant) }
   }
  }
 }
}
@Composable private fun QuickFeature(title:String,subtitle:String,icon:androidx.compose.ui.graphics.vector.ImageVector,modifier:Modifier,onClick:()->Unit){
 Card(onClick=onClick,modifier=modifier.height(118.dp),shape=RoundedCornerShape(22.dp),colors=CardDefaults.cardColors(containerColor=MaterialTheme.colorScheme.surface)){
  Column(Modifier.fillMaxSize().padding(15.dp),verticalArrangement=Arrangement.SpaceBetween){
   Icon(icon,null,tint=MaterialTheme.colorScheme.primary,modifier=Modifier.size(25.dp))
   Column { Text(title,style=MaterialTheme.typography.titleSmall,fontWeight=FontWeight.SemiBold);Text(subtitle,style=MaterialTheme.typography.bodySmall,color=MaterialTheme.colorScheme.onSurfaceVariant) }
  }
 }
}
