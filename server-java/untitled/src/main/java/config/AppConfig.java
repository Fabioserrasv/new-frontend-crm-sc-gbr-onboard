package config;
import io.github.cdimascio.dotenv.Dotenv;

public class AppConfig {
  private static final Dotenv dotenv = Dotenv.load();

  public static String getJwtSecret() {
    return dotenv.get("JWT_SECRET");
  }
}
