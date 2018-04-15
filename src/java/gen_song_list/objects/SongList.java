package gen_song_list.objects;

import java.util.ArrayList;
import java.util.List;

public class SongList {
  private List<Song> songList;

  public List<Song> getSongList() {
    return songList;
  }

  public void loadSongs() {
    songList = new ArrayList<>();

    songList.add(new Song("Ed Sheeran", "Give Me Love"));
    songList.add(new Song("Ed Sheeran", "Give Me Love"));

    updateIndexes();
  }

  private void updateIndexes() {
    int index = 0;
    for (Song oneSong : songList) {
      oneSong.setIndex(index);
      index++;
    }
  }
}
