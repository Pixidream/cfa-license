package com.studiopixidream.appmusic;

import java.util.ArrayList;

public interface IFavoriteRepository {

    public boolean add(Music m);
    public boolean remove(Music m);
    public boolean isFavorite(Music m);
    public ArrayList<Music> getAll();
}
