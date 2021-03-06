/**
 * Web SDK version number. Can be specified in an extension's set of demands like: vss-sdk-version/3.0
 */
export declare const sdkVersion = 3;
/**
 * Options for extension initialization -- passed to DevOps.init()
 */
export interface IExtensionInitOptions {
    /**
     * True (the default) indicates that the content of this extension is ready to be shown/used as soon as the
     * init handshake has completed. Otherwise (loaded: false), the extension must call DevOps.notifyLoadSucceeded()
     * once it has finished loading.
     */
    loaded?: boolean;
    /**
     * Extensions that show UI should specify this to true in order for the current user's theme
     * to be applied to this extension content. Defaults to true.
     */
    applyTheme?: boolean;
}
/**
 * Information about the current user
 */
export interface IUserContext {
    /**
     * Identity descriptor used to represent this user. In the format of {subject-type}.{base64-encoded-subject-id}
     */
    descriptor: string;
    /**
     * Unique id for the user
     */
    id: string;
    /**
     * Name of the user (email/login)
     */
    name: string;
    /**
     * The user's display name (First name / Last name)
     */
    displayName: string;
    /**
     * Url to the user's profile image
     */
    imageUrl: string;
}
/**
 * DevOps host level
 */
export declare enum HostType {
    /**
     * The Deployment host
     */
    Deployment = 1,
    /**
     * The Enterprise host
     */
    Enterprise = 2,
    /**
     * The organization host
     */
    Organization = 4
}
/**
 * Information about the current DevOps host (organization)
 */
export interface IHostContext {
    /**
     * Unique GUID for this host
     */
    id: string;
    /**
     * Name of the host (i.e. Organization name)
     */
    name: string;
    /**
     * Version of Azure DevOps used by the current host (organization)
     */
    serviceVersion: string;
    /**
     * DevOps host level
     */
    type: HostType;
}
/**
 * Information about the current DevOps teamz
 */
export interface ITeamContext {
    /**
     * Unique GUID for this team
     */
    id: string;
    /**
     * Name of team
     */
    name: string;
}
/**
 * Identifier for the current extension
 */
export interface IExtensionContext {
    /**
     * Full id of the extension <publisher>.<extension>
     */
    id: string;
    /**
     * Id of the publisher
     */
    publisherId: string;
    /**
     * Id of the extension (without the publisher prefix)
     */
    extensionId: string;
    /**
     * Version of the extension
     */
    version: string;
}
/**
 * Initiates the handshake with the host window.
 *
 * @param options - Initialization options for the extension.
 */
export declare function init(options?: IExtensionInitOptions): Promise<void>;
/**
* Register a callback that gets called once the initial setup/handshake has completed.
* If the initial setup is already completed, the callback is invoked at the end of the current call stack.
*/
export declare function ready(): Promise<void>;
/**
* Notifies the host that the extension successfully loaded (stop showing the loading indicator)
*/
export declare function notifyLoadSucceeded(): Promise<void>;
/**
* Notifies the host that the extension failed to load
*/
export declare function notifyLoadFailed(e: Error | string): Promise<void>;
/**
* Get the configuration data passed in the initial handshake from the parent frame
*/
export declare function getConfiguration(): {
    [key: string]: any;
};
/**
* Gets the information about the contribution that first caused this extension to load.
*/
export declare function getContributionId(): string;
/**
* Gets information about the current user
*/
export declare function getUser(): IUserContext;
/**
* Gets information about the host (i.e. an Azure DevOps organization) that the page is targeting
*/
export declare function getHost(): IHostContext;
/**
* Gets information about the team that the page is targeting
*/
export declare function getTeam(): ITeamContext;
/**
* Get the context about the extension that owns the content that is being hosted
*/
export declare function getExtensionContext(): IExtensionContext;
/**
* Get the contribution with the given contribution id. The returned contribution has a method to get a registered object within that contribution.
*
* @param contributionId - Id of the contribution to get
*/
export declare function getService<T>(contributionId: string): Promise<T>;
/**
* Register an object (instance or factory method) that this extension exposes to the host frame.
*
* @param instanceId - unique id of the registered object
* @param instance - Either: (1) an object instance, or (2) a function that takes optional context data and returns an object instance.
*/
export declare function register<T = any>(instanceId: string, instance: T): void;
/**
* Removes an object that this extension exposed to the host frame.
*
* @param instanceId - unique id of the registered object
*/
export declare function unregister(instanceId: string): void;
/**
* Fetch an access token which will allow calls to be made to other DevOps services
*/
export declare function getAccessToken(): Promise<string>;
/**
* Fetch an token which can be used to identify the current user
*/
export declare function getAppToken(): Promise<string>;
/**
* Requests the parent window to resize the container for this extension based on the current extension size.
*
* @param width - Optional width, defaults to scrollWidth
* @param height - Optional height, defaults to scrollHeight
*/
export declare function resize(width?: number, height?: number): void;
/**
 * Applies theme variables to the current document
 */
export declare function applyTheme(themeData: {
    [varName: string]: string;
}): void;
