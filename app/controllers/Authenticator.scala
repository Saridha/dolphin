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

  case class AuthenticatedRequest[A](
    val user: User, request: Request[A]) extends WrappedRequest(request)

  def Authenticated[A](p: BodyParser[A])(f: AuthenticatedRequest[A] => Result) = {
    Action(p) { request =>
      request.session.get("DOLPHIN_SESSION").flatMap(u => Cache.getAs[User](u)).map { user =>
        f(AuthenticatedRequest(user, request))
      }.getOrElse(Unauthorized)
    }
  }

  // Overloaded method to use the default body parser
  import play.api.mvc.BodyParsers._
  def Authenticated(f: AuthenticatedRequest[AnyContent] => Result): Action[AnyContent] = {
    Authenticated(parse.anyContent)(f)
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

  def logout = Authenticated { implicit request =>
    Ok.withNewSession.flashing("success" -> s"$request.user.id is now logged out.")
  }

  def whoami = Authenticated { implicit request =>
    Ok(Json.obj("id" -> request.user.id, "email" -> request.user.email))
  }

  def avatar = Authenticated { implicit request =>
    Async {
      WS.url("http://www.gravatar.com/avatar/" + hash(request.user.email) + "?s=32&r=pg&d=mm").withTimeout(3000).get
        .map(image => Ok(image.ahcResponse.getResponseBodyAsBytes()).as("image/jpeg"))
        .recover {
          case error => NotFound
        }
    }
  }

}