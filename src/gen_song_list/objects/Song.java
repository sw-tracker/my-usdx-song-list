package gen_song_list.objects;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Song {
  private File file;
  private Integer index;
  private String title;
  private String artist;
  private Date createdOn;
  private boolean hasVideo;
  private boolean hasMp3;

  public Song(File iFile) {
    this.file = iFile;
    setSongNameAndArtistFromFolder();
    setHasVideo();
    setHasMp3();
    setDateCreatedOn();
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getArtist() {
    return artist;
  }

  public void setArtist(String artist) {
    this.artist = artist;
  }

  public void setIndex(Integer index) {
    this.index = index;
  }

  public boolean isFirst() {
    return index == 0;
  }

  public String getVideo() {
    return hasVideo ? "true" : "false";
  }

  public String getMp3() {
    return hasMp3 ? "true" : "false";
  }

  public String getCreatedOn() {
    return new SimpleDateFormat("yyyy-MM-dd").format(createdOn);
  }

  private void setSongNameAndArtistFromFolder() {
    // folder name is expected to be <artist>-<song title>
    String folderName = file.getName();
    int dashIndex = folderName.indexOf(" - ", 0);
    try {
      this.setArtist(convertSpecialChars(folderName.substring(0, dashIndex).trim()));
      this.setTitle(convertSpecialChars(folderName.substring(dashIndex + 3, folderName.length()).trim()));
    } catch (Exception e) {
      System.out.println("Not able to parse folder name '<artist> - <song title>': " + folderName);
      throw e;
    }
  }

  private String convertSpecialChars(String iWord) {
    String word = iWord;
    word = word.replace("~", "/"); // example AC~DC to AC/DC
    return word.trim();
  }

  private void setHasVideo() {
    File[] listOfFiles = file.listFiles(new FilenameFilter() {
      @Override
      public boolean accept(File dir, String name) {
        return name.toLowerCase().endsWith(".avi") || name.toLowerCase().endsWith(".mp4");
      }
    });

    this.hasVideo = false;
    if (listOfFiles.length > 0) {
      this.hasVideo = true;
    }
  }

  private void setHasMp3() {
    File[] listOfFiles = file.listFiles(new FilenameFilter() {
      @Override
      public boolean accept(File dir, String name) {
        return name.toLowerCase().endsWith(".mp3");
      }
    });

    this.hasMp3 = false;
    if (listOfFiles.length > 0) {
      this.hasMp3 = true;
    }
  }

  private void setDateCreatedOn() {
    try {
      Path filePath = Paths.get(file.getAbsolutePath());
      BasicFileAttributes attr = Files.readAttributes(filePath, BasicFileAttributes.class);
      FileTime fileTime = attr.creationTime();
      SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
      this.createdOn = new Date(df.format(fileTime.toMillis()));
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
