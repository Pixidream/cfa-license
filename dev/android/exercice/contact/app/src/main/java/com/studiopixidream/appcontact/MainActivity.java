package com.studiopixidream.appcontact;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ListView listviewContacts = findViewById(R.id.listViewContacts);
        ContactAdapter contactAdapter = new ContactAdapter(this, sampleContacts());
        listviewContacts.setAdapter(contactAdapter);
        listviewContacts.setOnItemClickListener(this);
    }

    private ArrayList<Contact> sampleContacts () {
        ArrayList<Contact> contacts = new ArrayList<Contact>();

        contacts.add(new Contact("francois", "joan", "j.francois@cfa-insta.fr", "0685697845"));
        contacts.add(new Contact("francois", "lavignemarbach", "f.lavigne-marbach@cfa-insta.fr", "0789562345"));
        contacts.add(new Contact("toto", "toto", "toto@cfa-insta.fr", "78989564256"));
        contacts.add(new Contact("tata", "tata", "j.tata@cfa-insta.fr", "0689125679"));
        contacts.add(new Contact("titi", "titi", "j.titi@cfa-insta.fr", "0789564213"));

        return contacts;
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Contact contact = sampleContacts().get(position);
        Intent intent = new Intent(this, ContactActivity.class);
        intent.putExtra("contact", contact);

        startActivity(intent);
    }
}