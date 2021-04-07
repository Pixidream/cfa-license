package com.studiopixidream.appmusic;

import java.io.Serializable;

public class Music implements Serializable {
    private int id;
    private String title, artiste, album, image, link, preview;

    public Music () {}

    public Music(int id, String title, String artiste, String album, String image, String link, String preview) {
        this.id = id;
        this.title = title;
        this.artiste = artiste;
        this.album = album;
        this.image = image;
        this.link = link;
        this.preview = preview;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtiste() {
        return artiste;
    }

    public void setArtiste(String artiste) {
        this.artiste = artiste;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }
}
