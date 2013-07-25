import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "dolphin"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    jdbc,
    anorm
  )

  val moreSettings = Seq[Setting[_]](
    scalacOptions += "-language:_",
    scalaVersion := "2.10.2"
  )


  val main = play.Project(appName, appVersion, appDependencies).settings(
    moreSettings: _*
  )

}
