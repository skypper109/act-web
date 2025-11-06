export class Env {
  public static
   URL_API = "http://localhost:8085/api/v1/act-org/auth/";

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
    IMAGE_URL="http://localhost:8085/api/v1/act-org/uploads/";
}
