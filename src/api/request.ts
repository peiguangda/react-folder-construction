/* eslint-disable */
import * as qs  from 'qs';
import {
    assign,
    isEmpty,
    pickBy,
    identity
} from 'lodash';
import { apiConfig } from '../common/constants/config'

export const getDomain = (parameters) => {
    return parameters.$domain ? parameters.$domain : apiConfig['url-api'];
};

export const getConfig = (parameters) => {
    return parameters.$config ? parameters.$config : {};
};

export const request = (method, url, queryParameters, form, config) => {
    method = method.toLowerCase();
    let keys = Object.keys(queryParameters);
    let queryUrl = url;
    if (keys.length > 0) {
        queryUrl = url + '?' + qs.stringify(queryParameters);
    }

    const defaultConfig = {
        method: method,
        uri: queryUrl,
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        json: true
    };

    let mergedConfig;
    if (isEmpty(form)) {
        mergedConfig = assign(defaultConfig, config);
    } else {
        mergedConfig = assign({
            body: form
        }, defaultConfig, config);
    }
    return mergedConfig;
}

function mergeQueryParams(parameters, queryParameters) {
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters)
            .forEach(function(parameterName) {
                let parameter = parameters.$queryParameters[parameterName];
                queryParameters[parameterName] = parameter;
            });
    }
    return queryParameters;
}

/**
 * Get texts
 * @method
 * @name getTexts
 * @param {object} parameters - method options and parameters
 */
export const getTexts = function(parameters = {}) {
    // let path = '/mock/language.json';
    let path = '/languages';
    let queryParameters = { languageType:'ja' };
    if (parameters['language'] !== undefined && parameters['language'] !== null) {
        queryParameters['language'] = parameters['language'];
    }
    
    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'GET',
        getDomain(parameters) + path,
        queryParameters,
        {},
        getConfig(parameters)
    );
}

/**
 * Get users
 * @method
 * @name getUsers
 * @param {object} parameters - method options and parameters
 */
export const getUsers = function(parameters = {}) {
    // let path = '/mock/job.json';
    let path = '/users';
    let queryParameters = {
        pageIndex: 1
    };
    let form = {};
    queryParameters = assign(queryParameters, parameters);

    return request(
        'GET',
        getDomain(parameters) + path,
        pickBy(queryParameters, identity),
        form,
        getConfig(parameters)
    );
};

/**
 * add User
 * @method
 * @name countUpAge
 * @param {object} parameters - method options and parameters
 */
export const addUser = function(parameters = {}) {
    // let path = '/mock/job.json';
    let path = '/user';
    let queryParameters = {};
    let form = {...parameters};

    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'POST',
        getDomain(parameters) + path,
        queryParameters,
        form,
        getConfig(parameters)
    );
};

/**
 * count Up Age
 * @method
 * @name countUpAge
 * @param {object} parameters - method options and parameters
 */
export const countUpAge = function(parameters: {id: number, age: number}) {
    // let path = '/mock/job.json';
    let path = '/user/' + parameters.id;
    let queryParameters = {};
    let form = {...parameters};
    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'PUT',
        getDomain(parameters) + path,
        queryParameters,
        form,
        getConfig(parameters)
    );
};

/**
 * delete User
 * @method
 * @name deleteUser
 * @param {object} parameters - method options and parameters
 */
export const deleteUser = function(parameters: {id: number}) {
    // let path = '/mock/job.json';
    let path = '/user/' + parameters.id;
    let queryParameters = {};
    let form = {};

    queryParameters = mergeQueryParams(parameters, queryParameters);
    return request(
        'DELETE',
        getDomain(parameters) + path,
        queryParameters,
        form,
        getConfig(parameters)
    );
};