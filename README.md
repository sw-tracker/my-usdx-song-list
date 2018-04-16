# my-usdx-song-list

This project allows to keep a list of the songs that you have available in your UltraStar Deluxe.
You can then share a link with your friends and they can browse your songs while other people sing.

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

