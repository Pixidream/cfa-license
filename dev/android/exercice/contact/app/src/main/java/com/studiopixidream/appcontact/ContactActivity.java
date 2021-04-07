package com.studiopixidream.appcontact;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class ContactActivity extends AppCompatActivity implements View.OnClickListener {

    EditText editTextFirstName, editTextLastName, editTextEmail, editTextMobile;
    Button buttonCancel, buttonSave, buttonDelete;
    Contact contact;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact);
        this.setTitle("Hermes Book - Create Contact");

        editTextFirstName = findViewById(R.id.editTextFirstName);
        editTextLastName = findViewById(R.id.editTextLastName);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextMobile = findViewById(R.id.editTextMobile);

        buttonCancel = findViewById(R.id.button_cancel);
        buttonCancel.setOnClickListener(this);

        buttonSave = findViewById(R.id.button_save);
        buttonSave.setOnClickListener(this);

        buttonDelete = findViewById(R.id.button_delete);
        buttonDelete.setOnClickListener(this);
        buttonDelete.setVisibility(View.GONE);
    }

    @Override
    protected void onResume() {
        super.onResume();
        contact = (Contact) getIntent().getSerializableExtra("contact");
        if (contact != null) {
            this.setTitle("Hermes Book - Update Contact");
            buttonDelete.setVisibility(View.VISIBLE);
            buttonSave.setText("Update");
            editTextFirstName.setText(contact.getFirstname());
            editTextLastName.setText(contact.getLastname());
            editTextEmail.setText(contact.getEmail());
            editTextMobile.setText(contact.getMobile());
        }
    }

    @Override
    public void onClick(View v) {
            Intent intent = new Intent(this, MainActivity.class);

            String lastName, firstName, email, mobile;
            lastName = editTextLastName.getText().toString();
            firstName = editTextFirstName.getText().toString();
            email = editTextEmail.getText().toString();
            mobile = editTextMobile.getText().toString();
        if (v.equals(buttonCancel)) {
            intent.putExtra("addContact", new Contact());
        } else if (contact == null && v.equals(buttonSave)) {
            int newId = getIntent().getIntExtra("newId", 1);
            Contact contact = new Contact(newId, lastName, firstName, email, mobile);
            intent.putExtra("addContact", contact);
        } else if (v.equals(buttonSave)) {
            contact.setLastname(lastName);
            contact.setFirstname(firstName);
            contact.setEmail(email);
            contact.setMobile(mobile);
            intent.putExtra("updateContact", contact);
        } else if (v.equals(buttonDelete)) {
            intent.putExtra("contactId", contact.getId());
        }
        startActivity(intent);
    }
}
