# my-usdx-song-list

This project allows to keep a list of the songs that you have available in your UltraStar Deluxe.
You can then share a link with your friends and they can browse your songs while other people sing.

## Update/Generate Song List

This website works by generating a JavaScript file that contains an array of songs.
These songs are found on your computer. This file is located in `my-usdx-song-list\src\web\resources\song_data.js`.

To generate this file follow these steps:

1. Modify the folder paths in GenerateSongList to point to where you have your UltraStar songs.
2. Open a command line prompt and go to the parent folder of this project `cd my-usdx-song-list`.
3. Now run gradle to generate/update the song list file: `gradlew clean genSongList`.

## Formatting

For this software to parse your folders and files correctly, the following formatting/naming conventions must be met:

### Folder Name

* Expected name: `<artist> - <song title>`. Example: `Beyonce - Crazy In Love` -> artist:`Beyonce` & song title:`Crazy In Love`.
* The `<space>-<space>` is very important. Example: `Beyonce - Crazy In Love`.
* Dashes `-` can be in the artist or song title name but there can not be any spaces around the dash.
Example: `A-ha - Take On Me`.
* Character mapping:
  - `~` -> `/`. Example: `AC~DC - Highway To Hell` -> `AC/DC - Highway To Hell`

## UltraStar Links

- https://ultrastar-es.org/en
- http://usdb.animux.de/

## Technology

- Bootstrap v4.0.0 - https://getbootstrap.com
- Bootstrap Themes from https://bootswatch.com/
- Handlebars v3.0.3 - http://handlebarsjs.com/
- Handlebars-intl v1.1.2 - https://formatjs.io/handlebars/
- FontAwesome v5.0.8 - https://fontawesome.com
- jQuery v3.3.1 - https://jquery.com/
- Popper.js v1.14.1 (bootstrap drop-downs need this) - https://popper.js.org/
- jQuery Searchable Plugin v1.1.0 - https://github.com/stidges/jquery-searchable
