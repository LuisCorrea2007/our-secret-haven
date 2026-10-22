package app.espacionuestro.android.data.remote

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.auth.auth
import io.github.jan.supabase.postgrest.from
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class CoupleRepository(private val client: SupabaseClient) {
    private fun uid() = client.auth.currentUserOrNull()?.id ?: error("No hay una sesión activa")
    suspend fun notes() = withContext(Dispatchers.IO) { client.from("notes").select { filter { eq("user_id", uid()) }; order("created_at", io.github.jan.supabase.postgrest.query.Order.DESCENDING) }.decodeList<CloudNote>() }
    suspend fun addNote(title:String, content:String) = withContext(Dispatchers.IO) { client.from("notes").insert(mapOf("user_id" to uid(), "title" to title, "content" to content, "category" to "general")) }
    suspend fun toggleNoteFavorite(id:String, value:Boolean) = withContext(Dispatchers.IO) { client.from("notes").update(mapOf("is_favorite" to value)) { filter { eq("id", id); eq("user_id", uid()) } } }
    suspend fun deleteNote(id:String) = withContext(Dispatchers.IO) { client.from("notes").delete { filter { eq("id", id); eq("user_id", uid()) } } }

    suspend fun wishes() = withContext(Dispatchers.IO) { client.from("wishes").select { filter { eq("user_id", uid()) }; order("priority", io.github.jan.supabase.postgrest.query.Order.DESCENDING) }.decodeList<CloudWish>() }
    suspend fun addWish(title:String, description:String?) = withContext(Dispatchers.IO) { client.from("wishes").insert(mapOf("user_id" to uid(), "title" to title, "description" to description, "category" to "general", "priority" to 0)) }
    suspend fun toggleWish(id:String, done:Boolean) = withContext(Dispatchers.IO) { client.from("wishes").update(mapOf("is_completed" to done)) { filter { eq("id", id); eq("user_id", uid()) } } }
    suspend fun deleteWish(id:String) = withContext(Dispatchers.IO) { client.from("wishes").delete { filter { eq("id", id); eq("user_id", uid()) } } }

    suspend fun events() = withContext(Dispatchers.IO) { client.from("events").select { filter { eq("user_id", uid()) }; order("date", io.github.jan.supabase.postgrest.query.Order.ASCENDING) }.decodeList<CloudEvent>() }
    suspend fun addEvent(title:String,date:String,description:String?) = withContext(Dispatchers.IO) { client.from("events").insert(mapOf("user_id" to uid(), "title" to title, "date" to date, "description" to description, "category" to "general", "countdown_enabled" to true)) }
    suspend fun deleteEvent(id:String) = withContext(Dispatchers.IO) { client.from("events").delete { filter { eq("id", id); eq("user_id", uid()) } } }

    suspend fun milestones() = withContext(Dispatchers.IO) { client.from("milestones").select { filter { eq("user_id", uid()) }; order("date", io.github.jan.supabase.postgrest.query.Order.DESCENDING) }.decodeList<CloudMilestone>() }
    suspend fun addMilestone(title:String,date:String,description:String?) = withContext(Dispatchers.IO) { client.from("milestones").insert(mapOf("user_id" to uid(), "title" to title, "date" to date, "description" to description)) }
    suspend fun deleteMilestone(id:String) = withContext(Dispatchers.IO) { client.from("milestones").delete { filter { eq("id", id); eq("user_id", uid()) } } }

    suspend fun funItems() = withContext(Dispatchers.IO) { client.from("fun_items").select { filter { eq("user_id", uid()) }; order("created_at", io.github.jan.supabase.postgrest.query.Order.DESCENDING) }.decodeList<CloudFunItem>() }
    suspend fun addFunItem(content:String,category:String="pregunta") = withContext(Dispatchers.IO) { client.from("fun_items").insert(mapOf("user_id" to uid(), "content" to content, "category" to category)) }
    suspend fun deleteFunItem(id:String) = withContext(Dispatchers.IO) { client.from("fun_items").delete { filter { eq("id", id); eq("user_id", uid()) } } }

    suspend fun videos() = withContext(Dispatchers.IO) { client.from("videos_diarios").select { filter { eq("user_id", uid()) }; order("created_at", io.github.jan.supabase.postgrest.query.Order.DESCENDING) }.decodeList<CloudVideo>() }
}
