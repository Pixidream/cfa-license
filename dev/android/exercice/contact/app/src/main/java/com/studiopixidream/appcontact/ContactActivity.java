package com.studiopixidream.appcontact;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class ContactActivity extends AppCompatActivity {

    EditText editTextFirstName, editTextLastName, editTextEmail, editTextMobile;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);

        editTextFirstName = findViewById(R.id.editTextFirstName);
        editTextLastName = findViewById(R.id.editTextLastName);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextMobile = findViewById(R.id.editTextMobile);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Contact contact = (Contact) getIntent().getSerializableExtra("contact");
        if (contact != null) {
            editTextFirstName.setText(contact.getFirstname());
            editTextLastName.setText(contact.getLastname());
            editTextEmail.setText(contact.getEmail());
            editTextMobile.setText(contact.getMobile());
        }
    }
}
