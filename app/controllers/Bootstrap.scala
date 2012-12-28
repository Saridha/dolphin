package controllers

import play.api._
import play.api.mvc._
import java.io.File

object Bootstrap extends Controller {

  def index = Action { request =>
    Ok.sendFile(content = new File("public/app/index.html"), inline = true).as("text/html")
  }

}