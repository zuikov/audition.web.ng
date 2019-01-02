/* tslint:disable */

declare var Object: any;

export interface AccessTokenInterface {
  "id"?: string;
  "ttl"?: number;
  "created"?: Date;
  "userId"?: string;
  "user"?: any;
}

export class AccessToken implements AccessTokenInterface {
  "id": string;
  "ttl": number;
  "created": Date;
  "userId": string;
  "user": any;
  constructor(data?: AccessTokenInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AccessToken`.
   */
  public static getModelName() {
    return "AccessToken";
  }
  /**
  * @method factory
  * @license MIT
  * This method creates an instance of AccessToken for dynamic purposes.
  **/
  public static factory(data: AccessTokenInterface): AccessToken{
    return new AccessToken(data);
  }
  /**
  * @method getModelDefinition
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'AccessToken',
      plural: 'AccessTokens',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "ttl": {
          name: 'ttl',
          type: 'number',
          default: 1209600
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'User',
          model: 'User'
        },
      }
    }
  }
}

export class Token implements AccessTokenInterface {
  id: any = null;
  ttl?: number = null;
  created?: any = null;
  userId?: any = null;
  user?: any = null;
  rememberMe?: boolean = null;
  constructor(data?: AccessTokenInterface) {
    Object.assign(this, data);
  }
}

export interface GeoPoint  {
    lat?: number;
    lng?: number;
    type?: string;
    coordinates?: number[];
}

export interface StatFilter {
    range: string,
    custom?: {
      start: string,
      end: string
    },
    where?: {},
    groupBy?: string
}
