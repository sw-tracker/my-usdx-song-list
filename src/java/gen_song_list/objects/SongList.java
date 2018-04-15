package gen_song_list.objects;

import org.apache.commons.io.filefilter.DirectoryFileFilter;
import java.io.File;
import java.io.FileFilter;
import java.util.ArrayList;
import java.util.List;

import static gen_song_list.GenerateSongList.SONGS_FOLDERS;

public class SongList {

  private List<Song> songList;

  // even though intellij thinks this is not called from anywhere
  // this function is called from the string template
  public List<Song> getSongList() {
    return songList;
  }

  public void loadSongs() {
    songList = new ArrayList<>();

    for (String dir : SONGS_FOLDERS) {
      loadSongsFronFolder(dir);
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

  private void loadSongsFronFolder(String iPath) {
    File directory = new File(iPath);
    File[] subdirs = directory.listFiles((FileFilter) DirectoryFileFilter.DIRECTORY);
    for (File dir : subdirs) {
      Song oneSong = new Song("", "");
      setSongNameAndArtistFromFolder(dir.getName(), oneSong);
      songList.add(oneSong);
    }
  }

  private void setSongNameAndArtistFromFolder(String iName, Song iSong) {
    // folder name is expected to be <artist>-<song title>
    int dashIndex = iName.indexOf("-", 0);
    iSong.setArtist(iName.substring(0, dashIndex).trim());
    iSong.setTitle(iName.substring(dashIndex + 1, iName.length()).trim());
  }
}
