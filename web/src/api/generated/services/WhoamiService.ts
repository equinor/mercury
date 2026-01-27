/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WhoamiService {
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
}
