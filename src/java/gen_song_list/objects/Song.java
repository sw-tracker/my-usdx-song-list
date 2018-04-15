package gen_song_list.objects;

public class Song {
  private Integer index;
  private String title;
  private String artist;

  public Song(String iArtist, String iTitle) {
    this.artist = iArtist;
    this.title = iTitle;
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
}
