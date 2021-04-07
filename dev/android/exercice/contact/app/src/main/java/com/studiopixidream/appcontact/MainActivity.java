package com.studiopixidream.appcontact;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.res.TypedArrayUtils;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Iterator;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener, View.OnClickListener {

    Button buttonAddContact;
    ListView listviewContacts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setTitle("Hermes Book - Contact list");
        setContentView(R.layout.activity_main);
        listviewContacts = findViewById(R.id.listViewContacts);
        ContactAdapter contactAdapter = new ContactAdapter(this, loadContacts());
        listviewContacts.setAdapter(contactAdapter);
        listviewContacts.setOnItemClickListener(this);

        registerForContextMenu(listviewContacts);

        buttonAddContact = findViewById(R.id.buttonAddContact);
        buttonAddContact.setOnClickListener(this);
    }

    private void saveContacts(ArrayList<Contact> contacts) {
        SharedPreferences settings = getSharedPreferences("contactsApp", MODE_PRIVATE);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString("contacts", ContactHelper.dataToJson(contacts));
        editor.apply();

        ContactAdapter contactAdapter = new ContactAdapter(this,loadContacts());
        listviewContacts.setAdapter(contactAdapter);
    }

    private void deleteContacts(int id) {
        ArrayList<Contact> contacts = loadContacts();
        Iterator iterator = contacts.iterator();
        while (iterator.hasNext()) {
            Contact contact = (Contact) iterator.next();
            if (contact.getId() == id) {
                iterator.remove();
                break;
            }
        }
        saveContacts(contacts);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Contact newContact = (Contact) getIntent().getSerializableExtra("addContact");
        Contact updateContact = (Contact) getIntent().getSerializableExtra("updateContact");
        Integer contactId = (Integer) getIntent().getSerializableExtra("contactId");
        ArrayList<Contact> contacts = loadContacts();
        if (newContact != null && newContact.getId() != null) {
            contacts.add(newContact);
            saveContacts(contacts);
        } else if (updateContact != null) {
            contacts.set(updateContact.getId()-1, updateContact);
            saveContacts(contacts);
        } else if (contactId != null) {
            deleteContacts(contactId);
        }
    }

    private ArrayList<Contact> loadContacts () {
        SharedPreferences settings = getSharedPreferences("contactsApp", MODE_PRIVATE);
        String jsonData = settings.getString("contacts", "");
        if (jsonData.equals("")) {
            return new ArrayList<Contact>();
        } else {
            return ContactHelper.jsonToData(jsonData);
        }
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);

        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_contact, menu);
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public boolean onContextItemSelected(@NonNull MenuItem item) {
        AdapterView.AdapterContextMenuInfo menuInfo = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();
        int position = menuInfo.position;
        Contact contact = loadContacts().get(position);
        switch (item.getItemId()) {
            case R.id.itemButtonCall:
                Intent intentCall = new Intent(Intent.ACTION_CALL);
                intentCall.setData(Uri.parse("tel:"+contact.getMobile()));
                int permissionCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.CALL_PHONE);
                if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CALL_PHONE}, 123);
                } else {
                    startActivity(intentCall);
                }
                break;
            case R.id.itemButtonEmail:
                Intent intentMail = new Intent(Intent.ACTION_SENDTO);
                intentMail.setData(Uri.parse("mailto:"+contact.getEmail()));
                startActivity(intentMail);
                break;
            case R.id.itemButtonDelete:
                deleteContacts(contact.getId());
                break;
            default:
                gotToForm(position);
                break;
        }
        return true;
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        gotToForm(position);
    }

    @Override
    public void onClick(View v) {
        gotToForm(-1);
    }

    private void gotToForm (int position) {
        Contact contact = null;
        if(position >= 0) {
            contact = loadContacts().get(position);
        }
        Intent intent = new Intent(this, ContactActivity.class);
        intent.putExtra("newId", loadContacts().size()+1);
        intent.putExtra("contact", contact);

        startActivity(intent);
    }
}