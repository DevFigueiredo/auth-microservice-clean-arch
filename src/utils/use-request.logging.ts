import Logger from '@src/infra/observability/logger/logger';
import * as morganBody from 'morgan-body';

export async function useRequestLogging(app) {
  (morganBody as any)(app, {
    stream: {
      write: (message: string) => {
        Logger.info(message);
        return true;
      },
    },
    noColors: true, // Desabilitar cores para logs em produção
    maxBodyLength: 10000,
    prettify: false,
    immediateReqLog: true,
    filterParameters: ['password', 'token'],
    logAllReqHeader: true,
    logResponseBody: true,
    logRequestId: false,
    logRequestBody: true,
    logIP: true,
  });
}
