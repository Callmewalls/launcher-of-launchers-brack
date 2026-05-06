# IPlayerServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iPlayerServiceGetBadgesV1Get**](#iplayerservicegetbadgesv1get) | **GET** /IPlayerService/GetBadges/v1 | |
|[**iPlayerServiceGetCommunityBadgeProgressV1Get**](#iplayerservicegetcommunitybadgeprogressv1get) | **GET** /IPlayerService/GetCommunityBadgeProgress/v1 | |
|[**iPlayerServiceGetOwnedGamesV1Get**](#iplayerservicegetownedgamesv1get) | **GET** /IPlayerService/GetOwnedGames/v1 | |
|[**iPlayerServiceGetRecentlyPlayedGamesV1Get**](#iplayerservicegetrecentlyplayedgamesv1get) | **GET** /IPlayerService/GetRecentlyPlayedGames/v1 | |
|[**iPlayerServiceGetSteamLevelV1Get**](#iplayerservicegetsteamlevelv1get) | **GET** /IPlayerService/GetSteamLevel/v1 | |
|[**iPlayerServiceIsPlayingSharedGameV1Get**](#iplayerserviceisplayingsharedgamev1get) | **GET** /IPlayerService/IsPlayingSharedGame/v1 | |
|[**iPlayerServiceRecordOfflinePlaytimeV1Post**](#iplayerservicerecordofflineplaytimev1post) | **POST** /IPlayerService/RecordOfflinePlaytime/v1 | |

# **iPlayerServiceGetBadgesV1Get**
> iPlayerServiceGetBadgesV1Get()


### Example

```typescript
import {
    IPlayerServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPlayerServiceApi(configuration);

let steamid: number; //(Required) The player we\'re asking about (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPlayerServiceGetBadgesV1Get(
    steamid,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) The player we\&#39;re asking about | (optional) defaults to undefined|
| **inputJson** | [**string**] | An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
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

# **iPlayerServiceGetCommunityBadgeProgressV1Get**
> iPlayerServiceGetCommunityBadgeProgressV1Get()


### Example

```typescript
import {
    IPlayerServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPlayerServiceApi(configuration);

let steamid: number; //(Required) The player we\'re asking about (optional) (default to undefined)
let badgeid: number; //(Required) The badge we\'re asking about (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPlayerServiceGetCommunityBadgeProgressV1Get(
    steamid,
    badgeid,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) The player we\&#39;re asking about | (optional) defaults to undefined|
| **badgeid** | [**number**] | (Required) The badge we\&#39;re asking about | (optional) defaults to undefined|
| **inputJson** | [**string**] | An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
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

# **iPlayerServiceGetOwnedGamesV1Get**
> iPlayerServiceGetOwnedGamesV1Get()


### Example

```typescript
import {
    IPlayerServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPlayerServiceApi(configuration);

let steamid: number; //(Required) The player we\'re asking about (optional) (default to undefined)
let includeAppinfo: boolean; //(Required) true if we want additional details (name, icon) about each game (optional) (default to undefined)
let includePlayedFreeGames: boolean; //(Required) Free games are excluded by default.  If this is set, free games the user has played will be returned. (optional) (default to undefined)
let appidsFilter: number; //(Required) if set, restricts result set to the passed in apps (optional) (default to undefined)
let includeFreeSub: boolean; //(Required) Some games are in the free sub, which are excluded by default. (optional) (default to undefined)
let skipUnvettedApps: boolean; //if set, skip unvetted store apps (optional) (default to undefined)
let language: string; //(Required) Will return appinfo in this language (optional) (default to undefined)
let includeExtendedAppinfo: boolean; //(Required) true if we want even more details (capsule, sortas, and capabilities) about each game.  include_appinfo must also be true. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPlayerServiceGetOwnedGamesV1Get(
    steamid,
    includeAppinfo,
    includePlayedFreeGames,
    appidsFilter,
    includeFreeSub,
    skipUnvettedApps,
    language,
    includeExtendedAppinfo,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) The player we\&#39;re asking about | (optional) defaults to undefined|
| **includeAppinfo** | [**boolean**] | (Required) true if we want additional details (name, icon) about each game | (optional) defaults to undefined|
| **includePlayedFreeGames** | [**boolean**] | (Required) Free games are excluded by default.  If this is set, free games the user has played will be returned. | (optional) defaults to undefined|
| **appidsFilter** | [**number**] | (Required) if set, restricts result set to the passed in apps | (optional) defaults to undefined|
| **includeFreeSub** | [**boolean**] | (Required) Some games are in the free sub, which are excluded by default. | (optional) defaults to undefined|
| **skipUnvettedApps** | [**boolean**] | if set, skip unvetted store apps | (optional) defaults to undefined|
| **language** | [**string**] | (Required) Will return appinfo in this language | (optional) defaults to undefined|
| **includeExtendedAppinfo** | [**boolean**] | (Required) true if we want even more details (capsule, sortas, and capabilities) about each game.  include_appinfo must also be true. | (optional) defaults to undefined|
| **inputJson** | [**string**] | An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
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

# **iPlayerServiceGetRecentlyPlayedGamesV1Get**
> iPlayerServiceGetRecentlyPlayedGamesV1Get()


### Example

```typescript
import {
    IPlayerServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPlayerServiceApi(configuration);

let steamid: number; //(Required) The player we\'re asking about (optional) (default to undefined)
let count: number; //(Required) The number of games to return (0/unset: all) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPlayerServiceGetRecentlyPlayedGamesV1Get(
    steamid,
    count,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) The player we\&#39;re asking about | (optional) defaults to undefined|
| **count** | [**number**] | (Required) The number of games to return (0/unset: all) | (optional) defaults to undefined|
| **inputJson** | [**string**] | An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
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

# **iPlayerServiceGetSteamLevelV1Get**
> iPlayerServiceGetSteamLevelV1Get()


### Example

```typescript
import {
    IPlayerServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPlayerServiceApi(configuration);

let steamid: number; //(Required) The player we\'re asking about (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPlayerServiceGetSteamLevelV1Get(
    steamid,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) The player we\&#39;re asking about | (optional) defaults to undefined|
| **inputJson** | [**string**] | An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
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

# **iPlayerServiceIsPlayingSharedGameV1Get**
> iPlayerServiceIsPlayingSharedGameV1Get()


### Example

```typescript
import {
    IPlayerServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPlayerServiceApi(configuration);

let steamid: number; //(Required) The player we\'re asking about (optional) (default to undefined)
let appidPlaying: number; //(Required) The game player is currently playing (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPlayerServiceIsPlayingSharedGameV1Get(
    steamid,
    appidPlaying,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) The player we\&#39;re asking about | (optional) defaults to undefined|
| **appidPlaying** | [**number**] | (Required) The game player is currently playing | (optional) defaults to undefined|
| **inputJson** | [**string**] | An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
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

# **iPlayerServiceRecordOfflinePlaytimeV1Post**
> iPlayerServiceRecordOfflinePlaytimeV1Post()


### Example

```typescript
import {
    IPlayerServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPlayerServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let steamid: number; //(Required) (optional) (default to undefined)
let ticket: string; //(Required) (optional) (default to undefined)
let playSessions: string; //(Required) (optional) (default to undefined)

const { status, data } = await apiInstance.iPlayerServiceRecordOfflinePlaytimeV1Post(
    inputJson,
    format,
    steamid,
    ticket,
    playSessions
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) | (optional) defaults to undefined|
| **ticket** | [**string**] | (Required) | (optional) defaults to undefined|
| **playSessions** | [**string**] | (Required) | (optional) defaults to undefined|


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

