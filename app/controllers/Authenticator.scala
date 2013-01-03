package controllers

import play.api.Play.current

import play.api._
import play.api.mvc._
import java.io.File
import play.api.cache.Cache

object Authenticator extends Controller {

  case class User(id: String, email: String)

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

    val id = (request.body \ "id").asOpt[String]
    val email = (request.body \ "email").asOpt[String]
    (id, email) match {
      case (Some(id), Some(email)) => {
        val key = sha1(id)
        val user = User(id, email)
        Cache.set(key, user)
        Ok(s"Login for $id successful").withSession("DOLPHIN_SESSION" -> key)
      }
      case _ => BadRequest("Login failed. A valid username and email is required.")
    }
  }

  def gravatar = Action { implicit request =>
    val genericImage = Ok.sendFile(content = new File("public/app/img/generic_user.png"), inline = true).as("image/png")
    session.get("DOLPHIN_SESSION").map { key =>
      Cache.get(key) match {
        case (Some(user)) => {
          println(s"Hi $user, I see you're already successfully authenticated.")
          genericImage
        }
        case _ => genericImage
      }
    }.getOrElse {
      genericImage
    }
  }

}