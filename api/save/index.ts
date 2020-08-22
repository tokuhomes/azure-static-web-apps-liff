import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline
} = require('@azure/storage-blob');

import { getFilename } from "./unit";
import { Buffer } from 'buffer';


const accountname: string = process.env.AZURE_STORAGE_ACCOUNT_NAME || '';
const accountkey: string = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY || '';

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountname,
  accountkey);
const pipeline = newPipeline(sharedKeyCredential);
const blobServiceClient = new BlobServiceClient(
  `https://${accountname}.blob.core.windows.net`,
  pipeline
);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const containerName: string = 'images';
  const base64: string = req.body.image.split(',')[1];
  const decode = Buffer.from(base64,'base64');

  const blobName: string = getFilename();
  const containerClient = blobServiceClient.getContainerClient(containerName);;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.upload(decode, decode.length);
  context.res = {
    body: {
      accountname: accountname,
      filename: blobName
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
};

export default httpTrigger;