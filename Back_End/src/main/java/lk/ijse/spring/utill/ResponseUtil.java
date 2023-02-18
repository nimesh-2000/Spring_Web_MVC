package lk.ijse.spring.utill;

public class ResponseUtil {
    private String code;
    private String message;
    private Object data;

    public ResponseUtil() {
    }

    public ResponseUtil(String code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
