# ICSGOPlayersApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iCSGOPlayers730GetNextMatchSharingCodeV1Get**](#icsgoplayers730getnextmatchsharingcodev1get) | **GET** /ICSGOPlayers_730/GetNextMatchSharingCode/v1 | |

# **iCSGOPlayers730GetNextMatchSharingCodeV1Get**
> iCSGOPlayers730GetNextMatchSharingCodeV1Get()


### Example

```typescript
import {
    ICSGOPlayersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOPlayersApi(configuration);

let steamid: number; //The SteamID of the user (default to undefined)
let steamidkey: string; //Authentication obtained from the SteamID (default to undefined)
let knowncode: string; //Previously known match sharing code obtained from the SteamID (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOPlayers730GetNextMatchSharingCodeV1Get(
    steamid,
    steamidkey,
    knowncode,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The SteamID of the user | defaults to undefined|
| **steamidkey** | [**string**] | Authentication obtained from the SteamID | defaults to undefined|
| **knowncode** | [**string**] | Previously known match sharing code obtained from the SteamID | defaults to undefined|
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

