package controllers

import play.api.Play.current
import play.api._
import play.api.mvc._
import play.api.libs.ws.WS
import java.io.File
import play.api.cache.Cache
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json
import play.api.libs.json._

object Authenticator extends Controller {

  case class User(id: String, email: String)

  private[this] def hash(str: String): String = {
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
    val md = MessageDigest.getInstance("MD5")
    hex(md.digest(str.getBytes("CP1252")))
  }

  def login = Action(parse.json) { implicit request =>
    val id = (request.body \ "id").asOpt[String]
    val email = (request.body \ "email").asOpt[String]
    (id, email) match {
      case (Some(id), Some(email)) => {
        val key = hash(id)
        val user = User(id, email)
        Cache.set(key, user)
        Ok(Json.obj("id" -> user.id, "email" -> user.email)).withSession("DOLPHIN_SESSION" -> key)
      }
      case _ => BadRequest("Login failed. A valid username and email is required.")
    }
  }

  def logout = Action { implicit request =>
    session.get("DOLPHIN_SESSION").map { key =>
      Cache.getAs[User](key) match {
        case (Some(user)) => Ok.withNewSession.flashing("success" -> s"$user.id is now logged out.")
        case _ => Unauthorized
      }
    }.getOrElse {
      Unauthorized
    }
  }

  def whoami = Action { implicit request =>
    session.get("DOLPHIN_SESSION").map { key =>
      Cache.getAs[User](key) match {
        case (Some(user)) => Ok(Json.obj("id" -> user.id, "email" -> user.email))
        case None => Unauthorized
      }
    }.getOrElse {
      Unauthorized
    }
  }

  def gravatar = Action { implicit request =>
    val genericImage = Ok.sendFile(content = new File("public/app/img/generic_user.png"), inline = true).as("image/png")
    session.get("DOLPHIN_SESSION").map { key =>
      Cache.getAs[User](key) match {
        case (Some(user)) => {
          Async {
            WS.url("http://www.gravatar.com/avatar/" + hash(user.email) + "?s=32&r=pg&d=mm").withTimeout(5000).get
              .map(image => Ok(image.ahcResponse.getResponseBodyAsBytes()).as("image/jpeg"))
              .recover {
                case error => genericImage
              }
          }
        }
        case _ => genericImage
      }
    }.getOrElse {
      genericImage
    }
  }

}