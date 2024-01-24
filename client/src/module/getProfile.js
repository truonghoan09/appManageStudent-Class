import { child, get, ref } from "firebase/database";
import { db } from "../firebase";


const getProfile = async (uid) => {

    try {
      const snapshot = await get(child(ref(db), 'users/' + uid + '/myProfile/'))
      if (snapshot.exists()) {
        return(snapshot.val());
      } else {
        return(-1);
      }
    } catch (error) {
      console.log(error);
    }
}

export default getProfile;