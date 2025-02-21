## E-Commerce Application using Node.js, Express, MongoDB, and EJS  

### 📌 Project Overview  
This is a simple e-commerce application built with:  
- **Node.js & Express** for the backend  
- **MongoDB** as the database  
- **EJS** as the templating engine  
- **Nodemon** for development  

### 🚀 Features  
- User authentication (login/register)  
- Product listing & details  
- Shopping cart functionality  
- Order management  

### 🛠️ Installation & Setup  

#### 1️⃣ Clone the repository  
```sh
git clone https://github.com/gadekarvitthal2/ecomerse-using-node-express-mongo-.git
cd ecomerse-using-node-express-mongo-
```

#### 2️⃣ Install dependencies  
```sh
npm install
```

#### 3️⃣ Configure environment variables  
Create a `.env` file and add the following:  
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
SESSION_SECRET=your_secret_key
```

#### 4️⃣ Run the application  
```sh
npm start
```
The app will start on `http://localhost:3000`.

### 📂 Project Structure  
```
/ecommerce-app
│-- /views              # EJS templates  
│-- /routes             # Express routes  
│-- /models             # Mongoose models  
│-- /controllers        # Business logic  
│-- app.js              # Entry point  
│-- package.json        # Dependencies & scripts  
```

### 📜 Scripts in package.json  
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "nodemon app.js"
}
```

### 🏗️ Future Improvements  
- Implement user roles (admin, customer)  
- Add payment integration  
- Improve UI & responsiveness  

---

