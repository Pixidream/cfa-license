package com.studiopixidream.appmusic;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseManager extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "musicapp.sqlite";
    private static final int CURRENT_DB_VERSION = 1;

    private static DatabaseManager instance;

    public static DatabaseManager getInstance(Context ctx) {
        if (instance == null) {
            instance = new DatabaseManager(ctx);
        }
        return instance;
    }

    private DatabaseManager(Context ctx) {
        super(ctx, DATABASE_NAME, null, CURRENT_DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("create table favorite "+
                "(id INTEGER, title TEXT, artist TEXT, album TEXT, isFavorite INTEGER, "+
                "sampleUrl TEXT, link TEXT, coverUrl TEXT);");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {}
}
