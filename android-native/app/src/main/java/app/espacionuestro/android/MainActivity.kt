package app.espacionuestro.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import app.espacionuestro.android.ui.EspacioNuestroApp
import app.espacionuestro.android.ui.theme.EspacioNuestroTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            EspacioNuestroTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    EspacioNuestroApp()
                }
            }
        }
    }
}
