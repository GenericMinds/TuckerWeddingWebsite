import * as AWS from 'aws-sdk';
import { S3OptionsModel } from '../_models/S3OptionsModel';
import { S3ImageDataModel } from '../_models/S3ImageDataModel';

const s3Options: S3OptionsModel = {
    bucketName: process.env.S3_BUCKETNAME,
    albumName: process.env.S3_ALBUMNAME
};
let s3: any; 

export function configureAws(): void {
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.IDENTITY_POOL_ID,
    });

    s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {
            Bucket: s3Options.bucketName,
            Prefix: s3Options.albumName
        },
    });
}

export async function getPhotosFromAws(): Promise<S3ImageDataModel[]> {
    configureAws();

    const s3Response = await s3.listObjects().promise();
    const href: string = s3Response.$response.request.httpRequest.endpoint.href;
    const baseUrl = href + s3Options.bucketName + '/';
    
    let photos: S3ImageDataModel[] = s3Response.Contents.map(function (photo: any) {
        const photoPath: string = photo.Key;
        const photoUrl: string = baseUrl + photoPath;

        const photoDescription: string = photoPath.replace(s3Options.albumName, "").replace(".JPG", "").replace(/-/g, " ");
        return { url: photoUrl, alt: photoDescription } as S3ImageDataModel;
    });

    photos.shift();
    photos.sort(() => Math.random() - 0.5);
    return photos;
}