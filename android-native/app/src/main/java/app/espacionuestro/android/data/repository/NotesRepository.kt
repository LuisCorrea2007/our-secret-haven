package app.espacionuestro.android.data.repository

import app.espacionuestro.android.data.local.NoteDao
import app.espacionuestro.android.data.local.NoteEntity
import kotlinx.coroutines.flow.Flow

class NotesRepository(private val dao: NoteDao) {
    fun observeNotes(): Flow<List<NoteEntity>> = dao.observeAll()
    suspend fun add(title: String, body: String) {
        dao.insert(NoteEntity(title = title.trim(), body = body.trim()))
    }
    suspend fun toggleFavorite(note: NoteEntity) {
        dao.update(note.copy(isFavorite = !note.isFavorite))
    }
    suspend fun delete(note: NoteEntity) = dao.delete(note)
}
