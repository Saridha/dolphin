package controllers

import play.api._
import play.api.mvc._
import java.io.File

object Authenticator extends Controller {

  case class User(id: String, email: String)

  private[this] var sessions = Map.empty[String, User]

  def login = Action(parse.json) { implicit request =>
    def sha1(str: String): String = {
      def hex(array: Array[Byte]): String = {
        val sb = new StringBuffer();
        for (i <- 0 to array.length - 1) {
          sb.append(Integer.toHexString((array(i) & 0xFF) | 0x100).substring(1, 3));
        }
        sb.toString();
      }
      import java.util._
      import java.io._
      import java.security._
      val md = MessageDigest.getInstance("SHA1")
      hex(md.digest(str.getBytes("CP1252")))
    }

    val id = (request.body \ "id").asOpt[String].get
    val email = (request.body \ "email").asOpt[String].get
    val key = sha1(email)
    sessions = sessions + (key -> User(id, email))
    Ok(s"Login for $id successful").withSession(session + ("DOLPHIN_SESSION" -> key))
  }


}