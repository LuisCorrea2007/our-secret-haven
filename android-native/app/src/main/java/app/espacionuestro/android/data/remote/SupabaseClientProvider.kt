package app.espacionuestro.android.data.remote

import app.espacionuestro.android.BuildConfig
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.auth.Auth
import io.github.jan.supabase.createSupabaseClient

/**
 * Uses only the project's public Supabase URL and publishable key.
 * Never place service-role keys or private server secrets in an Android app.
 */
object SupabaseClientProvider {
    val isConfigured: Boolean
        get() = BuildConfig.SUPABASE_URL.isNotBlank() &&
            BuildConfig.SUPABASE_PUBLISHABLE_KEY.isNotBlank()

    val client: SupabaseClient? by lazy {
        if (!isConfigured) {
            null
        } else {
            createSupabaseClient(
                supabaseUrl = BuildConfig.SUPABASE_URL,
                supabaseKey = BuildConfig.SUPABASE_PUBLISHABLE_KEY
            ) {
                install(Auth)
            }
        }
    }
}
