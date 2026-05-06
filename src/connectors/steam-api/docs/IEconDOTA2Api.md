# IEconDOTA2Api

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iEconDOTA2570GetEventStatsForAccountV1Get**](#iecondota2570geteventstatsforaccountv1get) | **GET** /IEconDOTA2_570/GetEventStatsForAccount/v1 | |
|[**iEconDOTA2570GetHeroesV1Get**](#iecondota2570getheroesv1get) | **GET** /IEconDOTA2_570/GetHeroes/v1 | |
|[**iEconDOTA2570GetItemCreatorsV1Get**](#iecondota2570getitemcreatorsv1get) | **GET** /IEconDOTA2_570/GetItemCreators/v1 | |
|[**iEconDOTA2570GetItemWorkshopPublishedFileIDsV1Get**](#iecondota2570getitemworkshoppublishedfileidsv1get) | **GET** /IEconDOTA2_570/GetItemWorkshopPublishedFileIDs/v1 | |
|[**iEconDOTA2570GetRaritiesV1Get**](#iecondota2570getraritiesv1get) | **GET** /IEconDOTA2_570/GetRarities/v1 | |
|[**iEconDOTA2570GetTournamentPrizePoolV1Get**](#iecondota2570gettournamentprizepoolv1get) | **GET** /IEconDOTA2_570/GetTournamentPrizePool/v1 | |

# **iEconDOTA2570GetEventStatsForAccountV1Get**
> iEconDOTA2570GetEventStatsForAccountV1Get()


### Example

```typescript
import {
    IEconDOTA2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconDOTA2Api(configuration);

let eventid: number; //The Event ID of the event you\'re looking for. (default to undefined)
let accountid: number; //The account ID to look up. (default to undefined)
let language: string; //The language to provide hero names in. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconDOTA2570GetEventStatsForAccountV1Get(
    eventid,
    accountid,
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventid** | [**number**] | The Event ID of the event you\&#39;re looking for. | defaults to undefined|
| **accountid** | [**number**] | The account ID to look up. | defaults to undefined|
| **language** | [**string**] | The language to provide hero names in. | (optional) defaults to undefined|
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

# **iEconDOTA2570GetHeroesV1Get**
> iEconDOTA2570GetHeroesV1Get()


### Example

```typescript
import {
    IEconDOTA2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconDOTA2Api(configuration);

let language: string; //The language to provide hero names in. (optional) (default to undefined)
let itemizedonly: boolean; //Return a list of itemized heroes only. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconDOTA2570GetHeroesV1Get(
    language,
    itemizedonly,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to provide hero names in. | (optional) defaults to undefined|
| **itemizedonly** | [**boolean**] | Return a list of itemized heroes only. | (optional) defaults to undefined|
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

# **iEconDOTA2570GetItemCreatorsV1Get**
> iEconDOTA2570GetItemCreatorsV1Get()


### Example

```typescript
import {
    IEconDOTA2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconDOTA2Api(configuration);

let itemdef: number; //The item definition to get creator information for. (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconDOTA2570GetItemCreatorsV1Get(
    itemdef,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemdef** | [**number**] | The item definition to get creator information for. | defaults to undefined|
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

# **iEconDOTA2570GetItemWorkshopPublishedFileIDsV1Get**
> iEconDOTA2570GetItemWorkshopPublishedFileIDsV1Get()


### Example

```typescript
import {
    IEconDOTA2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconDOTA2Api(configuration);

let itemdef: number; //The item definition to get published file ids for. (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconDOTA2570GetItemWorkshopPublishedFileIDsV1Get(
    itemdef,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemdef** | [**number**] | The item definition to get published file ids for. | defaults to undefined|
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

# **iEconDOTA2570GetRaritiesV1Get**
> iEconDOTA2570GetRaritiesV1Get()


### Example

```typescript
import {
    IEconDOTA2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconDOTA2Api(configuration);

let language: string; //The language to provide rarity names in. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconDOTA2570GetRaritiesV1Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to provide rarity names in. | (optional) defaults to undefined|
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

# **iEconDOTA2570GetTournamentPrizePoolV1Get**
> iEconDOTA2570GetTournamentPrizePoolV1Get()


### Example

```typescript
import {
    IEconDOTA2Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconDOTA2Api(configuration);

let leagueid: number; //The ID of the league to get the prize pool of (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconDOTA2570GetTournamentPrizePoolV1Get(
    leagueid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **leagueid** | [**number**] | The ID of the league to get the prize pool of | (optional) defaults to undefined|
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

