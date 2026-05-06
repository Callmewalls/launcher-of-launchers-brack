# ICSGOTournamentsApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iCSGOTournaments730GetTournamentFantasyLineupV1Get**](#icsgotournaments730gettournamentfantasylineupv1get) | **GET** /ICSGOTournaments_730/GetTournamentFantasyLineup/v1 | |
|[**iCSGOTournaments730GetTournamentItemsV1Get**](#icsgotournaments730gettournamentitemsv1get) | **GET** /ICSGOTournaments_730/GetTournamentItems/v1 | |
|[**iCSGOTournaments730GetTournamentLayoutV1Get**](#icsgotournaments730gettournamentlayoutv1get) | **GET** /ICSGOTournaments_730/GetTournamentLayout/v1 | |
|[**iCSGOTournaments730GetTournamentPredictionsV1Get**](#icsgotournaments730gettournamentpredictionsv1get) | **GET** /ICSGOTournaments_730/GetTournamentPredictions/v1 | |
|[**iCSGOTournaments730UploadTournamentFantasyLineupV1Post**](#icsgotournaments730uploadtournamentfantasylineupv1post) | **POST** /ICSGOTournaments_730/UploadTournamentFantasyLineup/v1 | |
|[**iCSGOTournaments730UploadTournamentPredictionsV1Post**](#icsgotournaments730uploadtournamentpredictionsv1post) | **POST** /ICSGOTournaments_730/UploadTournamentPredictions/v1 | |

# **iCSGOTournaments730GetTournamentFantasyLineupV1Get**
> iCSGOTournaments730GetTournamentFantasyLineupV1Get()


### Example

```typescript
import {
    ICSGOTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOTournamentsApi(configuration);

let event: number; //The event ID (default to undefined)
let steamid: number; //The SteamID of the user inventory (default to undefined)
let steamidkey: string; //Authentication obtained from the SteamID (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOTournaments730GetTournamentFantasyLineupV1Get(
    event,
    steamid,
    steamidkey,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **event** | [**number**] | The event ID | defaults to undefined|
| **steamid** | [**number**] | The SteamID of the user inventory | defaults to undefined|
| **steamidkey** | [**string**] | Authentication obtained from the SteamID | defaults to undefined|
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

# **iCSGOTournaments730GetTournamentItemsV1Get**
> iCSGOTournaments730GetTournamentItemsV1Get()


### Example

```typescript
import {
    ICSGOTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOTournamentsApi(configuration);

let event: number; //The event ID (default to undefined)
let steamid: number; //The SteamID of the user inventory (default to undefined)
let steamidkey: string; //Authentication obtained from the SteamID (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOTournaments730GetTournamentItemsV1Get(
    event,
    steamid,
    steamidkey,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **event** | [**number**] | The event ID | defaults to undefined|
| **steamid** | [**number**] | The SteamID of the user inventory | defaults to undefined|
| **steamidkey** | [**string**] | Authentication obtained from the SteamID | defaults to undefined|
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

# **iCSGOTournaments730GetTournamentLayoutV1Get**
> iCSGOTournaments730GetTournamentLayoutV1Get()


### Example

```typescript
import {
    ICSGOTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOTournamentsApi(configuration);

let event: number; //The event ID (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOTournaments730GetTournamentLayoutV1Get(
    event,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **event** | [**number**] | The event ID | defaults to undefined|
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

# **iCSGOTournaments730GetTournamentPredictionsV1Get**
> iCSGOTournaments730GetTournamentPredictionsV1Get()


### Example

```typescript
import {
    ICSGOTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOTournamentsApi(configuration);

let event: number; //The event ID (default to undefined)
let steamid: number; //The SteamID of the user inventory (default to undefined)
let steamidkey: string; //Authentication obtained from the SteamID (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOTournaments730GetTournamentPredictionsV1Get(
    event,
    steamid,
    steamidkey,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **event** | [**number**] | The event ID | defaults to undefined|
| **steamid** | [**number**] | The SteamID of the user inventory | defaults to undefined|
| **steamidkey** | [**string**] | Authentication obtained from the SteamID | defaults to undefined|
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

# **iCSGOTournaments730UploadTournamentFantasyLineupV1Post**
> iCSGOTournaments730UploadTournamentFantasyLineupV1Post()


### Example

```typescript
import {
    ICSGOTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOTournamentsApi(configuration);

let event: number; //The event ID (default to undefined)
let steamid: number; //The SteamID of the user inventory (default to undefined)
let steamidkey: string; //Authentication obtained from the SteamID (default to undefined)
let sectionid: number; //Event section id (default to undefined)
let pickid0: number; //PickID to select for the slot (default to undefined)
let itemid0: number; //ItemID to lock in for the pick (default to undefined)
let pickid1: number; //PickID to select for the slot (default to undefined)
let itemid1: number; //ItemID to lock in for the pick (default to undefined)
let pickid2: number; //PickID to select for the slot (default to undefined)
let itemid2: number; //ItemID to lock in for the pick (default to undefined)
let pickid3: number; //PickID to select for the slot (default to undefined)
let itemid3: number; //ItemID to lock in for the pick (default to undefined)
let pickid4: number; //PickID to select for the slot (default to undefined)
let itemid4: number; //ItemID to lock in for the pick (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOTournaments730UploadTournamentFantasyLineupV1Post(
    event,
    steamid,
    steamidkey,
    sectionid,
    pickid0,
    itemid0,
    pickid1,
    itemid1,
    pickid2,
    itemid2,
    pickid3,
    itemid3,
    pickid4,
    itemid4,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **event** | [**number**] | The event ID | defaults to undefined|
| **steamid** | [**number**] | The SteamID of the user inventory | defaults to undefined|
| **steamidkey** | [**string**] | Authentication obtained from the SteamID | defaults to undefined|
| **sectionid** | [**number**] | Event section id | defaults to undefined|
| **pickid0** | [**number**] | PickID to select for the slot | defaults to undefined|
| **itemid0** | [**number**] | ItemID to lock in for the pick | defaults to undefined|
| **pickid1** | [**number**] | PickID to select for the slot | defaults to undefined|
| **itemid1** | [**number**] | ItemID to lock in for the pick | defaults to undefined|
| **pickid2** | [**number**] | PickID to select for the slot | defaults to undefined|
| **itemid2** | [**number**] | ItemID to lock in for the pick | defaults to undefined|
| **pickid3** | [**number**] | PickID to select for the slot | defaults to undefined|
| **itemid3** | [**number**] | ItemID to lock in for the pick | defaults to undefined|
| **pickid4** | [**number**] | PickID to select for the slot | defaults to undefined|
| **itemid4** | [**number**] | ItemID to lock in for the pick | defaults to undefined|
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

# **iCSGOTournaments730UploadTournamentPredictionsV1Post**
> iCSGOTournaments730UploadTournamentPredictionsV1Post()


### Example

```typescript
import {
    ICSGOTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICSGOTournamentsApi(configuration);

let event: number; //The event ID (default to undefined)
let steamid: number; //The SteamID of the user inventory (default to undefined)
let steamidkey: string; //Authentication obtained from the SteamID (default to undefined)
let sectionid: number; //Event section id (default to undefined)
let groupid: number; //Event group id (default to undefined)
let index: number; //Index in group (default to undefined)
let pickid: number; //Pick ID to select (default to undefined)
let itemid: number; //ItemID to lock in for the pick (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iCSGOTournaments730UploadTournamentPredictionsV1Post(
    event,
    steamid,
    steamidkey,
    sectionid,
    groupid,
    index,
    pickid,
    itemid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **event** | [**number**] | The event ID | defaults to undefined|
| **steamid** | [**number**] | The SteamID of the user inventory | defaults to undefined|
| **steamidkey** | [**string**] | Authentication obtained from the SteamID | defaults to undefined|
| **sectionid** | [**number**] | Event section id | defaults to undefined|
| **groupid** | [**number**] | Event group id | defaults to undefined|
| **index** | [**number**] | Index in group | defaults to undefined|
| **pickid** | [**number**] | Pick ID to select | defaults to undefined|
| **itemid** | [**number**] | ItemID to lock in for the pick | defaults to undefined|
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

