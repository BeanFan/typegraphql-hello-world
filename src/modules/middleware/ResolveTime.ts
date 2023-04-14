import { MiddlewareFn } from "type-graphql";

export const ResolveTime: MiddlewareFn = async ({ info, args }, next) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;

  class Log {
    private serviceName: string;
    private costTime: string;
    private params: string;

    constructor(serviceName: string, costTime: string, params: string) {
      this.serviceName = serviceName;
      this.costTime = costTime;
      this.params = params;
    }

    toSting() {
      return this.serviceName + this.costTime + this.params;
    }
  }

  const logObj: Log = new Log(
    `${info.parentType.name}.${info.fieldName}`,
    `[${resolveTime} ms]`,
    `${JSON.stringify(args)}`
  );
  console.table(logObj);
};
