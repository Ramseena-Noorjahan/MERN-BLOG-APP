// const express = require('express')
// const { connect } = require('mongoose')
// require('dotenv').config()
// const cors = require('cors')

// const userRoutes = require('./routes/userRoutes')
// const postsRoutes = require('./routes/postsRoutes')
// const {notFound,errorHandler} = require('./middlewares/errorMiddleware')

// const app = express()

// app.use(cors({credentials:true, origin:"http://localhost:3000"}))

// app.use(express.json({extended:true}))
// app.use(express.urlencoded({extended:true}))


// app.use('/api/users',userRoutes)
// app.use('/api/posts',postsRoutes)

// app.use(notFound)
// app.use(errorHandler)




// connect(process.env.MONGO_URI).then(app.listen(5000, () => console.log(`server running on port ${process.env.PORT}`)))
// .catch(error => {console.log(error)})

const express = require('express');
const { connect } = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const postsRoutes = require('./routes/postsRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const upload = require('express-fileupload')


const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "https://mern-blog-app-frontend-rho.vercel.app" }));
app.use(upload())
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);

app.use(notFound);
app.use(errorHandler);


connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(error => console.log(error));
