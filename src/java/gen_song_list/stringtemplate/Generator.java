package gen_song_list.stringtemplate;

import gen_song_list.objects.SongList;

import org.stringtemplate.v4.ST;
import org.stringtemplate.v4.STGroup;
import org.stringtemplate.v4.STGroupFile;
import org.stringtemplate.v4.StringRenderer;

import java.util.Date;

public class Generator {

  public static String generateSongListJs(SongList iSongList) {
    STGroup group = new STGroupFile("java/gen_song_list/stringtemplate/SongListJavascript.stg", '<', '>');

    ST template = group.getInstanceOf("SongListJavascript");
    group.registerRenderer(String.class, new StringRenderer());

    if (template != null) {

      template.add("iDate", new Date());
      template.add("iSongList", iSongList);

      String result = template.render();

      return result;
    } else {
      System.out.println("template is null");
      return null;
    }
  }
}
