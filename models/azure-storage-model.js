if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const path = require('path');
const storage = require('azure-storage');
const blobService = storage.createBlobService();
const containerName = "demo";

//function to list all containers
const listContainers = async () => {
    return new Promise((resolve, reject) => {
        blobService.listContainersSegmented(null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} containers`, containers: data.entries });
            }
        });
    });
};

//function to create container
const createContainer = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Container '${containerName}' created` });
            }
        });
    });
};

//function to upload string
const uploadString = async (containerName, blobName, text) => {
    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromText(containerName, blobName, text, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Text "${text}" is written to blob storage` });
            }
        });
    });
};

//upload file and get url

const uploadLocalFile = async (containerName, filePath) => {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(filePath);
        const blobName = path.basename(filePath);
        blobService.createBlockBlobFromLocalFile(containerName, blobName, fullPath, err => {
            if (err) {
                reject(err);
            } else {
            resolve({ message: `Local file is uploaded`, url: fileUrl });
            }
        });
    });
};

const listBlobs = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmented(containerName, null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} blobs in '${containerName}'`, blobs: data.entries });
            }
        });
    });
};

const downloadBlob = async (containerName, blobName) => {
    const dowloadFilePath = path.resolve('./' + blobName.replace('.txt', '.downloaded.txt'));
    return new Promise((resolve, reject) => {
        blobService.getBlobToText(containerName, blobName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Blob downloaded "${data}"`, text: data });
            }
        });
    });
};

//delete uploaded blob
const deleteBlob = async (containerName, blobName) => {
    return new Promise((resolve, reject) => {
        blobService.deleteBlobIfExists(containerName, blobName, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Block blob '${blobName}' deleted` });
            }
        });
    });
};

const deleteContainer = async (containerName) => {
    return new Promise((resolve, reject) => {
        blobService.deleteContainer(containerName, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Container '${containerName}' deleted` });
            }
        });
    });
};

const uploadFile = async (containerName, blobName, stream, streamLength)=>{
		return new Promise((resolve, reject) => {

	return blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err =>{
if(err){
reject(err);
}else{
resolve({ message: `file '${blobName}' uploaded` });
}
    });
		});
};

const execute = async () => {

    let response;

    console.log("Containers:");
    response = await listContainers();
    response.containers.forEach((container) => console.log(` -  ${container.name}`));

    const containerDoesNotExist = response.containers.findIndex((container) => container.name === containerName) === -1;

    if (containerDoesNotExist) {
        await createContainer(containerName);
        console.log(`Container "${containerName}" is created`);
    }


    await uploadString(containerName, blobName, content);
    console.log(`Blob "${blobName}" is uploaded`);


console.log(`Blobs in "${containerName}" container:`);

response = await listBlobs(containerName);
    response.blobs.forEach((blob) => console.log(` - ${blob.name}`));


    response = await downloadBlob(containerName, blobName);
    console.log(`Downloaded blob content: ${response.text}"`);


    await deleteBlob(containerName, blobName);
    console.log(`Blob "${blobName}" is deleted`);

    /*
    await deleteContainer(containerName);
    console.log(`Container "${containerName}" is deleted`);
*/
}

const callUploadFile = async(containerName, blobName, stream, streamLength)=>{
let response;
response = await uploadFile(containerName, blobName, stream, streamLength);
console.log(response.message);
};

/*
execute().then(() =>{
    console.log("Done");
}).catch((e)=>
console.log(e));
*/

module.exports = {
    uploadFile, createContainer,deleteBlob
    };
