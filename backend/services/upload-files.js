const fs = require('fs');
const util = require('util');
const S3 = require('aws-sdk/clients/s3');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_IMAGES_ACCESS_KEY;
const secretAccessKey = process.env.AWS_IMAGES_SECRET_KEY;
const bucketName = process.env.AWS_IMAGES_BUCKET_NAME;

class UploadFilesService {
  #s3;
  #deleteFile = util.promisify(fs.unlink);

  constructor() {
    this.#s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }

  async uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };

    const { key } = await this.#s3.upload(uploadParams).promise();

    await this.#deleteFile(file.path);

    return key;
  }

  async getFile(filename) {
    const downloadParams = {
      Key: filename,
      Bucket: bucketName,
    };

    const { Body } = await this.#s3.getObject(downloadParams).promise();

    return Body;
  }
}

module.exports = new UploadFilesService();
