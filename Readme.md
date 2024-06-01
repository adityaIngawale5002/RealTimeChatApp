# Real Time Chat App

## Project View
- **Login Page**:
   ![Login Page](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/Loginpage.png)

- **Register Page**:
   ![Register Page](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/registerpage.png)

- **Main Chat Window**:
   ![Chat Window](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/MainChatSection.png)

- **Navbar**:
   ![Navbar](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/navbar.png)

- **Notification Section**:
   ![Notification](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/notification.png)

- **Create Group**:
   ![Create Group](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/createGroup.png)

- **Add Group Member**:
   ![Add Group Member](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/AddGroupmember.png)

- **Manage Group Page**:
   ![Manage Group Section](https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/manageGroup.png)

## And many more such ui components

## Project Description

- **User Registration**:
   - Users can register in the web app by providing a username, bio, profile picture,and password.

- **User Login/Logout**:
   -  Users can log in to their exsting account using their username and password.
   - User can logout of their account anytime using the logout button.

- **Friend Requests**:
   - Users can send friend requests to any existing user.
   - User can accept or reject friend requests from other users.

- **Search Users**:
   - Users can search for any existing user within the web app.

- **Real-Time Chat**:
   - Users can engage in real time chat with it's frined.

- **Media Sharing**:
   - Users can send messages,images, videos,audio,and documents to theri friend.


- **Notifcations**:
   - Users receive dynamic notifications for new messages and friend requests.

- **Chat Management**:
    - Users can create groups of friends and manage group settings as a admin.
    - Users can add or remove members from the group
    - Users can change the name of the group anytime.
    - Users can delete the group.

- **Mobile Responsive**:
    - The app is fully responsive and optimized for mobile devices.

# Real Time Chat App - Frontend Development
## Tools Used

### React.js
- **Purpose**: To create dynamic web applications.
- **Description**: React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page. Its main goal is to be fast, scalable, and simple.

### Redux Toolkit
- **Purpose**: For state management and dynamic API querying.
- **Description**: Redux Toolkit simplifies the process of writing Redux logic and reduces boilerplate code. It includes the `createSlice` function for defining reducers and actions, and `createAsyncThunk` for handling async actions.

### Redux Toolkit Query
- **Purpose**: For API querying.
- **Description**: Redux Toolkit Query is a powerful data fetching and caching tool. It helps in defining endpoints and managing server-side state in your React application efficiently.

### React Router DOM
- **Purpose**: For client-side routing.
- **Description**: React Router DOM enables navigation among views of various components in a React application, allows changing the browser URL, and keeps the UI in sync with the URL.

### React Hot Toast
- **Purpose**: For real-time popup notifications.
- **Description**: React Hot Toast is a lightweight library to create customizable toast notifications for React applications. It helps in showing alerts and feedback to users promptly.

### Axios
- **Purpose**: To handle API requests.
- **Description**: Axios is a promise-based HTTP client for the browser and Node.js. It makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations.

### Material-UI
- **Purpose**: For creating interactive UI components.
- **Description**: Material-UI is a popular React UI framework that implements Google's Material Design. It provides a set of components and styles that enable developers to build aesthetically pleasing and responsive web applications.

### MUI Icons
- **Purpose**: For pretty icons.
- **Description**: MUI Icons (formerly known as Material-UI Icons) are a collection of React components that wrap Material Design icons. They help in adding visually appealing icons to your application.

### Socket.io-client
- **Purpose**: To handle web socket events on the client side.
- **Description**: Socket.io-client is a JavaScript library for real-time web applications. It enables real-time, bidirectional communication between web clients and servers. It is used for event-driven communication, making it ideal for chat applications.

# Real Time Chat App - Backend Development

## Tools Used

### Express.js
- **Purpose**: For creating an HTTP server using Node.js.
- **Description**: Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It provides a robust set of features to develop web and mobile applications and enables handling HTTP requests and responses efficiently.

### Express Validator
- **Purpose**: For input validation on the server side.
- **Description**: Express Validator is a set of Express.js middleware that provides easy validation of user inputs. It helps in sanitizing and validating input data to ensure the integrity and security of your application.

### bcrypt
- **Purpose**: For password hashing and encoding.
- **Description**: bcrypt is a library to help you hash passwords. It uses a strong hashing algorithm to ensure that passwords are stored securely, protecting them from being easily compromised in case of a data breach.

### Mongoose
- **Purpose**: For creating models/schema to store user information, chats, and group information.
- **Description**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model application data and includes built-in type casting, validation, query building, and business logic hooks.

### multer
- **Purpose**: To handle file uploading on the server side.
- **Description**: multer is a middleware for handling `multipart/form-data`, which is primarily used for uploading files. It makes the process of uploading and managing files in your application seamless.

### jsonwebtoken
- **Purpose**: For creating tokens for user validation and creating cookies.
- **Description**: jsonwebtoken (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. It is commonly used for authentication and authorization in web applications.

### dotenv
- **Purpose**: For accessing environment variables stored in `.env` files.
- **Description**: dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. It is essential for managing sensitive configuration data separately from your codebase.

### cors
- **Purpose**: To handle Cross-Origin Resource Sharing (CORS) requests.
- **Description**: cors is a middleware that allows you to configure the CORS settings for your application. It helps in managing how your server handles requests from different origins, which is crucial for security and integration with front-end applications.

### Cloudinary
- **Purpose**: For uploading binary files or the files sent by users to cloud storage.
- **Description**: Cloudinary is a cloud-based service that provides an end-to-end solution for image and video management. It includes cloud storage, image and video manipulation, and content delivery network (CDN) integration.

### cookie-parser
- **Purpose**: To parse incoming cookies.
- **Description**: cookie-parser is a middleware that parses cookies attached to the client request object. It simplifies the management and use of cookies in your application.

### socket.io
- **Purpose**: For handling WebSocket implementation on the server side.
- **Description**: socket.io is a JavaScript library for real-time web applications. It enables real-time, bidirectional communication between web clients and servers, making it ideal for developing chat applications and other interactive features.


## Installation Guide

### Prerequisites

- Ensure you have Node.js and npm (Node Package Manager) installed. You can download them from [nodejs.org](https://nodejs.org/).
- MongoDB should be installed and running. You can download it from [mongodb.com](https://www.mongodb.com/).

### Frontend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/adityaingawale5002/RealTimeChatApp.git
   cd  RealTimeChatApp/frontend
   ``` 
2. **Install Dependencies**

    ```bash
    npm install
    ```
3. **Run the Application**
   ```
    npm run dev
   ```

### Backend Setup

1. **Navigate to the Backend Directory**
   ```
   cd yourrepository/backend
   ```
2. **Install Dependencies**
   ```
   npm install
   ```
3. **Create Environment Variables File**
    ```
    MONGO_URI=mongodb://localhost:27017/yourdbname
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
4. **Run the Server**
    ```
    npm run dev
    ```








https://github.com/adityaIngawale5002/RealTimeChatApp/blob/main/Images/AddGroupmember.png

