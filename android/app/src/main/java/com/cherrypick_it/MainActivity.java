package com.cherrypick_it;
import android.os.Build;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.app.NotificationChannel;
import android.app.NotificationManager;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel notificationChannel = new NotificationChannel("500", "MainChannel", NotificationManager.IMPORTANCE_HIGH);
      notificationChannel.setShowBadge(true);
      notificationChannel.setDescription("Test Notifications");
      notificationChannel.enableVibration(true);
      notificationChannel.enableLights(true);
      notificationChannel.setVibrationPattern(new long[]{400, 200, 400});
      //notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(notificationChannel);
    }
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "cherrypick_it";
  }
}
