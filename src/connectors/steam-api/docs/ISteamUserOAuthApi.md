# ISteamUserOAuthApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamUserOAuthGetTokenDetailsV1Get**](#isteamuseroauthgettokendetailsv1get) | **GET** /ISteamUserOAuth/GetTokenDetails/v1 | |

# **iSteamUserOAuthGetTokenDetailsV1Get**
> iSteamUserOAuthGetTokenDetailsV1Get()


### Example

```typescript
import {
    ISteamUserOAuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserOAuthApi(configuration);

let accessToken: string; //OAuth2 token for which to return details (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserOAuthGetTokenDetailsV1Get(
    accessToken,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accessToken** | [**string**] | OAuth2 token for which to return details | defaults to undefined|
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

