package com.studiopixidream.appcontact;

import java.io.Serializable;

public class Contact implements Serializable {
    private Integer id;
    private String lastname;
    private String firstname;
    private String email;
    private String mobile;

    public Contact (String lastname, String firstname, String email, String mobile) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.mobile = mobile;
    }

    public Contact (Integer id, String lastname, String firstname, String email, String mobile) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.mobile = mobile;
    }

    public Contact () {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
