package com.studiopixidream.appmusic;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.Layout;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener, IListenerAPI, View.OnClickListener {

    private ListView listViewMusics;
    EditText editTextSearch;
    ImageButton buttonSearch;
    private ArrayList<Music> musics = new ArrayList<Music>();
    private ArrayList<Music> favMusic = new ArrayList<Music>();
    ProgressBar loader;
    View emptyLayout;
    MusicAdapter musicAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setTitle("Sonata - Favoris");

        favMusic = FavoriteRepository.getInstance(getApplicationContext()).getAll();
        listViewMusics = findViewById(R.id.listViewMusic);
        editTextSearch = findViewById(R.id.editTextSearch);
        editTextSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                searchOnTheFly(s.toString());
                handleSetTitle();
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });
        editTextSearch.setOnEditorActionListener(new EditText.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    buttonSearch.performClick();
                    return true;
                }
                return false;
            }
        });
        handleAdapterChange();
        listViewMusics.setAdapter(musicAdapter);
        listViewMusics.setOnItemClickListener(this);
        buttonSearch = findViewById(R.id.imageButtonSearch);
        buttonSearch.setOnClickListener(this);
        loader = findViewById(R.id.progressBarLoader);
        loader.setVisibility(View.GONE);
        emptyLayout = findViewById(R.id.EmptyLayout);
        emptyLayout.setVisibility(View.GONE);
        handleChangeView();
    }

    @Override
    protected void onResume () {
        super.onResume();
        favMusic = FavoriteRepository.getInstance(getApplicationContext()).getAll();
        handleAdapterChange();
        handleChangeView();
    }

    private void searchOnTheFly (String query) {
        this.listViewMusics.setVisibility(View.GONE);
        this.loader.setVisibility(View.VISIBLE);
        ServiceApi.musicRequest(this, query, this);
    }

    private void handleSetTitle () {
        if (editTextSearch.length() > 0) this.setTitle("Sonata - Search: " + editTextSearch.getText().toString());
        else this.setTitle("Sonata - Favoris");
    }

    private void handleChangeView () {
        handleAdapterChange();
        if (favMusic.size() <= 0 &&  editTextSearch.length() <= 0) {
            this.listViewMusics.setVisibility(View.GONE);
            this.loader.setVisibility(View.GONE);
            this.emptyLayout.setVisibility(View.VISIBLE);
        } else if (editTextSearch.length() > 0) {
            this.listViewMusics.setVisibility(View.VISIBLE);
            this.loader.setVisibility(View.GONE);
            this.emptyLayout.setVisibility(View.GONE);
        } else if (favMusic.size() > 0 && editTextSearch.length() <= 0) {
            this.listViewMusics.setVisibility(View.VISIBLE);
            this.loader.setVisibility(View.GONE);
            this.emptyLayout.setVisibility(View.GONE);
        }
    }

    private void handleAdapterChange () {
        if (favMusic.size() > 0 && editTextSearch.length() <= 0) {
            musicAdapter = new MusicAdapter(this, favMusic);
            listViewMusics.setAdapter(musicAdapter);
        } else {
            musicAdapter = new MusicAdapter(this, musics);
            listViewMusics.setAdapter(musicAdapter);
        }
    }

    @Override
    public void onClick (View v) {
        if (editTextSearch.length() > 0) {
            this.listViewMusics.setVisibility(View.GONE);
            this.loader.setVisibility(View.VISIBLE);
            String search = editTextSearch.getText().toString();
            ServiceApi.musicRequest(this, search, this);
        } else {
            FavoriteRepository.getInstance(getApplicationContext()).getAll();
            handleChangeView();
        }
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Intent intent = new Intent(this, MusicActivity.class);
        if (this.musics.size() <= 0) {
            intent.putExtra("music", this.favMusic.get(position));
        } else {
            intent.putExtra("music", this.musics.get(position));
        }
        startActivity(intent);
    }

    @Override
    public void onReceiveMusics(ArrayList<Music> musics) {
        this.musics = musics;
        handleAdapterChange();
        listViewMusics.setAdapter(musicAdapter);
        handleChangeView();
        loader.setVisibility(View.GONE);
        listViewMusics.setVisibility(View.VISIBLE);
    }
}