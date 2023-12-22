package model.exceptions;

public class ErrorConnectingToDatabaseException extends Exception {

	public ErrorConnectingToDatabaseException(String message, Exception cause) {
		super(message, cause);
	}

}
