# ISteamRemoteStorageApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamRemoteStorageGetCollectionDetailsV1Post**](#isteamremotestoragegetcollectiondetailsv1post) | **POST** /ISteamRemoteStorage/GetCollectionDetails/v1 | |
|[**iSteamRemoteStorageGetPublishedFileDetailsV1Post**](#isteamremotestoragegetpublishedfiledetailsv1post) | **POST** /ISteamRemoteStorage/GetPublishedFileDetails/v1 | |
|[**iSteamRemoteStorageGetUGCFileDetailsV1Get**](#isteamremotestoragegetugcfiledetailsv1get) | **GET** /ISteamRemoteStorage/GetUGCFileDetails/v1 | |

# **iSteamRemoteStorageGetCollectionDetailsV1Post**
> iSteamRemoteStorageGetCollectionDetailsV1Post()


### Example

```typescript
import {
    ISteamRemoteStorageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamRemoteStorageApi(configuration);

let collectioncount: number; //Number of collections being requested (default to undefined)
let publishedfileids0: number; //collection ids to get the details for<br>Note: this is an <a href=https://partner.steamgames.com/doc/webapi_overview#2>array parameter</a> (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamRemoteStorageGetCollectionDetailsV1Post(
    collectioncount,
    publishedfileids0,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **collectioncount** | [**number**] | Number of collections being requested | defaults to undefined|
| **publishedfileids0** | [**number**] | collection ids to get the details for&lt;br&gt;Note: this is an &lt;a href&#x3D;https://partner.steamgames.com/doc/webapi_overview#2&gt;array parameter&lt;/a&gt; | defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **iSteamRemoteStorageGetPublishedFileDetailsV1Post**
> iSteamRemoteStorageGetPublishedFileDetailsV1Post()


### Example

```typescript
import {
    ISteamRemoteStorageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamRemoteStorageApi(configuration);

let itemcount: number; //Number of items being requested (default to undefined)
let publishedfileids0: number; //published file id to look up<br>Note: this is an <a href=https://partner.steamgames.com/doc/webapi_overview#2>array parameter</a> (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamRemoteStorageGetPublishedFileDetailsV1Post(
    itemcount,
    publishedfileids0,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemcount** | [**number**] | Number of items being requested | defaults to undefined|
| **publishedfileids0** | [**number**] | published file id to look up&lt;br&gt;Note: this is an &lt;a href&#x3D;https://partner.steamgames.com/doc/webapi_overview#2&gt;array parameter&lt;/a&gt; | defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **iSteamRemoteStorageGetUGCFileDetailsV1Get**
> iSteamRemoteStorageGetUGCFileDetailsV1Get()


### Example

```typescript
import {
    ISteamRemoteStorageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamRemoteStorageApi(configuration);

let ugcid: number; //ID of UGC file to get info for (default to undefined)
let appid: number; //appID of product (default to undefined)
let steamid: number; //If specified, only returns details if the file is owned by the SteamID specified (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamRemoteStorageGetUGCFileDetailsV1Get(
    ugcid,
    appid,
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ugcid** | [**number**] | ID of UGC file to get info for | defaults to undefined|
| **appid** | [**number**] | appID of product | defaults to undefined|
| **steamid** | [**number**] | If specified, only returns details if the file is owned by the SteamID specified | (optional) defaults to undefined|
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

