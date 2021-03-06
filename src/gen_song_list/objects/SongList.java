package gen_song_list.objects;

import gen_song_list.GenerateSongList;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import java.io.File;
import java.io.FileFilter;
import java.util.ArrayList;
import java.util.List;

public class SongList {

  private List<Song> songList;

  // even though intellij thinks this is not called from anywhere
  // this function is called from the string template
  public List<Song> getSongList() {
    return songList;
  }

  public void loadSongs() {
    songList = new ArrayList<>();

    for (String dir : GenerateSongList.SONGS_FOLDERS) {
      loadSongsFromFolder(dir);
    }

    updateIndexes();
  }

  private void updateIndexes() {
    int index = 0;
    for (Song oneSong : songList) {
      oneSong.setIndex(index);
      index++;
    }
  }

  private void loadSongsFromFolder(String iPath) {
    File directory = new File(iPath);
    File[] subdirs = directory.listFiles((FileFilter) DirectoryFileFilter.DIRECTORY);
    for (File dir : subdirs) {
      songList.add(new Song(dir));
    }
  }
}
