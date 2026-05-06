# IGameNotificationsServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iGameNotificationsServiceUserCreateSessionV1Post**](#igamenotificationsserviceusercreatesessionv1post) | **POST** /IGameNotificationsService/UserCreateSession/v1 | |
|[**iGameNotificationsServiceUserDeleteSessionV1Post**](#igamenotificationsserviceuserdeletesessionv1post) | **POST** /IGameNotificationsService/UserDeleteSession/v1 | |
|[**iGameNotificationsServiceUserUpdateSessionV1Post**](#igamenotificationsserviceuserupdatesessionv1post) | **POST** /IGameNotificationsService/UserUpdateSession/v1 | |

# **iGameNotificationsServiceUserCreateSessionV1Post**
> iGameNotificationsServiceUserCreateSessionV1Post()


### Example

```typescript
import {
    IGameNotificationsServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameNotificationsServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let appid: number; //(Required) The appid to create the session for. (optional) (default to undefined)
let context: number; //(Required) Game-specified context value the game can used to associate the session with some object on their backend. (optional) (default to undefined)
let title: string; //(Required) The title of the session to be displayed within each user\\\'s list of sessions. (optional) (default to undefined)
let users: string; //(Required) The initial state of all users in the session. (optional) (default to undefined)
let steamid: number; //(Optional) steamid to make the request on behalf of -- if specified, the user must be in the session and all users being added to the session must be friends with the user. (optional) (default to undefined)

const { status, data } = await apiInstance.iGameNotificationsServiceUserCreateSessionV1Post(
    inputJson,
    format,
    appid,
    context,
    title,
    users,
    steamid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) The appid to create the session for. | (optional) defaults to undefined|
| **context** | [**number**] | (Required) Game-specified context value the game can used to associate the session with some object on their backend. | (optional) defaults to undefined|
| **title** | [**string**] | (Required) The title of the session to be displayed within each user\\\&#39;s list of sessions. | (optional) defaults to undefined|
| **users** | [**string**] | (Required) The initial state of all users in the session. | (optional) defaults to undefined|
| **steamid** | [**number**] | (Optional) steamid to make the request on behalf of -- if specified, the user must be in the session and all users being added to the session must be friends with the user. | (optional) defaults to undefined|


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

# **iGameNotificationsServiceUserDeleteSessionV1Post**
> iGameNotificationsServiceUserDeleteSessionV1Post()


### Example

```typescript
import {
    IGameNotificationsServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameNotificationsServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let sessionid: number; //(Required) The sessionid to delete. (optional) (default to undefined)
let appid: number; //(Required) The appid of the session to delete. (optional) (default to undefined)
let steamid: number; //(Optional) steamid to make the request on behalf of -- if specified, the user must be in the session. (optional) (default to undefined)

const { status, data } = await apiInstance.iGameNotificationsServiceUserDeleteSessionV1Post(
    inputJson,
    format,
    sessionid,
    appid,
    steamid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **sessionid** | [**number**] | (Required) The sessionid to delete. | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) The appid of the session to delete. | (optional) defaults to undefined|
| **steamid** | [**number**] | (Optional) steamid to make the request on behalf of -- if specified, the user must be in the session. | (optional) defaults to undefined|


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

# **iGameNotificationsServiceUserUpdateSessionV1Post**
> iGameNotificationsServiceUserUpdateSessionV1Post()


### Example

```typescript
import {
    IGameNotificationsServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameNotificationsServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let sessionid: number; //(Required) The sessionid to update. (optional) (default to undefined)
let appid: number; //(Required) The appid of the session to update. (optional) (default to undefined)
let title: string; //(Optional) The new title of the session.  If not specified, the title will not be changed. (optional) (default to undefined)
let users: string; //(Optional) A list of users whose state will be updated to reflect the given state. If the users are not already in the session, they will be added to it. (optional) (default to undefined)
let steamid: number; //(Optional) steamid to make the request on behalf of -- if specified, the user must be in the session and all users being added to the session must be friends with the user. (optional) (default to undefined)

const { status, data } = await apiInstance.iGameNotificationsServiceUserUpdateSessionV1Post(
    inputJson,
    format,
    sessionid,
    appid,
    title,
    users,
    steamid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **sessionid** | [**number**] | (Required) The sessionid to update. | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) The appid of the session to update. | (optional) defaults to undefined|
| **title** | [**string**] | (Optional) The new title of the session.  If not specified, the title will not be changed. | (optional) defaults to undefined|
| **users** | [**string**] | (Optional) A list of users whose state will be updated to reflect the given state. If the users are not already in the session, they will be added to it. | (optional) defaults to undefined|
| **steamid** | [**number**] | (Optional) steamid to make the request on behalf of -- if specified, the user must be in the session and all users being added to the session must be friends with the user. | (optional) defaults to undefined|


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

