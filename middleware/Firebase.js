import admin from "firebase-admin"
import serviceAccount from '../config/sa.json' assert { type: "json" };

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  export default { firebaseApp }