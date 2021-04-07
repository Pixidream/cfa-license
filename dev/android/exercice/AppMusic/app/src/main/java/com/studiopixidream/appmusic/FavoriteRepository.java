package com.studiopixidream.appmusic;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;

import java.util.ArrayList;

public class FavoriteRepository implements IFavoriteRepository {

    private DatabaseManager dbm;
    private static FavoriteRepository instance;

    private FavoriteRepository (Context ctx) {
        this.dbm = DatabaseManager.getInstance(ctx);
    }

    public static FavoriteRepository getInstance(Context ctx) {
        if (instance == null) {
            instance = new FavoriteRepository(ctx);
        }
        return instance;
    }

    @Override
    public boolean add(Music m) {
        if (isFavorite(m)) return false;
        ContentValues values = new ContentValues();
        values.put("id", m.getId());
        values.put("title", m.getTitle());
        values.put("artist", m.getArtiste());
        values.put("album", m.getAlbum());
        values.put("sampleUrl", m.getPreview());
        values.put("link", m.getLink());
        values.put("coverUrl", m.getImage());
        long line = dbm.getWritableDatabase().insert("favorite", null, values);
        return line != 0;
    }

    @Override
    public boolean remove(Music m) {
        String[] identifier = { String.valueOf(m.getId()) };
        long line = dbm.getWritableDatabase().delete("favorite", "id=?", identifier);
        return line != 0;
    }

    @Override
    public boolean isFavorite(Music m) {
        String[] identifier = { String.valueOf(m.getId()) };
        Cursor c= dbm.getReadableDatabase().rawQuery("select * from favorite where id=?", identifier);
        return c.getCount() > 0;
    }

    @Override
    public ArrayList<Music> getAll() {
        Cursor c = dbm.getReadableDatabase().rawQuery("select * from favorite", null);
        ArrayList<Music> musics = new ArrayList<Music>();
        if (c.moveToFirst()) {
            c.moveToFirst();
            while (!c.isAfterLast()) {
                Music music = new Music();
                music.setId(c.getInt(c.getColumnIndex("id")));
                music.setTitle(c.getString(c.getColumnIndex("title")));
                music.setArtiste(c.getString(c.getColumnIndex("artist")));
                music.setAlbum(c.getString(c.getColumnIndex("album")));
                music.setPreview(c.getString(c.getColumnIndex("sampleUrl")));
                music.setLink(c.getString(c.getColumnIndex("link")));
                music.setImage(c.getString(c.getColumnIndex("coverUrl")));
                musics.add(music);
                c.moveToNext();
            }
        }
        return musics;
    }
}
