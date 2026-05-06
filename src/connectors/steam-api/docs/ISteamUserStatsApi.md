# ISteamUserStatsApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamUserStatsGetGlobalAchievementPercentagesForAppV1Get**](#isteamuserstatsgetglobalachievementpercentagesforappv1get) | **GET** /ISteamUserStats/GetGlobalAchievementPercentagesForApp/v1 | |
|[**iSteamUserStatsGetGlobalAchievementPercentagesForAppV2Get**](#isteamuserstatsgetglobalachievementpercentagesforappv2get) | **GET** /ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2 | |
|[**iSteamUserStatsGetGlobalStatsForGameV1Get**](#isteamuserstatsgetglobalstatsforgamev1get) | **GET** /ISteamUserStats/GetGlobalStatsForGame/v1 | |
|[**iSteamUserStatsGetNumberOfCurrentPlayersV1Get**](#isteamuserstatsgetnumberofcurrentplayersv1get) | **GET** /ISteamUserStats/GetNumberOfCurrentPlayers/v1 | |
|[**iSteamUserStatsGetPlayerAchievementsV1Get**](#isteamuserstatsgetplayerachievementsv1get) | **GET** /ISteamUserStats/GetPlayerAchievements/v1 | |
|[**iSteamUserStatsGetSchemaForGameV1Get**](#isteamuserstatsgetschemaforgamev1get) | **GET** /ISteamUserStats/GetSchemaForGame/v1 | |
|[**iSteamUserStatsGetSchemaForGameV2Get**](#isteamuserstatsgetschemaforgamev2get) | **GET** /ISteamUserStats/GetSchemaForGame/v2 | |
|[**iSteamUserStatsGetUserStatsForGameV1Get**](#isteamuserstatsgetuserstatsforgamev1get) | **GET** /ISteamUserStats/GetUserStatsForGame/v1 | |
|[**iSteamUserStatsGetUserStatsForGameV2Get**](#isteamuserstatsgetuserstatsforgamev2get) | **GET** /ISteamUserStats/GetUserStatsForGame/v2 | |

# **iSteamUserStatsGetGlobalAchievementPercentagesForAppV1Get**
> iSteamUserStatsGetGlobalAchievementPercentagesForAppV1Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let gameid: number; //GameID to retrieve the achievement percentages for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetGlobalAchievementPercentagesForAppV1Get(
    gameid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gameid** | [**number**] | GameID to retrieve the achievement percentages for | defaults to undefined|
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

# **iSteamUserStatsGetGlobalAchievementPercentagesForAppV2Get**
> iSteamUserStatsGetGlobalAchievementPercentagesForAppV2Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let gameid: number; //GameID to retrieve the achievement percentages for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetGlobalAchievementPercentagesForAppV2Get(
    gameid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gameid** | [**number**] | GameID to retrieve the achievement percentages for | defaults to undefined|
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

# **iSteamUserStatsGetGlobalStatsForGameV1Get**
> iSteamUserStatsGetGlobalStatsForGameV1Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let appid: number; //AppID that we\'re getting global stats for (default to undefined)
let count: number; //Number of stats get data for (default to undefined)
let name0: string; //Names of stat to get data for<br>Note: this is an <a href=https://partner.steamgames.com/doc/webapi_overview#2>array parameter</a> (default to undefined)
let startdate: number; //Start date for daily totals (unix epoch timestamp) (optional) (default to undefined)
let enddate: number; //End date for daily totals (unix epoch timestamp) (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetGlobalStatsForGameV1Get(
    appid,
    count,
    name0,
    startdate,
    enddate,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | AppID that we\&#39;re getting global stats for | defaults to undefined|
| **count** | [**number**] | Number of stats get data for | defaults to undefined|
| **name0** | [**string**] | Names of stat to get data for&lt;br&gt;Note: this is an &lt;a href&#x3D;https://partner.steamgames.com/doc/webapi_overview#2&gt;array parameter&lt;/a&gt; | defaults to undefined|
| **startdate** | [**number**] | Start date for daily totals (unix epoch timestamp) | (optional) defaults to undefined|
| **enddate** | [**number**] | End date for daily totals (unix epoch timestamp) | (optional) defaults to undefined|
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

# **iSteamUserStatsGetNumberOfCurrentPlayersV1Get**
> iSteamUserStatsGetNumberOfCurrentPlayersV1Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let appid: number; //AppID that we\'re getting user count for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetNumberOfCurrentPlayersV1Get(
    appid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | AppID that we\&#39;re getting user count for | defaults to undefined|
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

# **iSteamUserStatsGetPlayerAchievementsV1Get**
> iSteamUserStatsGetPlayerAchievementsV1Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let steamid: number; //SteamID of user (default to undefined)
let appid: number; //AppID to get achievements for (default to undefined)
let l: string; //Language to return strings for (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetPlayerAchievementsV1Get(
    steamid,
    appid,
    l,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | SteamID of user | defaults to undefined|
| **appid** | [**number**] | AppID to get achievements for | defaults to undefined|
| **l** | [**string**] | Language to return strings for | (optional) defaults to undefined|
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

# **iSteamUserStatsGetSchemaForGameV1Get**
> iSteamUserStatsGetSchemaForGameV1Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let appid: number; //appid of game (default to undefined)
let l: string; //localized langauge to return (english, french, etc.) (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetSchemaForGameV1Get(
    appid,
    l,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | appid of game | defaults to undefined|
| **l** | [**string**] | localized langauge to return (english, french, etc.) | (optional) defaults to undefined|
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

# **iSteamUserStatsGetSchemaForGameV2Get**
> iSteamUserStatsGetSchemaForGameV2Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let appid: number; //appid of game (default to undefined)
let l: string; //localized language to return (english, french, etc.) (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetSchemaForGameV2Get(
    appid,
    l,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | appid of game | defaults to undefined|
| **l** | [**string**] | localized language to return (english, french, etc.) | (optional) defaults to undefined|
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

# **iSteamUserStatsGetUserStatsForGameV1Get**
> iSteamUserStatsGetUserStatsForGameV1Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let steamid: number; //SteamID of user (default to undefined)
let appid: number; //appid of game (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetUserStatsForGameV1Get(
    steamid,
    appid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | SteamID of user | defaults to undefined|
| **appid** | [**number**] | appid of game | defaults to undefined|
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

# **iSteamUserStatsGetUserStatsForGameV2Get**
> iSteamUserStatsGetUserStatsForGameV2Get()


### Example

```typescript
import {
    ISteamUserStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamUserStatsApi(configuration);

let steamid: number; //SteamID of user (default to undefined)
let appid: number; //appid of game (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamUserStatsGetUserStatsForGameV2Get(
    steamid,
    appid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | SteamID of user | defaults to undefined|
| **appid** | [**number**] | appid of game | defaults to undefined|
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

