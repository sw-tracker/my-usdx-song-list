package gen_song_list.objects;

import java.io.File;

public class Song {
  private Integer index;
  private String title;
  private String artist;
  private boolean hasVideo;

  public Song(File iFile) {
    setSongNameAndArtistFromFolder(iFile.getName());
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
    return hasVideo ? "+" : "-";
  }

  private void setSongNameAndArtistFromFolder(String iName) {
    // folder name is expected to be <artist>-<song title>
    int dashIndex = iName.indexOf(" - ", 0);
    try {
      this.setArtist(convertSpecialChars(iName.substring(0, dashIndex).trim()));
      this.setTitle(convertSpecialChars(iName.substring(dashIndex + 3, iName.length()).trim()));
    } catch (Exception e) {
      System.out.println("Not able to parse folder name '<artist> - <song title>': " + iName);
      throw e;
    }
  }

  private String convertSpecialChars(String iWord) {
    String word = iWord;
    word = word.replace("~", "/"); // example AC~DC to AC/DC
    return word.trim();
  }
}
