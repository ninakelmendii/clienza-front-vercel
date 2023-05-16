import { TOKEN } from "./const/const";

// import { Client } from "@microsoft/microsoft-graph-client";
// import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
// import { ClientSecretCredential } from '@azure/identity';


// const tenantId = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
// const clientId = '34f6579c-78e8-4442-af4f-d75ae62ab834';
// // const clientSecret = 'ba446ccb-259d-4336-a41f-8e4ca1550c98';
// const redirectUri = 'https://localhost:8080';

// // Set the scope for the token
// const scope = 'https://graph.microsoft.com/.default';

// // Build the authorization URL
// const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

// Redirect the user to the authorization URL
// window.location.href = authUrl;

// const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
// const authProvider = new TokenCredentialAuthenticationProvider(credential, {scopes: ["user.read"]});


// const clientId = 'YOUR_CLIENT_ID';
// const clientSecret = 'YOUR_CLIENT_SECRET';
// const refreshToken = 'YOUR_REFRESH_TOKEN';

// const body = `grant_type=refresh_token&client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${TOKEN}`;

// const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

// fetch(url, {
//     method: 'POST',
//     body: body,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// }).then(response => {
//    console.log(response)
// })



// --------------------------------------------------- new testing
// const msal = require("@azure/msal-node");

// const msalConfig = {
//     auth: {
//         clientId: "6951f7bc-086d-418f-a71d-cca7b39579ac",
//         authority: "d1ca4da3-96eb-4253-a757-799e22e5d98c",
//     }
// };

// const pca = new msal.PublicClientApplication(msalConfig);

// // For testing, enter your username and password below.
// // In production, replace this with a UI prompt instead.
// const usernamePasswordRequest = {
//     scopes: ["user.read"],
//     username: "info@clienza.ch", // Add your username here
//     password: "Clienza2022.", // Add your password here
// };

// pca.acquireTokenByUsernamePassword(usernamePasswordRequest).then((response) => {
//     console.log("acquired token by password grant", response);
// }).catch((error) => {
//     console.log(error);
// });


class MGraph {
    // Outlook calendar
    static async getAllEvents(){
        const now = new Date();
        const start = new Date(now.setFullYear(now.getFullYear() - 1)).toDateString();
        const end = new Date(now.setFullYear(now.getFullYear() + 2)).toDateString();

        const request = await fetch(`https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=${start}&enddatetime=${end}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })

        const response = await request.json();

        return response.value;
    }

    static async createEvent(params){
        try {
            const request = await fetch('https://graph.microsoft.com/v1.0/me/events',{
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(params)
            });

        const response = await request.json();
        return response;
        } catch (error) {
            console.log(error)
        }

    }

    // --------------------------------
    // OneDrive:

    // Folder and data
    static async getItems(){
        const request = await fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', { method: "GET", 'headers': {
            'Authorization': `Bearer ${TOKEN}`
        } });

        const response = await request.json();

        return response;
    }

    static async getClienzaId(){
        const { value } = await this.getItems();
        let clienzaId = null;

        value.forEach(item => {
            if(item.name.toLowerCase() == 'clienza') clienzaId = item.id;
        });

        return clienzaId;
    }

    static async getRootFolderId(folderName) {
        const id = await this.getClienzaId();
        let folderId = null;

        const request = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${id}/children`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });

        const response = await request.json();

        const { value } = response;

        value.forEach(v => {
            if(v.name.toLowerCase() == folderName) folderId = v.id;
        });

