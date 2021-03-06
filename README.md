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
- Handlebars v4.0.0 - http://handlebarsjs.com/
- Handlebars-intl v1.1.2 - https://formatjs.io/handlebars/
- FontAwesome v5.0.8 - https://fontawesome.com
- jQuery v3.3.1 - https://jquery.com/
- Popper.js v1.14.1 (bootstrap drop-downs need this) - https://popper.js.org/
- jQuery Searchable Plugin v1.1.1 - https://github.com/stidges/jquery-searchable

## For Developers

This command should install all you need:

```
cd src/web/
npm install
```

This is what I installed when developing this project:

```
cd src/web/
npm install -g gulp-cli@2.0.1
npm install --save-dev gulp@3.9.1
npm install --save-dev browser-sync@2.23.6
npm install --save-dev del@3.0.0
npm install --save-dev gulp-uglify@3.0.0 gulp-usemin@0.3.29 gulp-rev@8.1.1 gulp-clean-css@3.9.3 gulp-flatmap@1.0.2 gulp-htmlmin@4.0.0
npm install --save handlebars@^4.0.0
npm install --save-dev gulp-handlebars gulp-wrap gulp-declare gulp-concat
npm install --save-dev gulp-util vinyl-ftp
npm install --save-dev gulp-prompt
npm install --save-dev run-sequence
```

To build the project run:

```
cd src/web/
gulp build
```

To run the server and view the website run:

```
cd src/web/
gulp
```

### Handlebars

- To have a template file compiled as a template, the file must be named `*template*.hbs`.
- To have a template file compiled as a partial, the file must be named `*partial*.hbs`.
- To reuse a template as a partial, the file name must have both words in it.

### FTP Deploy

To deploy the files to a server, run the following command.
It will prompt you for the host, username and password. I recommend using KeyPass to automatically fill in these fields.
The command window will be renamed to `gulp ftp-deploy <pwd>`, you can use this in KeyPass.

Also, make sure that the username you use has only access to the direct folder where you want these files,
because this command will delete everything under `./` from this user.

```
cd src/web/
gulp ftp-deploy
```
