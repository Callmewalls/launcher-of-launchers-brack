# IDOTA2TicketApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iDOTA2Ticket570GetSteamIDForBadgeIDV1Get**](#idota2ticket570getsteamidforbadgeidv1get) | **GET** /IDOTA2Ticket_570/GetSteamIDForBadgeID/v1 | |
|[**iDOTA2Ticket570SetSteamAccountPurchasedV1Post**](#idota2ticket570setsteamaccountpurchasedv1post) | **POST** /IDOTA2Ticket_570/SetSteamAccountPurchased/v1 | |
|[**iDOTA2Ticket570SteamAccountValidForBadgeTypeV1Get**](#idota2ticket570steamaccountvalidforbadgetypev1get) | **GET** /IDOTA2Ticket_570/SteamAccountValidForBadgeType/v1 | |

# **iDOTA2Ticket570GetSteamIDForBadgeIDV1Get**
> iDOTA2Ticket570GetSteamIDForBadgeIDV1Get()


### Example

```typescript
import {
    IDOTA2TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2TicketApi(configuration);

let badgeID: string; //The badge ID (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Ticket570GetSteamIDForBadgeIDV1Get(
    badgeID,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **badgeID** | [**string**] | The badge ID | defaults to undefined|
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

# **iDOTA2Ticket570SetSteamAccountPurchasedV1Post**
> iDOTA2Ticket570SetSteamAccountPurchasedV1Post()


### Example

```typescript
import {
    IDOTA2TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2TicketApi(configuration);

let steamid: number; //The 64-bit Steam ID (default to undefined)
let badgeType: number; //Badge Type (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Ticket570SetSteamAccountPurchasedV1Post(
    steamid,
    badgeType,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The 64-bit Steam ID | defaults to undefined|
| **badgeType** | [**number**] | Badge Type | defaults to undefined|
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

# **iDOTA2Ticket570SteamAccountValidForBadgeTypeV1Get**
> iDOTA2Ticket570SteamAccountValidForBadgeTypeV1Get()


### Example

```typescript
import {
    IDOTA2TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2TicketApi(configuration);

let steamid: number; //The 64-bit Steam ID (default to undefined)
let validBadgeType1: number; //Valid Badge Type 1 (default to undefined)
let validBadgeType2: number; //Valid Badge Type 2 (default to undefined)
let validBadgeType3: number; //Valid Badge Type 3 (default to undefined)
let validBadgeType4: number; //Valid Badge Type 4 (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Ticket570SteamAccountValidForBadgeTypeV1Get(
    steamid,
    validBadgeType1,
    validBadgeType2,
    validBadgeType3,
    validBadgeType4,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The 64-bit Steam ID | defaults to undefined|
| **validBadgeType1** | [**number**] | Valid Badge Type 1 | defaults to undefined|
| **validBadgeType2** | [**number**] | Valid Badge Type 2 | defaults to undefined|
| **validBadgeType3** | [**number**] | Valid Badge Type 3 | defaults to undefined|
| **validBadgeType4** | [**number**] | Valid Badge Type 4 | (optional) defaults to undefined|
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

