package com.example.backendjava.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResponseDto<T> {
    private String status; // success | fail
    private String msg;
    private T data;

    public ResponseDto() {}

    public ResponseDto(String status, String msg, T data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    public static <T> ResponseDto<T> success(T data) {
        return new ResponseDto<>("success", "", data);
    }

    public static <T> ResponseDto<T> success(T data, String msg) {
        return new ResponseDto<>("success", msg == null ? "" : msg, data);
    }

    public static <T> ResponseDto<T> fail(String msg) {
        return new ResponseDto<>("fail", msg, null);
    }
}


