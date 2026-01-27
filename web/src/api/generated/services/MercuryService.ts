/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComponentResponse } from '../models/ComponentResponse';
import type { Multiflash } from '../models/Multiflash';
import type { MultiflashResponse } from '../models/MultiflashResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MercuryService {
    /**
     * Get Information On Authenticated User
     * @returns any Successful Response
     * @throws ApiError
     */
    public static whoami(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/whoami/',
        });
    }
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
    /**
     * Components
     * @returns ComponentResponse Successful Response
     * @throws ApiError
     */
    public static getComponents(): CancelablePromise<ComponentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/components',
        });
    }
}