        return folderId;
    }

    static async getClienzaRoot() {
        const id = await this.getClienzaId();

        const request = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${id}/children`, { method: "GET", 'headers': {
            'Authorization': `Bearer ${TOKEN}`
        }});

        const response = await request.json();

        return response;
    }

    static async createFolder(folderName, location){
        const driveItem = {
            "name": folderName,
            "folder": { },
            '@microsoft.graph.conflictBehavior': 'rename'
          };

        const request = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${location}/children`, { method: "POST", headers: {
                'Authorization': `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            }, body: JSON.stringify(driveItem)
        });

        const response = await request.json();

        return response;
    }


    // Customers operations
    static async getCustomers(){
        const customersFolder = await this.getRootFolderId('customers');

        const request = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${customersFolder}/children`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });

        const response = await request.json();

        return response;
    }

    static async checkCustomerSpace(customer, no_id = false){
        const allCustomers = await this.getCustomers();
        let existence = {
            exists: false
        };

        if(no_id) {
            allCustomers.value.forEach(cust => {
                const id = cust.name.split(' ');

                if(id[id.length - 1] == customer) {
                    existence.exists = true;
                    existence.customer = cust;
                }
            });
        } else {
            allCustomers.value.forEach(cust => {
                if(cust.name == customer) {
                    existence.exists = true;
                    existence.customer = cust;
                }
            })
        }

        return existence;
    }

    static async sendDocument({ customer, type, file }) {
        // Getting the customer
        const customerInfo = await this.checkCustomerSpace(customer);

        // If customer exists
        if(customerInfo.exists) {
            const request = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${customerInfo.customer.id}/children`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${TOKEN}` }
            })

            const customerFolders = await request.json();

            let typeFolder = {
                exists: false,
                folder: null
            }

            customerFolders.value.forEach(folder => {
                if(folder.name.toLowerCase() == type.toLowerCase()) {
                    typeFolder.exists = true;
                    typeFolder.folder = folder;
                }
            })

            // If type folder exists
            if(typeFolder.exists == true) {
                // Check if the file already exists
                this.sendFile(file, typeFolder.folder.id);
                // const client = Client.initWithMiddleware({ authProvider, debugLogging: true })
                // client.api('https://graph.microsoft.com/v1.0/me/drive/items/99FEECE9E308A0D9!102/content').get().then(response => console.log(response));

                // fetch('https://graph.microsoft.com/v1.0/me/drive/items/99FEECE9E308A0D9!105:/INFO CLIENZA 2.txt:/content', {
                //     method: 'PUT',
                //     headers: { 'Authorization': `Bearer ${TOKEN}` },
                //     body: "saldjsalkdjaksdj"
                // }).then(response => console.log(response.url))

                // console.log(s)

            } else {
                await this.createFolder(type, customerInfo.customer.id);
                this.sendDocument({customer, type, file});
            }

            return typeFolder;
        }
        // If customer doesnt exists
        else {
            const id = await this.getRootFolderId('customers');
            this.createFolder(customer, id);
            this.sendDocument({customer, type, file});
            return;
        }
    }

    static async generateProfileFolder() {
        const NAME = "Profile";

        const doesExists = await this.checkOnRootFolder(NAME);

        if(!doesExists) {
            const clienzaId = await this.getClienzaId();
            await this.createFolder(NAME, clienzaId);
        }

        const folderId = await this.getRootFolderId(NAME.toLowerCase());

        return folderId;
    }

    static async setProfilePic() {
        // Generating profile folder id
        // const PROFILE_FOLDER_ID = await this.generateProfileFolder();
        console.log(await this.getProfilePic(JSON.parse(localStorage.getItem('user')).id));
        // Deleting old pic if exists


        // Delete if it does


        // Add the new pic
    }

    static async getProfilePic(user_id) {
        // Check if this user has a profile pic
        await this.generateProfileFolder();

        const PROFILES = await this.getInfo("Profile");

        let PROFILE_PIC = null;

        PROFILES.forEach((pic) => {
            const gettingId  = pic.title.split(" ");
            const pic_user_id = gettingId[gettingId.length - 1];

            if(pic_user_id == user_id) {
                PROFILE_PIC = pic;
            }
        });

        // Return false if image doesnt exists
        if(PROFILE_PIC == null) return false;

        // Return the image props if true
        return PROFILE_PIC;
    }

    static async sendFile(file, location, customFileName = null){
        const url = `https://graph.microsoft.com/v1.0/me/drive/items/${location}:/${customFileName != null ? customFileName : file.name}:/content`;

        const form = new FormData();
        form.append('file', file)

        fetch(url, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${TOKEN}`,"Content-Type": "multipart/form-data" },
                body: file
            }).then(response => console.log(response.url))

        console.log(url)
    }

    static async getCustomerDownloadFileLink(customer_id, type = 'applications', onlyDownloadLink = true){
        const { customer } = await this.checkCustomerSpace(customer_id, true);

        const applicationsIdrequest = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${customer.id}/children`, {
            method: 'get',
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });

        const applicationsId = await applicationsIdrequest.json();
        const filteredId = applicationsId.value.filter(it => it.name.toLowerCase() == type);

        console.log('aa', filteredId);

        const files = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${filteredId[0].id}/children`, {
            method: 'get',
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });

        const filesResponse = await files.json();
        if(onlyDownloadLink == false) {
            return filesResponse.value;
        }
        
        return filesResponse.value[0]['@microsoft.graph.downloadUrl'];
    }

    static async getOtherApplications(customer_id) {
        const otherApplications = await this.getCustomerDownloadFileLink(customer_id, "other applications", false);

        console.log('sss', otherApplications.value);
        console.log(customer_id);
    }

    static async checkOnRootFolder(folderToCheck) {
        const clienzaDirectory = await this.getClienzaRoot();
        let folderExists = false;
        
        clienzaDirectory.value.forEach(cd => {
            if(cd.name.toLowerCase() == folderToCheck.toLowerCase()) {
                folderExists = true;
            }
        })

        return folderExists;
    }

    // Help
    static async addInfo({title, file, type = 'Help'}) {
        const clienzaDirectory = await this.getClienzaRoot();
        let helpExists = false;
        
        clienzaDirectory.value.forEach(cd => {
            if(cd.name.toLowerCase() == type.toLowerCase()) {
                helpExists = true;
            }
        })

        if(!helpExists) {
            const clienzaId = await this.getClienzaId();
            await this.createFolder(type, clienzaId);
        }

        const helpFolderId = await this.getRootFolderId(type.toLowerCase());

        const fileExt = file.name.split('.').pop();
        const customFileName = `${title}.${fileExt}`;

        await this.sendFile(file, helpFolderId, customFileName);

        return customFileName;
    }

    static async getInfo(type = 'Help') {
        let id = await this.getRootFolderId(type.toLowerCase());

        if(id == null) {
            const clienzaId = await this.getClienzaId();
            await this.createFolder(type, clienzaId);
        }

        id = await this.getRootFolderId(type.toLowerCase());

        const request = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${id}/children`, { method: "GET", 'headers': {
            'Authorization': `Bearer ${TOKEN}`
        }});

        const response = await request.json();

        let files = [];

        response.value.forEach(help => {
            let title = help.name.split('.');
            title.pop();
            title = title.toString().replace(',', '');
            
            const params = {
                id: help.id,
                title,
                url: help.webUrl,
                downloadUrl: help['@microsoft.graph.downloadUrl']
            }

            files = [...files, params];
        });

        return files;
    }

    static async deleteInfo(item_id) {
        await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${item_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
    }
}

export default MGraph;