import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";


@Catch()
export class AllExceptionFilter implements ExceptionFilter{

  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): any {

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = (exception instanceof HttpException) ?
      exception.getStatus() :
      exception;

    const msg = (exception instanceof HttpException) ?
      exception.getResponse() :
      exception;

    this.logger.error(`Status: ${status} - Error: ${msg}`);

    response.status(status).json({
      time: new Date().toISOString(),
      path: request.url,
      error: msg
    });



  }

}