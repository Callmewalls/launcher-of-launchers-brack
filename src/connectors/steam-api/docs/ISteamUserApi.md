# ISteamUserApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamUserGetFriendListV1Get**](#isteamusergetfriendlistv1get) | **GET** /ISteamUser/GetFriendList/v1 | |
|[**iSteamUserGetPlayerBansV1Get**](#isteamusergetplayerbansv1get) | **GET** /ISteamUser/GetPlayerBans/v1 | |
|[**iSteamUserGetPlayerSummariesV1Get**](#isteamusergetplayersummariesv1get) | **GET** /ISteamUser/GetPlayerSummaries/v1 | |
|[**iSteamUserGetPlayerSummariesV2Get**](#isteamusergetplayersummariesv2get) | **GET** /ISteamUser/GetPlayerSummaries/v2 | |
|[**iSteamUserGetUserGroupListV1Get**](#isteamusergetusergrouplistv1get) | **GET** /ISteamUser/GetUserGroupList/v1 | |
|[**iSteamUserResolveVanityURLV1Get**](#isteamuserresolvevanityurlv1get) | **GET** /ISteamUser/ResolveVanityURL/v1 | |

# **iSteamUserGetFriendListV1Get**
> iSteamUserGetFriendListV1Get()


### Example

```typescript
import {
    ISteamUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserApi(configuration);

let steamid: number; //SteamID of user (default to undefined)
let relationship: string; //relationship type (ex: friend) (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserGetFriendListV1Get(
    steamid,
    relationship,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | SteamID of user | defaults to undefined|
| **relationship** | [**string**] | relationship type (ex: friend) | (optional) defaults to undefined|
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

# **iSteamUserGetPlayerBansV1Get**
> iSteamUserGetPlayerBansV1Get()


### Example

```typescript
import {
    ISteamUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserApi(configuration);

let steamids: string; //Comma-delimited list of SteamIDs (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserGetPlayerBansV1Get(
    steamids,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamids** | [**string**] | Comma-delimited list of SteamIDs | defaults to undefined|
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

# **iSteamUserGetPlayerSummariesV1Get**
> iSteamUserGetPlayerSummariesV1Get()


### Example

```typescript
import {
    ISteamUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserApi(configuration);

let steamids: string; //Comma-delimited list of SteamIDs (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserGetPlayerSummariesV1Get(
    steamids,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamids** | [**string**] | Comma-delimited list of SteamIDs | defaults to undefined|
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

# **iSteamUserGetPlayerSummariesV2Get**
> iSteamUserGetPlayerSummariesV2Get()


### Example

```typescript
import {
    ISteamUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserApi(configuration);

let steamids: string; //Comma-delimited list of SteamIDs (max: 100) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserGetPlayerSummariesV2Get(
    steamids,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamids** | [**string**] | Comma-delimited list of SteamIDs (max: 100) | defaults to undefined|
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

# **iSteamUserGetUserGroupListV1Get**
> iSteamUserGetUserGroupListV1Get()


### Example

```typescript
import {
    ISteamUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserApi(configuration);

let steamid: number; //SteamID of user (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserGetUserGroupListV1Get(
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | SteamID of user | defaults to undefined|
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

# **iSteamUserResolveVanityURLV1Get**
> iSteamUserResolveVanityURLV1Get()


### Example

```typescript
import {
    ISteamUserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserApi(configuration);

let vanityurl: string; //The vanity URL to get a SteamID for (default to undefined)
let urlType: number; //The type of vanity URL. 1 (default): Individual profile, 2: Group, 3: Official game group (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserResolveVanityURLV1Get(
    vanityurl,
    urlType,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vanityurl** | [**string**] | The vanity URL to get a SteamID for | defaults to undefined|
| **urlType** | [**number**] | The type of vanity URL. 1 (default): Individual profile, 2: Group, 3: Official game group | (optional) defaults to undefined|
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

