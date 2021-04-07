package com.studiopixidream.appmusic;

import android.content.Context;
import android.graphics.Bitmap;
import android.widget.ImageView;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.ImageRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.JsonArray;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ServiceApi {

    private  static String URL_API = "https://api.deezer.com/search?q=";

    public static void musicRequest(Context ctx, String search, IListenerAPI listener) {
        RequestQueue queue = Volley.newRequestQueue(ctx);
        StringRequest request = new StringRequest(URL_API + search, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                ArrayList<Music> musics = new ArrayList<Music>();
                try {
                    JSONObject jsonObject = new JSONObject(response);
                    JSONArray jsonArray = jsonObject.getJSONArray("data");
                    for (int i = 0; i < jsonArray.length(); i++) {
                        Music temp = new Music();
                        JSONObject object = jsonArray.getJSONObject(i);
                        temp.setId(object.getInt("id"));
                        temp.setTitle(object.getString("title"));
                        temp.setArtiste(object.getJSONObject("artist").getString("name"));
                        temp.setAlbum(object.getJSONObject("album").getString("title"));
                        temp.setImage(object.getJSONObject("album").getString("cover_xl"));
                        temp.setLink(object.getString("link"));
                        temp.setPreview(object.getString("preview"));
                        musics.add(temp);
                    }
                } catch (JSONException e){
                    e.printStackTrace();
                }
                listener.onReceiveMusics(musics);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });

        queue.add(request);
    }

    public static void loadImage(Context context, String url, final ImageView imageView) {
        RequestQueue queue = Volley.newRequestQueue(context);
        ImageRequest request = new ImageRequest(
                url,
                new Response.Listener<Bitmap>() {
                    @Override
                    public void onResponse (Bitmap bitmap) {
                        imageView.setImageBitmap(bitmap);
                    }
                }, 0, 0, null,
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        imageView.setImageResource(android.R.drawable.ic_menu_gallery);
                    }
                });
        queue.add(request);
    }
}
