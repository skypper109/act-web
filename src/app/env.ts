export class Env {
  public static
   URL_API = "http://13.51.189.162:8085/api/v1/act-org/auth/";
  // public static
  //  URL_API = "http://localhost:8085/api/v1/act-org/auth/";

  public static
   LOGIN=Env.URL_API+"loginAdmin";

  public static
    ASSOCIATION=Env.URL_API+"associations/";

  public static
    ORGANISATION=Env.URL_API+"ong/";

  public static
    NOTIFICATION=Env.URL_API+"notification/";

  public static
    DONATION=Env.URL_API+"donations/";

  public static
    DEMANDE_DONATION=Env.URL_API+"demande-dons/";

  public static
    LIST_USER=Env.DONATION+"users";

  public static
    IMAGE_URL="http://13.51.189.162:8085";

  // public static
  //   IMAGE_URL="http://localhost:8085";

  static firebase: {
    apiKey: "AIzaSyBCvxpHo84qvFdQLXJ2cZsXPVIY0_EW90A";
    authDomain: "act-projet.firebaseapp.com";
    projectId: "act-projet";
    storageBucket: "act-projet.firebasestorage.app";
    messagingSenderId: "422682145438";
    appId: "1:422682145438:web:4889578ad40f05038e418f";
    measurementId: "G-TYH34J94VD";
  }
}
