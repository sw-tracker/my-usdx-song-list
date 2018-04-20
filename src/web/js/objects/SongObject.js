
let SongObject = function(artist, title, createdOn, hasVideo, hasMp3) {
  this.title = title;
  this.artist = artist;
  this.createdOn = new Date(createdOn);
  this.hasVideo = hasVideo;
  this.hasMp3 = hasMp3;
  this.hasCover = false;
  this.hasBackground = false;
};
