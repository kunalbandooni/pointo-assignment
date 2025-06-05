package com.pointo.task.management.dto;

import lombok.*;

import org.springframework.http.HttpStatus;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse<T> {
    ResponseStatus status;
    String message;
    Integer statusCode;
    HttpStatus statusType;
    T responseBody;

    public void setSuccess(String message, T responseBody) {
        this.status = ResponseStatus.SUCCESS;
        this.statusCode = HttpStatus.OK.value();
        this.statusType = HttpStatus.OK;
        this.responseBody = responseBody;
        this.message = Objects.requireNonNullElse(message, "Fetched response successfully");
    }

    public void setFailure(String message) {
        this.status = ResponseStatus.FAILURE;
        this.statusCode = HttpStatus.NOT_FOUND.value();
        this.statusType = HttpStatus.NOT_FOUND;
        this.responseBody = null;
        this.message = Objects.requireNonNullElse(message, "Unable to fetch response");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseResponse<?> that = (BaseResponse<?>) o;
        return Objects.equals(status, that.status) &&
                Objects.equals(message, that.message) &&
                Objects.equals(statusCode, that.statusCode) &&
                statusType == that.statusType &&
                Objects.equals(responseBody, that.responseBody);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, message, statusCode, statusType, responseBody);
    }

    private enum ResponseStatus {
        SUCCESS,
        FAILURE
    }
}