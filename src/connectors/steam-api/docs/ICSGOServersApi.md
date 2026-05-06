# ICSGOServersApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iCSGOServers730GetGameMapsPlaytimeV1Get**](#icsgoservers730getgamemapsplaytimev1get) | **GET** /ICSGOServers_730/GetGameMapsPlaytime/v1 | |
|[**iCSGOServers730GetGameServersStatusV1Get**](#icsgoservers730getgameserversstatusv1get) | **GET** /ICSGOServers_730/GetGameServersStatus/v1 | |

# **iCSGOServers730GetGameMapsPlaytimeV1Get**
> iCSGOServers730GetGameMapsPlaytimeV1Get()


### Example

```typescript
import {
    ICSGOServersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOServersApi(configuration);

let interval: string; //What recent interval is requested, possible values: day, week, month (default to undefined)
let gamemode: string; //What game mode is requested, possible values: competitive, casual (default to undefined)
let mapgroup: string; //What maps are requested, possible values: operation (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOServers730GetGameMapsPlaytimeV1Get(
    interval,
    gamemode,
    mapgroup,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **interval** | [**string**] | What recent interval is requested, possible values: day, week, month | defaults to undefined|
| **gamemode** | [**string**] | What game mode is requested, possible values: competitive, casual | defaults to undefined|
| **mapgroup** | [**string**] | What maps are requested, possible values: operation | defaults to undefined|
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

# **iCSGOServers730GetGameServersStatusV1Get**
> iCSGOServers730GetGameServersStatusV1Get()


### Example

```typescript
import {
    ICSGOServersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOServersApi(configuration);

let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOServers730GetGameServersStatusV1Get(
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

