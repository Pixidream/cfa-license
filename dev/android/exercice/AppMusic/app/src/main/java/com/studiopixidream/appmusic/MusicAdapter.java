package com.studiopixidream.appmusic;

import android.app.Activity;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class MusicAdapter extends BaseAdapter {

    private Activity activity;
    private ArrayList<Music> musics;

    public MusicAdapter(Activity activity, ArrayList<Music> musics) {
        this.activity = activity;
        this.musics = musics;
    }

    @Override
    public int getCount() {
        return musics.size();
    }

    @Override
    public Object getItem(int position) {
        return musics.get(position);
    }

    @Override
    public long getItemId(int position) {
        return musics.get(position).getId();
    }

    @Override
    public View getView(int position, View converView, ViewGroup parent) {
        if (converView == null) {
            converView = LayoutInflater.from(activity).inflate(R.layout.item_music, parent, false);
        }
        TextView textViewArtist = converView.findViewById(R.id.textViewItemArtiste);
        textViewArtist.setText(musics.get(position).getArtiste());
        TextView textViewTitle = converView.findViewById(R.id.textViewItemTitle);
        textViewTitle.setText(musics.get(position).getTitle());
        ImageView imageView = converView.findViewById(R.id.imageViewItemPicture);
        ServiceApi.loadImage(activity, musics.get(position).getImage(), imageView);
        ImageView favImage = converView.findViewById(R.id.imageViewItemIsFav);
        if (FavoriteRepository.getInstance(activity).isFavorite(musics.get(position))) favImage.setImageResource(R.drawable.ic_star);
        else favImage.setImageResource(R.drawable.ic_star_outline);

        return converView;
    }
}
