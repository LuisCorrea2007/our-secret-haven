package app.espacionuestro.android.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import app.espacionuestro.android.data.local.AppDatabase
import app.espacionuestro.android.data.local.NoteEntity
import app.espacionuestro.android.data.repository.NotesRepository
import app.espacionuestro.android.data.remote.CoupleRepository
import app.espacionuestro.android.data.remote.SupabaseClientProvider
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class NotesViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = NotesRepository(AppDatabase.get(application).noteDao())
    private val cloud = SupabaseClientProvider.client?.let { CoupleRepository(it) }

    val notes = repository.observeNotes().stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = emptyList()
    )

    fun add(title: String, body: String, onComplete: () -> Unit = {}) {
        if (title.isBlank() || body.isBlank()) return
        viewModelScope.launch {
            repository.add(title, body)
            runCatching { cloud?.addNote(title, body) }
            onComplete()
        }
    }

    fun toggleFavorite(note: NoteEntity) {
        viewModelScope.launch {
            repository.toggleFavorite(note)
            runCatching { cloud?.toggleNoteFavorite(note.id.toString(), !note.isFavorite) }
        }
    }

    fun delete(note: NoteEntity) {
        viewModelScope.launch { repository.delete(note) }
    }
}
