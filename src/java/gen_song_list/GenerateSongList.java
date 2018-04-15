package gen_song_list;

import gen_song_list.objects.SongList;
import gen_song_list.stringtemplate.Generator;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class GenerateSongList {

  private static String JS_OUTPUT_PATH = "src/web/resources/song_data.js";

  public static void main(String[] args) {
    System.out.println("gen_song_list.GenerateSongList Start");
    SongList allSongs = new SongList();
    allSongs.loadSongs();
    String songsJs = Generator.generateSongListJs(allSongs);
    writeFile(JS_OUTPUT_PATH, songsJs);
    System.out.println("gen_song_list.GenerateSongList Finished");
  }

  private static void writeFile(String targetPath, String fileContents) {
    // try with resources, no manual call to close() on writer necessary
    Path constFacadeFileCust = Paths.get(targetPath);
    try (BufferedWriter writer = Files.newBufferedWriter(constFacadeFileCust, StandardCharsets.UTF_8)) {
      writer.write(fileContents);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
