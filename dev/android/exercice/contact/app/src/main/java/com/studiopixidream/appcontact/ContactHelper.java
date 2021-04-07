package com.studiopixidream.appcontact;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class ContactHelper {

    public static String dataToJson (ArrayList<Contact> contacts) {
        List<Contact> contactList = new ArrayList<Contact>(contacts.size());
        contactList.addAll(contacts);
        Gson gson = new Gson();
        return gson.toJson(contactList);
    }

    public static ArrayList<Contact> jsonToData (String json) {
        Gson gson = new Gson();
        Type typeMyType = new TypeToken<ArrayList<Contact>>(){}.getType();
        return gson.fromJson(json, typeMyType);
    }
}
