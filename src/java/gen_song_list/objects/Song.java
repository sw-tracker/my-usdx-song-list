package gen_song_list.objects;

import java.io.File;

public class Song {
  private Integer index;
  private String title;
  private String artist;
  private boolean hasVideo;

  public Song(File iFile) {
    System.out.println(iFile.getAbsolutePath());
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
    int dashIndex = iName.indexOf("-", 0);
    this.setArtist(iName.substring(0, dashIndex).trim());
    this.setTitle(iName.substring(dashIndex + 1, iName.length()).trim());
  }
}
