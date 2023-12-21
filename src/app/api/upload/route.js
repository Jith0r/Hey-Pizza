import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid'

export async function POST(req) {
    const data = await req.formData();
    
    //Si on a un fichier
    if (data.get('file')) {
        //Upload le fichier via AWS S3
        const file = data.get('file');

        //Init S3 client
        const s3Client = new S3Client({
            region: 'eu-north-1', // région du bucket (aws s3)
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        });

        //Pour grabb l'extension
        const ext = file.name.split('.').slice(-1)[0];
        //Renommer le fichier en randomString + extension
        const newFileName = uniqid() + '.' + ext;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks)

        await s3Client.send(new PutObjectCommand({
            Bucket: 'hey-pizza',
            Key: newFileName,
            ACL: 'public-read',
            ContentType: file.type,
            Body: buffer,
        }));

        return Response.json('https://hey-pizza.s3.amazonaws.com/'+newFileName)

    }
    return Response.json(true)
}