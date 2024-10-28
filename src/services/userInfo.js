import { jwtDecode } from "jwt-decode";
import { getCookie } from "utils/cookie"; 

function getUserInfoFromToken(token) {
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
      

// if (userInfo) {
//   console.log('User Info:', userInfo);
// } else {
//   console.log('Failed to decode token');
// }

export default getUserInfoFromToken