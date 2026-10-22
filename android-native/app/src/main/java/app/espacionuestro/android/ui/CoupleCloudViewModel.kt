package app.espacionuestro.android.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import app.espacionuestro.android.data.remote.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class CoupleCloudViewModel(app: Application) : AndroidViewModel(app) {
    private val client = SupabaseClientProvider.client
    private val repo = client?.let { CoupleRepository(it) }
    private val _notes = MutableStateFlow<List<CloudNote>>(emptyList()); val notes: StateFlow<List<CloudNote>> = _notes.asStateFlow()
    private val _wishes = MutableStateFlow<List<CloudWish>>(emptyList()); val wishes:StateFlow<List<CloudWish>> =_wishes.asStateFlow()
    private val _events = MutableStateFlow<List<CloudEvent>>(emptyList()); val events:StateFlow<List<CloudEvent>> =_events.asStateFlow()
    private val _milestones = MutableStateFlow<List<CloudMilestone>>(emptyList()); val milestones:StateFlow<List<CloudMilestone>> =_milestones.asStateFlow()
    private val _fun = MutableStateFlow<List<CloudFunItem>>(emptyList()); val funItems:StateFlow<List<CloudFunItem>> =_fun.asStateFlow()
    private val _videos = MutableStateFlow<List<CloudVideo>>(emptyList()); val videos:StateFlow<List<CloudVideo>> =_videos.asStateFlow()
    private val _error = MutableStateFlow<String?>(null); val error:StateFlow<String?> =_error.asStateFlow()

    init { refresh() }
    fun refresh() { viewModelScope.launch {
        if (repo == null) { _error.value = "Configura Supabase para sincronizar tus recuerdos."; return@launch }
        _error.value = null
        runCatching { repo.notes() }.onSuccess { _notes.value=it }.onFailure { _error.value=it.message ?: "No se pudieron cargar las notas." }
        runCatching { repo.wishes() }.onSuccess { _wishes.value=it }.onFailure { if (_error.value == null) _error.value=it.message }
        runCatching { repo.events() }.onSuccess { _events.value=it }
        runCatching { repo.milestones() }.onSuccess { _milestones.value=it }
        runCatching { repo.funItems() }.onSuccess { _fun.value=it }
        runCatching { repo.videos() }.onSuccess { _videos.value=it }
    } }
    fun addNote(title:String, content:String)=viewModelScope.launch { runCatching { repo?.addNote(title, content) }.onFailure { _error.value=it.message }; refresh() }
    fun toggleNoteFavorite(id:String,value:Boolean)=viewModelScope.launch { runCatching { repo?.toggleNoteFavorite(id,value) }.onFailure { _error.value=it.message }; refresh() }
    fun deleteNote(id:String)=viewModelScope.launch { runCatching { repo?.deleteNote(id) }.onFailure { _error.value=it.message }; refresh() }
    fun addWish(title:String,description:String?)=viewModelScope.launch{runCatching { repo?.addWish(title,description) }.onFailure { _error.value=it.message };refresh()}
    fun toggleWish(id:String,done:Boolean)=viewModelScope.launch{runCatching { repo?.toggleWish(id,done) }.onFailure { _error.value=it.message };refresh()}
    fun deleteWish(id:String)=viewModelScope.launch{runCatching { repo?.deleteWish(id) }.onFailure { _error.value=it.message };refresh()}
    fun addEvent(title:String,date:String,description:String?)=viewModelScope.launch{runCatching { repo?.addEvent(title,date,description) }.onFailure { _error.value=it.message };refresh()}
    fun deleteEvent(id:String)=viewModelScope.launch{runCatching { repo?.deleteEvent(id) }.onFailure { _error.value=it.message };refresh()}
    fun addMilestone(title:String,date:String,description:String?)=viewModelScope.launch{runCatching { repo?.addMilestone(title,date,description) }.onFailure { _error.value=it.message };refresh()}
    fun deleteMilestone(id:String)=viewModelScope.launch{runCatching { repo?.deleteMilestone(id) }.onFailure { _error.value=it.message };refresh()}
    fun addFun(content:String)=viewModelScope.launch{runCatching { repo?.addFunItem(content) }.onFailure { _error.value=it.message };refresh()}
    fun deleteFun(id:String)=viewModelScope.launch{runCatching { repo?.deleteFunItem(id) }.onFailure { _error.value=it.message };refresh()}
}
