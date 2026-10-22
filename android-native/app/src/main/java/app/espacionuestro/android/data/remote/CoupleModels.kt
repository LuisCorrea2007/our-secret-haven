package app.espacionuestro.android.data.remote

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable data class CloudNote(val id:String, val user_id:String, val title:String, val content:String, val category:String="general", val is_favorite:Boolean=false, val is_archived:Boolean=false, val scheduled_date:String?=null, val created_at:String="", val updated_at:String="")
@Serializable data class CloudWish(val id:String, val user_id:String, val title:String, val description:String?=null, val category:String="general", val is_completed:Boolean=false, val budget:Double?=null, val deadline:String?=null, val link:String?=null, val priority:Int=0, val created_at:String="", val updated_at:String="")
@Serializable data class CloudEvent(val id:String, val user_id:String, val title:String, val description:String?=null, val date:String, val time:String?=null, val location:String?=null, val category:String="general", val countdown_enabled:Boolean=true, val is_recurring:Boolean=false, val recurrence_rule:String?=null, val reminder_minutes:Int?=null, val created_at:String="", val updated_at:String="")
@Serializable data class CloudMilestone(val id:String, val user_id:String, val title:String, val description:String?=null, val date:String, val photo_id:String?=null, val created_at:String="", val updated_at:String="")
@Serializable data class CloudFunItem(val id:String, val user_id:String, val content:String, val category:String="pregunta", val answer:String?=null, val options:List<String>?=null, val created_at:String="", val updated_at:String="")
@Serializable data class CloudVideo(val id:String, val user_id:String, val titulo:String, val descripcion:String?=null, val file_path:String, val file_size:Long?=null, val file_type:String?=null, val created_at:String="", val updated_at:String="")
@Serializable data class CloudPhoto(val id:String, val user_id:String, val file_path:String, val caption:String?=null, val is_favorite:Boolean=false, val album_id:String?=null, val file_size:Long?=null, val width:Int?=null, val height:Int?=null, val tags:List<String> = emptyList(), val taken_at:String?=null, val created_at:String="")
@Serializable data class CloudProfile(val id:String, val email:String?=null, val name:String="", val avatar_url:String?=null, val anniversary_date:String?=null, val location:String?=null, val latitude:Double?=null, val longitude:Double?=null, val created_at:String="", val updated_at:String="")
