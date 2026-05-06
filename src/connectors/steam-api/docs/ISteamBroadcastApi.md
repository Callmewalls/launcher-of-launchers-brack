# ISteamBroadcastApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamBroadcastViewerHeartbeatV1Get**](#isteambroadcastviewerheartbeatv1get) | **GET** /ISteamBroadcast/ViewerHeartbeat/v1 | |

# **iSteamBroadcastViewerHeartbeatV1Get**
> iSteamBroadcastViewerHeartbeatV1Get()


### Example

```typescript
import {
    ISteamBroadcastApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamBroadcastApi(configuration);

let steamid: number; //Steam ID of the broadcaster (default to undefined)
let sessionid: number; //Broadcast Session ID (default to undefined)
let token: number; //Viewer token (default to undefined)
let stream: number; //video stream representation watching (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamBroadcastViewerHeartbeatV1Get(
    steamid,
    sessionid,
    token,
    stream,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | Steam ID of the broadcaster | defaults to undefined|
| **sessionid** | [**number**] | Broadcast Session ID | defaults to undefined|
| **token** | [**number**] | Viewer token | defaults to undefined|
| **stream** | [**number**] | video stream representation watching | (optional) defaults to undefined|
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

