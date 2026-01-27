/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComponentResponse } from '../models/ComponentResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ComponentService {
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
