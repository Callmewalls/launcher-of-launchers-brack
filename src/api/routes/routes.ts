/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SteamController } from './../controllers/SteamController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LibraryHttpController } from './../controllers/LibraryHttpController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LauncherHttpController } from './../controllers/LauncherHttpController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthHttpController } from './../controllers/AuthHttpController';
import { expressAuthentication } from './../middlewares/tsoa.auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "SteamGame": {
        "dataType": "refObject",
        "properties": {
            "appid": {"dataType":"double","required":true},
            "name": {"dataType":"string"},
            "playtime_forever": {"dataType":"double"},
            "img_icon_url": {"dataType":"string"},
            "img_logo_url": {"dataType":"string"},
            "playtime_windows_forever": {"dataType":"double"},
            "playtime_mac_forever": {"dataType":"double"},
            "playtime_linux_forever": {"dataType":"double"},
            "rtime_last_played": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SteamGamesResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"SteamGame"}},
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SteamErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[false],"required":true},
            "error": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SteamPlayer": {
        "dataType": "refObject",
        "properties": {
            "steamid": {"dataType":"string","required":true},
            "personaname": {"dataType":"string","required":true},
            "profileurl": {"dataType":"string"},
            "avatar": {"dataType":"string"},
            "avatarmedium": {"dataType":"string"},
            "avatarfull": {"dataType":"string"},
            "personastate": {"dataType":"double"},
            "realname": {"dataType":"string"},
            "loccountrycode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SteamPlayerResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "data": {"ref":"SteamPlayer"},
            "error": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LibraryItemDto": {
        "dataType": "refObject",
        "properties": {
            "userGameId": {"dataType":"string","required":true},
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "launcher": {"dataType":"string","required":true},
            "launcherId": {"dataType":"string","required":true},
            "coverUrl": {"dataType":"string"},
            "description": {"dataType":"string"},
            "releaseDate": {"dataType":"datetime"},
            "genres": {"dataType":"any"},
            "isInstalled": {"dataType":"boolean","required":true},
            "installPath": {"dataType":"string"},
            "executablePath": {"dataType":"string"},
            "playtime": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LibraryErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[false],"required":true},
            "error": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GameActionResult": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "launched": {"dataType":"boolean","required":true},
            "protocolUrl": {"dataType":"string"},
            "message": {"dataType":"string"},
            "error": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CapabilitiesResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[true],"required":true},
            "launchers": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthUrlResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[true],"required":true},
            "authUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiError": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[false],"required":true},
            "error": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MessageResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[true],"required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinkLauncherBody": {
        "dataType": "refObject",
        "properties": {
            "launcherType": {"dataType":"string","required":true},
            "accountName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExchangeCodeBody": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocalConfigResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[true],"required":true},
            "config": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocalConfigBody": {
        "dataType": "refObject",
        "properties": {
            "installBasePath": {"dataType":"string"},
            "executablePattern": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"enum","enums":[false],"required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterBody": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginBody": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GoogleAuthBody": {
        "dataType": "refObject",
        "properties": {
            "idToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsSteamController_getOwnedGames: Record<string, TsoaRoute.ParameterSchema> = {
                steamId: {"in":"path","name":"steamId","required":true,"dataType":"string"},
                includeAppInfo: {"in":"query","name":"includeAppInfo","dataType":"boolean"},
        };
        app.get('/steam/:steamId/owned-games',
            ...(fetchMiddlewares<RequestHandler>(SteamController)),
            ...(fetchMiddlewares<RequestHandler>(SteamController.prototype.getOwnedGames)),

            async function SteamController_getOwnedGames(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSteamController_getOwnedGames, request, response });

                const controller = new SteamController();

              await templateService.apiHandler({
                methodName: 'getOwnedGames',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSteamController_getPlayerSummary: Record<string, TsoaRoute.ParameterSchema> = {
                steamId: {"in":"path","name":"steamId","required":true,"dataType":"string"},
        };
        app.get('/steam/:steamId/player-summary',
            ...(fetchMiddlewares<RequestHandler>(SteamController)),
            ...(fetchMiddlewares<RequestHandler>(SteamController.prototype.getPlayerSummary)),

            async function SteamController_getPlayerSummary(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSteamController_getPlayerSummary, request, response });

                const controller = new SteamController();

              await templateService.apiHandler({
                methodName: 'getPlayerSummary',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSteamController_getRecentlyPlayedGames: Record<string, TsoaRoute.ParameterSchema> = {
                steamId: {"in":"path","name":"steamId","required":true,"dataType":"string"},
                count: {"in":"query","name":"count","dataType":"double"},
        };
        app.get('/steam/:steamId/recently-played',
            ...(fetchMiddlewares<RequestHandler>(SteamController)),
            ...(fetchMiddlewares<RequestHandler>(SteamController.prototype.getRecentlyPlayedGames)),

            async function SteamController_getRecentlyPlayedGames(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSteamController_getRecentlyPlayedGames, request, response });

                const controller = new SteamController();

              await templateService.apiHandler({
                methodName: 'getRecentlyPlayedGames',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLibraryHttpController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/library/all',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController.prototype.getAll)),

            async function LibraryHttpController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLibraryHttpController_getAll, request, response });

                const controller = new LibraryHttpController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLibraryHttpController_getIcon: Record<string, TsoaRoute.ParameterSchema> = {
                userGameId: {"in":"path","name":"userGameId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/library/:userGameId/icon',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController.prototype.getIcon)),

            async function LibraryHttpController_getIcon(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLibraryHttpController_getIcon, request, response });

                const controller = new LibraryHttpController();

              await templateService.apiHandler({
                methodName: 'getIcon',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLibraryHttpController_launchGame: Record<string, TsoaRoute.ParameterSchema> = {
                userGameId: {"in":"path","name":"userGameId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/library/:userGameId/launch',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController.prototype.launchGame)),

            async function LibraryHttpController_launchGame(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLibraryHttpController_launchGame, request, response });

                const controller = new LibraryHttpController();

              await templateService.apiHandler({
                methodName: 'launchGame',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLibraryHttpController_installGame: Record<string, TsoaRoute.ParameterSchema> = {
                userGameId: {"in":"path","name":"userGameId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/library/:userGameId/install',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController.prototype.installGame)),

            async function LibraryHttpController_installGame(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLibraryHttpController_installGame, request, response });

                const controller = new LibraryHttpController();

              await templateService.apiHandler({
                methodName: 'installGame',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLibraryHttpController_uninstallGame: Record<string, TsoaRoute.ParameterSchema> = {
                userGameId: {"in":"path","name":"userGameId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/library/:userGameId/uninstall',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LibraryHttpController.prototype.uninstallGame)),

            async function LibraryHttpController_uninstallGame(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLibraryHttpController_uninstallGame, request, response });

                const controller = new LibraryHttpController();

              await templateService.apiHandler({
                methodName: 'uninstallGame',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_getCapabilities: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/launchers/capabilities',
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.getCapabilities)),

            async function LauncherHttpController_getCapabilities(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_getCapabilities, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'getCapabilities',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_getLinkedAccounts: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/launchers/linked',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.getLinkedAccounts)),

            async function LauncherHttpController_getLinkedAccounts(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_getLinkedAccounts, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'getLinkedAccounts',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_getAuthUrl: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                launcherType: {"in":"path","name":"launcherType","required":true,"dataType":"string"},
                returnUrl: {"in":"query","name":"returnUrl","dataType":"string"},
        };
        app.get('/launchers/:launcherType/auth-url',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.getAuthUrl)),

            async function LauncherHttpController_getAuthUrl(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_getAuthUrl, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'getAuthUrl',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_handleCallback: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                launcherType: {"in":"path","name":"launcherType","required":true,"dataType":"string"},
                code: {"in":"query","name":"code","dataType":"string"},
                state: {"in":"query","name":"state","dataType":"string"},
        };
        app.get('/launchers/:launcherType/callback',
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.handleCallback)),

            async function LauncherHttpController_handleCallback(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_handleCallback, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'handleCallback',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_linkLauncher: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LinkLauncherBody"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/launchers/link',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.linkLauncher)),

            async function LauncherHttpController_linkLauncher(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_linkLauncher, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'linkLauncher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_unlinkLauncher: Record<string, TsoaRoute.ParameterSchema> = {
                accountId: {"in":"path","name":"accountId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/launchers/:accountId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.unlinkLauncher)),

            async function LauncherHttpController_unlinkLauncher(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_unlinkLauncher, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'unlinkLauncher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_syncLauncher: Record<string, TsoaRoute.ParameterSchema> = {
                accountId: {"in":"path","name":"accountId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/launchers/:accountId/sync',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.syncLauncher)),

            async function LauncherHttpController_syncLauncher(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_syncLauncher, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'syncLauncher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_syncAllLaunchers: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/launchers/sync/all',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.syncAllLaunchers)),

            async function LauncherHttpController_syncAllLaunchers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_syncAllLaunchers, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'syncAllLaunchers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_scanLocalInstallations: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/launchers/scan/local',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.scanLocalInstallations)),

            async function LauncherHttpController_scanLocalInstallations(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_scanLocalInstallations, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'scanLocalInstallations',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_scanLocalInstallationsByLauncher: Record<string, TsoaRoute.ParameterSchema> = {
                launcherType: {"in":"path","name":"launcherType","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/launchers/:launcherType/scan/local',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.scanLocalInstallationsByLauncher)),

            async function LauncherHttpController_scanLocalInstallationsByLauncher(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_scanLocalInstallationsByLauncher, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'scanLocalInstallationsByLauncher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_exchangeCode: Record<string, TsoaRoute.ParameterSchema> = {
                launcherType: {"in":"path","name":"launcherType","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"ExchangeCodeBody"},
        };
        app.post('/launchers/:launcherType/exchange',
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.exchangeCode)),

            async function LauncherHttpController_exchangeCode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_exchangeCode, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'exchangeCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_getLocalConfig: Record<string, TsoaRoute.ParameterSchema> = {
                launcherType: {"in":"path","name":"launcherType","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/launchers/:launcherType/local-config',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.getLocalConfig)),

            async function LauncherHttpController_getLocalConfig(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_getLocalConfig, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'getLocalConfig',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLauncherHttpController_upsertLocalConfig: Record<string, TsoaRoute.ParameterSchema> = {
                launcherType: {"in":"path","name":"launcherType","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"LocalConfigBody"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/launchers/:launcherType/local-config',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController)),
            ...(fetchMiddlewares<RequestHandler>(LauncherHttpController.prototype.upsertLocalConfig)),

            async function LauncherHttpController_upsertLocalConfig(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLauncherHttpController_upsertLocalConfig, request, response });

                const controller = new LauncherHttpController();

              await templateService.apiHandler({
                methodName: 'upsertLocalConfig',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthHttpController_register: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"RegisterBody"},
        };
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController)),
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController.prototype.register)),

            async function AuthHttpController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthHttpController_register, request, response });

                const controller = new AuthHttpController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthHttpController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LoginBody"},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController)),
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController.prototype.login)),

            async function AuthHttpController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthHttpController_login, request, response });

                const controller = new AuthHttpController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthHttpController_registerWithGoogle: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GoogleAuthBody"},
        };
        app.post('/auth/register/google',
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController)),
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController.prototype.registerWithGoogle)),

            async function AuthHttpController_registerWithGoogle(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthHttpController_registerWithGoogle, request, response });

                const controller = new AuthHttpController();

              await templateService.apiHandler({
                methodName: 'registerWithGoogle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthHttpController_loginWithGoogle: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GoogleAuthBody"},
        };
        app.post('/auth/login/google',
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController)),
            ...(fetchMiddlewares<RequestHandler>(AuthHttpController.prototype.loginWithGoogle)),

            async function AuthHttpController_loginWithGoogle(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthHttpController_loginWithGoogle, request, response });

                const controller = new AuthHttpController();

              await templateService.apiHandler({
                methodName: 'loginWithGoogle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
