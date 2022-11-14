/* tslint:disable */
/* eslint-disable */
/**
 * Mercury
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { ComponentResponse } from '../models';
/**
 * ComponentApi - axios parameter creator
 * @export
 */
export const ComponentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Components
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getComponents: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/components`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2AuthorizationCodeBearer", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ComponentApi - functional programming interface
 * @export
 */
export const ComponentApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ComponentApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Components
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getComponents(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComponentResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getComponents(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ComponentApi - factory interface
 * @export
 */
export const ComponentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ComponentApiFp(configuration)
    return {
        /**
         * 
         * @summary Components
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getComponents(options?: any): AxiosPromise<ComponentResponse> {
            return localVarFp.getComponents(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ComponentApi - object-oriented interface
 * @export
 * @class ComponentApi
 * @extends {BaseAPI}
 */
export class ComponentApi extends BaseAPI {
    /**
     * 
     * @summary Components
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ComponentApi
     */
    public getComponents(options?: any) {
        return ComponentApiFp(this.configuration).getComponents(options).then((request) => request(this.axios, this.basePath));
    }
}
