import { Request as ExpressRequest } from 'express';
import Logger from './logger';

interface ApiResponseBase {
  success: boolean;
  message: string;
}

// This will only have a data prop if a type is specified for it
export type ApiResponseSuccess<T = never> = ApiResponseBase & {
  success: true;
} & ([T] extends [never] ? { data?: T } : { data: T });

interface ApiResponseFailure extends ApiResponseBase {
  success: false;
}

export type ApiResponse<T = never> = ApiResponseSuccess<T> | ApiResponseFailure;

export type ApiResponseAndStatus<T = never> = {
  response: ApiResponse<T>;
  statusCode: number;
};

/**
 * Validate a request body against a schema and return the correct type
 * @param body unvalidated request body
 * @param schema Joi schema to validate request body against
 */
export const validateRequest = <T>(
  unvalidated: unknown,
  schema: Joi.Schema
): ApiResponse<T> => {
  const { error, value } = schema.validate(unvalidated);

  if (error) {
    const message = 'Badly formed request';
    logger({
      level: 'error',
      method: 'validateRequest',
      message,
      error
    });
    return {
      success: false,
      message
    };
  }

  // there were no validation errors if we reached this point
  return {
    success: true,
    message: 'Well formed request',
    data: value as T
  } as ApiResponse<T>;
};

/**
 * Return failed API call, and log a message - reduces boilerplate in functions
 * @param statusCode HTTP status code
 * @param returnMessage message to return to user
 * @param logMessage message to log
 */
export const returnFailed = (
  statusCode: number,
  returnMessage: string,
  logMessage: string
): ApiResponseAndStatus => {
  logger({ level: 'warn', method: 'API returnFailed', message: logMessage });
  return {
    statusCode,
    response: {
      success: false,
      message: returnMessage
    }
  };
};
