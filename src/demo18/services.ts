import "reflect-metadata"
import { Container, injectable, inject } from "inversify"
import {getReqUrl} from './api'

type Resp = Promise<any>

const TYPES = {
  Normal: Symbol.for('Normal'),
  Restful: Symbol.for('Restful'),
}

// iou api
export interface Services {
  getBooklist(): Resp;
}

// restful style api
export interface RestfulServices {
  getUserList(type: 'student' | 'teacher', offset: number, limit: number): Resp;
  postOrderBook(id: number): Resp;
}

const myContainer = new Container();

myContainer
  .bind<Services>(TYPES.Normal)
  .to(injectable()(class { }))
  .onActivation((context, service) => {
    // const handler = {
    //   get(target: any, propKey: string, receiver: any) {
    //     const api = propKey.replace(/^(get|post)/i, '');
    //     const method = RegExp.$1;
    //     const url = getReqUrl(api.replace(/^[a-z]/i, first => first.toLowerCase()));
    //     return (...params: any[]) => fetch(url, { method });
    //   }
    // };

    return new Proxy(service, {
      get(target: any, propKey: string, receiver: any) {
        const api = propKey.replace(/^(get|post)/i, '');
        const method = RegExp.$1;
        const url = getReqUrl(api.replace(/^[a-z]/i, first => first.toLowerCase()));
        return (...params: any[]) => fetch(url, { method });
      }
    });
  });

myContainer
  .bind<RestfulServices>(TYPES.Restful)
  .to(injectable()(class { }))
  .onActivation((context, service) => {
    let handler = {
      get(target: any, propKey: string, receiver: any) {
        const api = propKey.replace(/^(get|post)/i, '');
        const method = RegExp.$1;
        const urlRule = getReqUrl(api.replace(/^[a-z]/i, first => first.toLowerCase()));

        return (...params: any[]) => {
          let url = urlRule;
          const rs: RegExpMatchArray = urlRule.match(/\$\{.+?\}/ig);
          if (rs) {
            if (rs.length !== params.length) {
              throw new Error(`Expected ${rs.length} arguments, but got ${params.length}.`);
            }

            rs.map((p: string, i: number) => {
              url = url.replace(p, params[i]);
              return p;
            });
          }

          return fetch(url, { method });
        };
      }
    };

    return new Proxy(service, handler);
  });

export const Server = myContainer.get<Services>(TYPES.Normal)
export const RestfulServer = myContainer.get<RestfulServices>(TYPES.Restful)
