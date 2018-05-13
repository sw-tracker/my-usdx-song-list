
let SongObject = function(artist, title, createdOn, hasVideo, hasMp3) {
  this.title = title;
  this.artist = artist;
  this.createdOn = new Date(createdOn);
  this.hasVideo = hasVideo;
  this.hasMp3 = hasMp3;
  this.hasCover = false;
  this.hasBackground = false;
};

SongObject.prototype.clone = function() {
  return new SongObject(this.artist, this.title, this.createdOn, this.hasVideo, this.hasMp3);
};
