package com.studiopixidream.appcontact;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;

public class ContactAdapter extends BaseAdapter {

    private Activity activity;
    private ArrayList<Contact> contacts;

    public ContactAdapter(Activity activity, ArrayList<Contact> contacts) {
        this.activity = activity;
        this.contacts = contacts;
    }

    @Override
    public int getCount() {
        return this.contacts.size();
    }

    @Override
    public Object getItem(int position) {
        return this.contacts.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if(convertView == null) {
            convertView = LayoutInflater.from(this.activity).inflate(R.layout.item_contact, parent, false);
        }

        TextView textviewFirstname = convertView.findViewById(R.id.textViewFieldFirstName);
        textviewFirstname.setText(contacts.get(position).getFirstname());

        TextView textviewLastname = convertView.findViewById(R.id.textViewFieldLastName);
        textviewLastname.setText(contacts.get(position).getLastname());

        return convertView;
    }
}
