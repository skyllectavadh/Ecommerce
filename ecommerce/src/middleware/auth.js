// const jwt = require('jsonwebtoken');
// const {JWT} = require('../config');
// const {User: Model} = require('../v1/models');
// const Authenticate = async (req, res, next) => {
//     try {
//         const customError = new Error();
//         customError.code = 401;
//         const {authorization} = req.headers;
//         if (!authorization) {
//             customError.message = 'Unauthorized';
//             throw customError
//         }
//         const split = authorization.split(' ');
//         if (split.length <= 1) {
//             customError.message = 'Bad format for authorization';
//             throw customError
//         }
//         const verifyToken = jwt.verify(split[1], JWT.secret);
//         const rootUser = await Model.findOne({_id: verifyToken._id}).lean();
//         if (!rootUser) {
//             customError.message = 'User not Found';
//             throw customError
//         }
//         rootUser.authToken = split[1];
//         rootUser.isAdmin = rootUser.role === 'ADMIN';
//         delete rootUser.password;
//         delete rootUser.__v;
//         req.user = rootUser;
//         next();
//     } catch (err) {
//         return res.error(err);
//     }
// }
// module.exports = Authenticate;


const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Check if the header has the format "Bearer token"
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  // Extract the token by removing the "Bearer " prefix using slice
  const token = authHeader.slice(7);  

  try {
    console.log("token", token);
    const decoded = jwt.verify(token, secretKey);
    // console.log("decode",decoded);
    req.userId = decoded.userId;
    // console.log("userid req",req.userId);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;










// const jwt = require('jsonwebtoken');
// const secretKey = process.env.SECRET_KEY;
// const auth = (req, res, next) => {
 
//   const token = req.header('Authorization');


//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }
//   try {      
//     console.log("token",token);
//       const decoded = jwt.verify(token,secretKey);
      
//     req.userId = decoded.userId;

//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };

// 