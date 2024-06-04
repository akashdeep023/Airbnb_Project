# Airbnb-Inspired Full-Stack Web Application 🚀

<p align="center">
  <b style="color: blue;  ">Visitor count</b>
  <br>
  <a style="" href="https://github.com/akashdeep023">
  <img src="https://profile-counter.glitch.me/airbnb-project/count.svg" />
  </a>
</p>

---

## Table of Contents

-   [Project Overview](#project-overview)
-   [Technologies & Packages Used](#technologies--packages-used)
-   [Key Features](#key-features)
-   [How to Install](#how-to-install)
-   [Challenges & Solutions](#challenges--solutions)
-   [Special Thanks](#special-thanks)
-   [Author](#author)
-   [Project Link](#project-link)
-   [Thank You](#thank-you)
-   [Ex- Image](#ex--image)

## Project Overview

Excited to share my journey of developing a feature-rich full-stack web application inspired by Airbnb. The project is built using MongoDB, Express.js, and Node.js.

## Technologies & Packages Used

### Backend

-   **MongoDB**: NoSQL database for flexible and scalable data storage.
-   **Express.js**: Web application framework for Node.js, providing robust features for web and mobile applications.
-   **Node.js**: JavaScript runtime for server-side development.

### Authentication

-   **Passport.js**: Middleware for user authentication, supporting various strategies.
-   **Dotenv**: Environment variable management for secure configuration.

### Image Storage

-   **Cloudinary**: Cloud-based image and video management solution.

### Maps

-   **Mapbox**: Platform for custom maps and location-based experiences.

### Frontend

-   **EJS**: Embedded JavaScript templates for dynamic content rendering.

### Session Management

-   **Connect Flash**: Middleware for flash messages.
-   **Connect Mongo**: MongoDB session store for Express.js.
-   **Cookie Parser**: Middleware for parsing cookies.

### Validation

-   **Joi**: Library for data validation.

### Object Modeling

-   **Mongoose**: MongoDB object modeling for Node.js.

### File Uploads

-   **Multer**: Middleware for handling file uploads.

### Social Authentication

-   **Passport Local**: Local authentication strategy.
-   **Passport Facebook**: Facebook authentication strategy.
-   **Passport Google OAuth20**: Google OAuth2.0 authentication strategy.
-   **Passport Local Mongoose**: Mongoose-specific authentication strategy.
    Authentication

## Key Features

-   **User Authentication:** Login, Logout, and User Profile Section
-   **CRUD Operations:** Add, Edit, and Delete Listings
-   **Review System:** Add and Delete Reviews
-   **Account Management:** Update User Account and Password
-   **User Data Security:** Password Hashing and Encryption
-   **Interactive Maps:** Leveraging Mapbox for Location Visualization
-   **Login with Google:** Authenticate with your Google account for a seamless experience
-   **Login with Facebook:** Easily log in using your Facebook credentials
-   **Login with Email:** Traditional email login for user convenience

## How to Install

Follow these steps to set up and run the project locally:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/akashdeep023/Airbnb_Project.git
    cd Airbnb_Project
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**

    Configure the following environment variables by creating a .env file in the root of your project:

    Example :-

    ```bash
    #https://cloudinary.com/  (Cloudinary) (Change key)
    CLOUD_NAME=kjkdmckdhjks
    CLOUD_API_KEY=89340593499490394
    CLOUD_API_SECRET=jdskLKJlklkdlsdfkKKdsdkkd

    #https://www.mapbox.com/ (Mapbox)
    MAP_TOKEN=pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ

    #https://www.mongodb.com/ (MongoDb Atlas) (Change key)
    ATLASDB_URL=mongodb+srv://demo:kLKJFKOEMNDDOI9089dndd@cluster0.kkdnvkdkds.mongodb.net/?retryWrites=true&w=majority

    #Add Random Secret Key
    SECRET=ckcdenlksufoifafknddsoiddfkadsfafd

    #https://console.developers.google.com/ (Google Developer Console) (Change key)
    GOOGLE_CLIENT_ID=89038948394-kjfdkcmckdmckdfsid94jkkknd9sd4.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=KDJKDF-4KJDF894NF-DFKEF9MN-NFKEJD

    #https://developers.facebook.com/ (Facebook Developer Console) (Change key)
    FACEBOOK_APP_ID=94383859383287
    FACEBOOK_APP_SECRET=89diodfjd9r98ddfjsodwj9df8d

    #Add redirect URL in Google Developer Console
    GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

    #Add redirect URL in Facebook Developer Console
    FACEBOOK_CALLBACK_URL=http://localhost:8080/auth/facebook/callback

    ```

    Replace the values with your specific configurations.

4.  **Run the Application:**

    ```bash
    node app.js
    ```

5.  **Open in Your Browser:**

    Open `http://localhost:8080/listings` in your web browser.

## Challenges & Solutions

Encountered challenges, especially with data handling, but implemented efficient solutions. Overcame scalability issues with a well-architected backend.

## Special Thanks

A heartfelt thank you to Shradha Khapra didi and AMAN DHATTARWAL bhaiya at #ApnaCollege for their invaluable support and collaboration. As mentors and teachers, your guidance has been instrumental in shaping the success of this project. Your dedication to fostering learning and innovation has made a lasting impact, and I'm grateful for the opportunity to learn and grow under your mentorship.

## Author

Akash Deep \
Email: contact.akashdeep023@gmail.com \
LinkedIn : https://www.linkedin.com/in/akashdeep023/

## Thank You

Thank you for exploring Airbnb! Your feedback is valuable. If you have any suggestions or thoughts, feel free to share them with us. 😊

---

## Ex- Image

**Home Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/4277d539-f779-48db-92ca-222be5359baa)

**Footer Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/84f6e124-91aa-4dd9-b14b-d67781effe33)

**SignUp Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/d8753ac5-b237-4373-850c-99008137af5b)

**LogIn Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/5bec0280-c4de-495d-93ac-1f9ae59df0c3)

**Profile Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/747c25a5-d912-422d-bbc4-f7304228ef3c)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/3efc00d6-e108-4847-a058-4bb271485cff)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/5455b5ba-2796-4de1-aefe-187435f84219)

**Update Prifile**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/b229e0e7-c276-48ba-897a-dd8900aafc35)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/db42e30d-a24c-4b2c-a3c5-c2338ee4d5d7)

**Confirmation Box**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/d8717db4-dbd1-491c-aa6d-356f4bcf3f31)

**Alert Msg**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/70b4f767-fba9-4bc2-b0f1-efb700cc1cc3)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/b6857746-bdb7-4655-91bc-58deebe5bffc)

**Loader**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/fad03cbb-fac8-463a-a09d-d871e87ad474)

**Create New Restaurant**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/bb3cc8be-5cf2-4902-8f34-948cda8a58e7)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/db343223-2996-489c-9089-d00238074970)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/00eb331a-74dc-4c77-bba3-35fa73b64c71)

**Show Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/dc9b64d3-9348-4b6f-84c4-319b19df3aff)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/4d0ad659-0f7a-4189-919e-33274cbf95cc)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/a2c161da-cebd-4154-b26b-45f4da77c4cb)

**Edit Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/0667a6ee-5136-460e-ae6f-c64bd9859388)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/60113611-b7ab-40df-a29a-75d32a49671c)

**Filter Page**
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/6df98108-a1fc-462c-bda6-cf7563b6027e)
![image](https://github.com/akashdeep023/Airbnb_Project/assets/126412088/c8ff9e97-739e-44c4-8303-ca96b1153eec)

### Thanks for visit... 😊😊😊
