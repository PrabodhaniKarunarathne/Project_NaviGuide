package com.naviguide.naviguide.model;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.List;


@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class Users implements Serializable {
    @Id
    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String altPhoneNumber;
    private String organizationName;
    private String email;
    private String accCategory;
    private String proffesion;
    @Field("userName")
    private String userName;
    private String password;
    private String address;
    private String userType;
    private String category;
    private String facebook;
    private String youtube;
    private String linkedin;
    private String aboutme;
    private String propic;
    private String coverpic;
    private float userRating;
    private List<Events> events;


    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getYoutube() {
        return youtube;
    }

    public void setYoutube(String youtube) {
        this.youtube = youtube;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getAboutme() {
        return aboutme;
    }

    public void setAboutme(String aboutme) {
        this.aboutme = aboutme;
    }

    public String getPropic() {
        return propic;
    }

    public void setPropic(String propic) {
        this.propic = propic;
    }

    public String getCoverpic() {
        return coverpic;
    }

    public void setCoverpic(String coverpic) {
        this.coverpic = coverpic;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Events> getEvents() {
        return events;
    }

    public void setEvents(List<Events> events) {
        this.events = events;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public float getUserRating() {
        return userRating;
    }

    public void setUserRating(float userRating) {
        this.userRating = userRating;
    }



    public Users(String userid, String firstName, String lastName, String phoneNumber, String altPhoneNumber, String organizationName, String email, String accCategory, String proffesion, String userName, String password, String userType, String facebook, String youtube, String linkedin, String aboutme, String propic, String coverpic) {
        this.userId = userid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.altPhoneNumber = altPhoneNumber;
        this.organizationName = organizationName;
        this.email = email;
        this.accCategory = accCategory;
        this.proffesion = proffesion;
        this.userName = userName;
        this.password = password;
        this.userType = userType;
        this.facebook= facebook;
        this.linkedin=linkedin;
        this.youtube=youtube;
        this.aboutme=aboutme;
        this.propic=propic;
        this.coverpic=coverpic;
    }

    public String getUserid() {
        return userId;
    }

    public void setUserid(String userid) {
        this.userId = userid;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAltPhoneNumber() {
        return altPhoneNumber;
    }

    public void setAltPhoneNumber(String altPhoneNumber) {
        this.altPhoneNumber = altPhoneNumber;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccCategory() {
        return accCategory;
    }

    public void setAccCategory(String accCategory) {
        this.accCategory = accCategory;
    }

    public String getProffesion() {
        return proffesion;
    }

    public void setProffesion(String proffesion) {
        this.proffesion = proffesion;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "Users{" +
                "userid='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", altPhoneNumber='" + altPhoneNumber + '\'' +
                ", organizationName='" + organizationName + '\'' +
                ", email='" + email + '\'' +
                ", accCategory='" + accCategory + '\'' +
                ", proffesion='" + proffesion + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", rePassword='" + address + '\'' +
                ", userType='" + userType + '\'' +
                ", propic="+propic+'\'' +
                ", coverpic="+coverpic+'\'' +
                ", aboutme="+aboutme+'\'' +
                ", facebook="+facebook+'\'' +
                ", youtube="+youtube+'\'' +
                ", linkedin="+linkedin+'\'' +

                '}';
    }

}
