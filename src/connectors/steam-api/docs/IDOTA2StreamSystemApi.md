# IDOTA2StreamSystemApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iDOTA2StreamSystem570GetBroadcasterInfoV1Get**](#idota2streamsystem570getbroadcasterinfov1get) | **GET** /IDOTA2StreamSystem_570/GetBroadcasterInfo/v1 | |

# **iDOTA2StreamSystem570GetBroadcasterInfoV1Get**
> iDOTA2StreamSystem570GetBroadcasterInfoV1Get()


### Example

```typescript
import {
    IDOTA2StreamSystemApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2StreamSystemApi(configuration);

let broadcasterSteamId: number; //64-bit Steam ID of the broadcaster (default to undefined)
let leagueId: number; //LeagueID to use if we aren\'t in a lobby (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2StreamSystem570GetBroadcasterInfoV1Get(
    broadcasterSteamId,
    leagueId,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **broadcasterSteamId** | [**number**] | 64-bit Steam ID of the broadcaster | defaults to undefined|
| **leagueId** | [**number**] | LeagueID to use if we aren\&#39;t in a lobby | (optional) defaults to undefined|
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

