# IDOTA2MatchApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iDOTA2Match570GetLiveLeagueGamesV1Get**](#idota2match570getliveleaguegamesv1get) | **GET** /IDOTA2Match_570/GetLiveLeagueGames/v1 | |
|[**iDOTA2Match570GetMatchDetailsV1Get**](#idota2match570getmatchdetailsv1get) | **GET** /IDOTA2Match_570/GetMatchDetails/v1 | |
|[**iDOTA2Match570GetMatchHistoryBySequenceNumV1Get**](#idota2match570getmatchhistorybysequencenumv1get) | **GET** /IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1 | |
|[**iDOTA2Match570GetMatchHistoryV1Get**](#idota2match570getmatchhistoryv1get) | **GET** /IDOTA2Match_570/GetMatchHistory/v1 | |
|[**iDOTA2Match570GetTeamInfoByTeamIDV1Get**](#idota2match570getteaminfobyteamidv1get) | **GET** /IDOTA2Match_570/GetTeamInfoByTeamID/v1 | |
|[**iDOTA2Match570GetTopLiveEventGameV1Get**](#idota2match570gettopliveeventgamev1get) | **GET** /IDOTA2Match_570/GetTopLiveEventGame/v1 | |
|[**iDOTA2Match570GetTopLiveGameV1Get**](#idota2match570gettoplivegamev1get) | **GET** /IDOTA2Match_570/GetTopLiveGame/v1 | |
|[**iDOTA2Match570GetTopWeekendTourneyGamesV1Get**](#idota2match570gettopweekendtourneygamesv1get) | **GET** /IDOTA2Match_570/GetTopWeekendTourneyGames/v1 | |
|[**iDOTA2Match570GetTournamentPlayerStatsV1Get**](#idota2match570gettournamentplayerstatsv1get) | **GET** /IDOTA2Match_570/GetTournamentPlayerStats/v1 | |
|[**iDOTA2Match570GetTournamentPlayerStatsV2Get**](#idota2match570gettournamentplayerstatsv2get) | **GET** /IDOTA2Match_570/GetTournamentPlayerStats/v2 | |

# **iDOTA2Match570GetLiveLeagueGamesV1Get**
> iDOTA2Match570GetLiveLeagueGamesV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let leagueId: number; //Only show matches of the specified league id (optional) (default to undefined)
let matchId: number; //Only show matches of the specified match id (optional) (default to undefined)
let dpc: boolean; //Only show matches that are part of the DPC (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetLiveLeagueGamesV1Get(
    leagueId,
    matchId,
    dpc,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **leagueId** | [**number**] | Only show matches of the specified league id | (optional) defaults to undefined|
| **matchId** | [**number**] | Only show matches of the specified match id | (optional) defaults to undefined|
| **dpc** | [**boolean**] | Only show matches that are part of the DPC | (optional) defaults to undefined|
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

# **iDOTA2Match570GetMatchDetailsV1Get**
> iDOTA2Match570GetMatchDetailsV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let matchId: number; //Match id (default to undefined)
let includePersonaNames: boolean; //Include persona names as part of the response (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetMatchDetailsV1Get(
    matchId,
    includePersonaNames,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **matchId** | [**number**] | Match id | defaults to undefined|
| **includePersonaNames** | [**boolean**] | Include persona names as part of the response | (optional) defaults to undefined|
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

# **iDOTA2Match570GetMatchHistoryBySequenceNumV1Get**
> iDOTA2Match570GetMatchHistoryBySequenceNumV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let startAtMatchSeqNum: number; // (optional) (default to undefined)
let matchesRequested: number; // (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetMatchHistoryBySequenceNumV1Get(
    startAtMatchSeqNum,
    matchesRequested,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startAtMatchSeqNum** | [**number**] |  | (optional) defaults to undefined|
| **matchesRequested** | [**number**] |  | (optional) defaults to undefined|
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

# **iDOTA2Match570GetMatchHistoryV1Get**
> iDOTA2Match570GetMatchHistoryV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let heroId: number; //The ID of the hero that must be in the matches being queried (optional) (default to undefined)
let gameMode: number; //Which game mode to return matches for (optional) (default to undefined)
let skill: number; //The average skill range of the match, these can be [1-3] with lower numbers being lower skill. Ignored if an account ID is specified (optional) (default to undefined)
let minPlayers: string; //Minimum number of human players that must be in a match for it to be returned (optional) (default to undefined)
let accountId: string; //An account ID to get matches from. This will fail if the user has their match history hidden (optional) (default to undefined)
let leagueId: string; //The league ID to return games from (optional) (default to undefined)
let startAtMatchId: number; //The minimum match ID to start from (optional) (default to undefined)
let matchesRequested: string; //The number of requested matches to return (maximum 100) (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetMatchHistoryV1Get(
    heroId,
    gameMode,
    skill,
    minPlayers,
    accountId,
    leagueId,
    startAtMatchId,
    matchesRequested,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **heroId** | [**number**] | The ID of the hero that must be in the matches being queried | (optional) defaults to undefined|
| **gameMode** | [**number**] | Which game mode to return matches for | (optional) defaults to undefined|
| **skill** | [**number**] | The average skill range of the match, these can be [1-3] with lower numbers being lower skill. Ignored if an account ID is specified | (optional) defaults to undefined|
| **minPlayers** | [**string**] | Minimum number of human players that must be in a match for it to be returned | (optional) defaults to undefined|
| **accountId** | [**string**] | An account ID to get matches from. This will fail if the user has their match history hidden | (optional) defaults to undefined|
| **leagueId** | [**string**] | The league ID to return games from | (optional) defaults to undefined|
| **startAtMatchId** | [**number**] | The minimum match ID to start from | (optional) defaults to undefined|
| **matchesRequested** | [**string**] | The number of requested matches to return (maximum 100) | (optional) defaults to undefined|
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

# **iDOTA2Match570GetTeamInfoByTeamIDV1Get**
> iDOTA2Match570GetTeamInfoByTeamIDV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let startAtTeamId: number; // (optional) (default to undefined)
let teamsRequested: number; // (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetTeamInfoByTeamIDV1Get(
    startAtTeamId,
    teamsRequested,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startAtTeamId** | [**number**] |  | (optional) defaults to undefined|
| **teamsRequested** | [**number**] |  | (optional) defaults to undefined|
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

# **iDOTA2Match570GetTopLiveEventGameV1Get**
> iDOTA2Match570GetTopLiveEventGameV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let partner: number; //Which partner\'s games to use. (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetTopLiveEventGameV1Get(
    partner,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **partner** | [**number**] | Which partner\&#39;s games to use. | defaults to undefined|
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

# **iDOTA2Match570GetTopLiveGameV1Get**
> iDOTA2Match570GetTopLiveGameV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let partner: number; //Which partner\'s games to use. (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetTopLiveGameV1Get(
    partner,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **partner** | [**number**] | Which partner\&#39;s games to use. | defaults to undefined|
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

# **iDOTA2Match570GetTopWeekendTourneyGamesV1Get**
> iDOTA2Match570GetTopWeekendTourneyGamesV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let partner: number; //Which partner\'s games to use. (default to undefined)
let homeDivision: number; //Prefer matches from this division. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetTopWeekendTourneyGamesV1Get(
    partner,
    homeDivision,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **partner** | [**number**] | Which partner\&#39;s games to use. | defaults to undefined|
| **homeDivision** | [**number**] | Prefer matches from this division. | (optional) defaults to undefined|
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

# **iDOTA2Match570GetTournamentPlayerStatsV1Get**
> iDOTA2Match570GetTournamentPlayerStatsV1Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let accountId: string; // (default to undefined)
let leagueId: string; // (optional) (default to undefined)
let heroId: string; // (optional) (default to undefined)
let timeFrame: string; // (optional) (default to undefined)
let matchId: number; // (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetTournamentPlayerStatsV1Get(
    accountId,
    leagueId,
    heroId,
    timeFrame,
    matchId,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accountId** | [**string**] |  | defaults to undefined|
| **leagueId** | [**string**] |  | (optional) defaults to undefined|
| **heroId** | [**string**] |  | (optional) defaults to undefined|
| **timeFrame** | [**string**] |  | (optional) defaults to undefined|
| **matchId** | [**number**] |  | (optional) defaults to undefined|
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

# **iDOTA2Match570GetTournamentPlayerStatsV2Get**
> iDOTA2Match570GetTournamentPlayerStatsV2Get()


### Example

```typescript
import {
    IDOTA2MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IDOTA2MatchApi(configuration);

let accountId: string; // (default to undefined)
let leagueId: string; // (optional) (default to undefined)
let heroId: string; // (optional) (default to undefined)
let timeFrame: string; // (optional) (default to undefined)
let matchId: number; // (optional) (default to undefined)
let phaseId: number; // (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iDOTA2Match570GetTournamentPlayerStatsV2Get(
    accountId,
    leagueId,
    heroId,
    timeFrame,
    matchId,
    phaseId,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accountId** | [**string**] |  | defaults to undefined|
| **leagueId** | [**string**] |  | (optional) defaults to undefined|
| **heroId** | [**string**] |  | (optional) defaults to undefined|
| **timeFrame** | [**string**] |  | (optional) defaults to undefined|
| **matchId** | [**number**] |  | (optional) defaults to undefined|
| **phaseId** | [**number**] |  | (optional) defaults to undefined|
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

