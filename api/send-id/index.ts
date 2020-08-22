import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.res = {
     body: { 
       id: process.env.MY_LIFF_ID 
     }
  };
};

export default httpTrigger;
