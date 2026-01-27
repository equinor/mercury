/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Multiflash } from '../models/Multiflash';
import type { MultiflashResponse } from '../models/MultiflashResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MultiflashService {
    /**
     * Compute Multiflash
     * @param requestBody
     * @returns MultiflashResponse Successful Response
     * @throws ApiError
     */
    public static computeMultiflash(
        requestBody: Multiflash,
    ): CancelablePromise<MultiflashResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/multiflash',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
