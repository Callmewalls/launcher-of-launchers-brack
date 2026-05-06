# ISteamNewsApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamNewsGetNewsForAppV1Get**](#isteamnewsgetnewsforappv1get) | **GET** /ISteamNews/GetNewsForApp/v1 | |
|[**iSteamNewsGetNewsForAppV2Get**](#isteamnewsgetnewsforappv2get) | **GET** /ISteamNews/GetNewsForApp/v2 | |

# **iSteamNewsGetNewsForAppV1Get**
> iSteamNewsGetNewsForAppV1Get()


### Example

```typescript
import {
    ISteamNewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamNewsApi(configuration);

let appid: number; //AppID to retrieve news for (default to undefined)
let maxlength: number; //Maximum length for the content to return, if this is 0 the full content is returned, if it\'s less then a blurb is generated to fit. (optional) (default to undefined)
let enddate: number; //Retrieve posts earlier than this date (unix epoch timestamp) (optional) (default to undefined)
let count: number; //# of posts to retrieve (default 20) (optional) (default to undefined)
let tags: string; //Comma-separated list of tags to filter by (e.g. \'patchnodes\') (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamNewsGetNewsForAppV1Get(
    appid,
    maxlength,
    enddate,
    count,
    tags,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | AppID to retrieve news for | defaults to undefined|
| **maxlength** | [**number**] | Maximum length for the content to return, if this is 0 the full content is returned, if it\&#39;s less then a blurb is generated to fit. | (optional) defaults to undefined|
| **enddate** | [**number**] | Retrieve posts earlier than this date (unix epoch timestamp) | (optional) defaults to undefined|
| **count** | [**number**] | # of posts to retrieve (default 20) | (optional) defaults to undefined|
| **tags** | [**string**] | Comma-separated list of tags to filter by (e.g. \&#39;patchnodes\&#39;) | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **iSteamNewsGetNewsForAppV2Get**
> iSteamNewsGetNewsForAppV2Get()


### Example

```typescript
import {
    ISteamNewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamNewsApi(configuration);

let appid: number; //AppID to retrieve news for (default to undefined)
let maxlength: number; //Maximum length for the content to return, if this is 0 the full content is returned, if it\'s less then a blurb is generated to fit. (optional) (default to undefined)
let enddate: number; //Retrieve posts earlier than this date (unix epoch timestamp) (optional) (default to undefined)
let count: number; //# of posts to retrieve (default 20) (optional) (default to undefined)
let feeds: string; //Comma-separated list of feed names to return news for (optional) (default to undefined)
let tags: string; //Comma-separated list of tags to filter by (e.g. \'patchnodes\') (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamNewsGetNewsForAppV2Get(
    appid,
    maxlength,
    enddate,
    count,
    feeds,
    tags,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | AppID to retrieve news for | defaults to undefined|
| **maxlength** | [**number**] | Maximum length for the content to return, if this is 0 the full content is returned, if it\&#39;s less then a blurb is generated to fit. | (optional) defaults to undefined|
| **enddate** | [**number**] | Retrieve posts earlier than this date (unix epoch timestamp) | (optional) defaults to undefined|
| **count** | [**number**] | # of posts to retrieve (default 20) | (optional) defaults to undefined|
| **feeds** | [**string**] | Comma-separated list of feed names to return news for | (optional) defaults to undefined|
| **tags** | [**string**] | Comma-separated list of tags to filter by (e.g. \&#39;patchnodes\&#39;) | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

