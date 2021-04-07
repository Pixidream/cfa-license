package com.studiopixidream.appmusic;

import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.switchmaterial.SwitchMaterial;

import java.io.IOException;

public class MusicActivity extends AppCompatActivity implements View.OnClickListener {

    TextView textViewTitle, textViewArtiste, textViewAlbum;
    ImageView imageViewAlbum;
    Button buttonListen, buttonLink;
    Music currentMusic;
    MediaPlayer player = new MediaPlayer();
    SwitchMaterial switchFav;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music);

        textViewTitle = findViewById(R.id.textViewMusicDetailsTitle);
        textViewArtiste = findViewById(R.id.textViewMusicDetailsArtisteContent);
        textViewAlbum = findViewById(R.id.textViewMusicDetailsAlbumContent);
        imageViewAlbum = findViewById(R.id.imageViewMusicDetailPicture);
        buttonLink = findViewById(R.id.buttonMusicDetailDeezer);
        buttonListen = findViewById(R.id.buttonMusicDetailListen);
        buttonListen.setOnClickListener(this);
        buttonLink.setOnClickListener(this);
        switchFav = findViewById(R.id.switchMusicDetailsFavoris);
        switchFav.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (!isChecked) FavoriteRepository.getInstance(getApplicationContext()).add(currentMusic);
                else FavoriteRepository.getInstance(getApplicationContext()).remove(currentMusic);
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        currentMusic = (Music) getIntent().getSerializableExtra("music");
        if (currentMusic != null) {
            textViewTitle.setText(currentMusic.getTitle());
            textViewAlbum.setText(currentMusic.getAlbum());
            textViewArtiste.setText(currentMusic.getArtiste());
            ServiceApi.loadImage(this, currentMusic.getImage(), imageViewAlbum);
            this.setTitle("Sonata - Details: " + currentMusic.getTitle());
            if (FavoriteRepository.getInstance(getApplicationContext()).isFavorite(currentMusic)) switchFav.setChecked(false);
            else switchFav.setChecked(true);
        }
    }

    @Override
    public void onClick(View v) {
        if (v.equals(buttonLink)) {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(currentMusic.getLink()));
            startActivity(intent);
        } else {
            if (!player.isPlaying()) {
                buttonListen.setText("Pause");
                try {
                    player.reset();
                    player.setDataSource(this, Uri.parse(currentMusic.getPreview()));
                    player.prepare();
                    player.start();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                buttonListen.setText("Play");
                player.stop();
            }
        }
    }
}
