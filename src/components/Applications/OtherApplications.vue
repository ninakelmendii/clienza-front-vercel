<template>
    <div>
        <SnackBar :data="snackbar" ref="snackbar" />
        <v-row v-for="application in other_applications" :key="application.id" style="background-color: white; border-radius: 12px;" class="mt-4">
            <v-col cols="12" md="1" style="display: flex; align-items: center; justify-content: center;">
                <img style="width: 40px; height: auto;" v-if="application.insurance_type" :src="require('@/assets/images/insurance_type/'+application.insurance_type+'.svg')" />
            </v-col>
            <v-col cols="12" md="3">
                <v-select :label="translate('Insurance type')" :items="insurance_types_backup" density="comfortable" :value="application.insurance_type"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                {{ application.kvg }}
                <v-select :label="translate('Insurance company')" :items="insurance_companies" density="comfortable" :value="parseInt(application.insurance_company)"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-row>
                    <template>
                        <v-container fluid>
                            <v-select
                                :items="JSON.parse(application.files)"
                                :label="translate('File input')"
                                multiple
                                v-model="selectedFiles"
                            >
                                <template v-slot:selection="{ item }">
                                    <v-chip>
                                        <span>{{ item.title }}</span>
                                    </v-chip>
                                </template>
                            </v-select>
                        </v-container>
                    </template>
                </v-row>
            </v-col>
            <v-col cols="12" md="2" align-self="center">
                <v-row justify="center" align="center" style="height: 100%; gap: 10px;">
                    <v-btn
                        color="#fff"
                        class="red"
                        icon
                        @click="openDeleteModal(application.id)"
                    >
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="end" v-if="selectedFiles.length > 0">
            <div class="custom-buttons" @click="downloadFile">
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5688 7.159L8.46605 9.42109V1H7.72982V9.4224L5.62623 7.15878L5.08684 7.66084L8.09712 10.8986L11.1081 7.66084L10.5688 7.159Z" fill="white" stroke="white" stroke-width="0.4"/>
                    <path d="M15.1949 18.7483H1V4.5542H5.60822V5.29044H1.73606V18.0121H14.4586V5.29044H10.5869V4.5542H15.1947L15.1949 18.7483Z" fill="white" stroke="white" stroke-width="0.4"/>
                </svg>
            </div>
        </v-row>
        <v-row style="background-color: white; border-radius: 12px;" class="mt-8">
            <v-col cols="12" md="1" style="display: flex; align-items: center; justify-content: center;">
                <img style="width: 40px; height: auto;" v-if="new_application.insurance_type" :src="require('@/assets/images/insurance_type/'+new_application.insurance_type+'.svg')" />
            </v-col>
            <v-col cols="12" md="3">
                <v-select :label="translate('Insurance type')" :items="insurance_types" density="comfortable" v-model="new_application.insurance_type"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select :label="translate('Insurance company')" :items="insurance_companies" density="comfortable" v-model="new_application.kvg"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <template>
                    <v-file-input
                        multiple
                        v-model="new_application.files"
                        :label="translate('File input') + ' (max 5)'"
                        accept=".pdf, .docx, .doc, .png, .jpg, .jpeg"
                    ></v-file-input>
                </template>
            </v-col>
            <v-col cols="12" md="2" align-self="center">
                <v-row justify="center" align="center" style="height: 100%;">
                    <v-btn
                        :disabled="!addAvailable"
                        color="#fff"
                        class="primary"
                        icon
                        @click="addApplication"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
        <ModalDialog ref="modal" @confirmCallback="deleteItem" />
    </div>
</template>

<script>
    import axios from 'axios';
    import * as LANGUAGE from '../../store/language.json';
    import MGraph from '../../../services/mgraph';
    import SnackBar from '../Snackbar/SnackBar.vue';
    import ModalDialog from '../Modals/ModalDialog.vue';    

    export default {
    name: "OtherApplications",
    data() {
        return {
            selectedFiles: [],
            delete_modal: false,
            selected_item_id: null,
            other_applications: [],
            insurance_types: [
                { text: this.translate("Retirement provision"), value: "retirement" },
                { text: this.translate("Car insurance"), value: "car" },
                { text: this.translate("Household insurance"), value: "household" },
                { text: this.translate("Legal insurance"), value: "legal" },
                { text: this.translate("Private liability"), value: "private" },
            ],
            insurance_types_backup: [
                { text: this.translate("Retirement provision"), value: "retirement" },
                { text: this.translate("Car insurance"), value: "car" },
                { text: this.translate("Household insurance"), value: "household" },
                { text: this.translate("Legal insurance"), value: "legal" },
                { text: this.translate("Private liability"), value: "private" },
            ],
            insurance_companies: [],
            new_application: {
                insurance_type: null,
                kvg: null,
                files: []
            },
            editing_application: {
                id: null,
                insurance_type: null,
                kvg: null,
                files: []
            },
            folderName: null,
            snackbar: {
                message: "",
                error: false
            },
            dialog: {
                title: "",
                description: "",
                mode: "normal"
            }
        };
    },

    methods: {
        translate(word) {
            let wordIndex = null;
            LANGUAGE.forEach((lng, index) => {
                if (lng.english.toLowerCase() == word.toLowerCase()) {
                    wordIndex = index;
                }
            });
            if (wordIndex === null) {
                return word;
            }
            if (this.$store.state.language == "german") {
                return LANGUAGE[wordIndex].german;
            }
            else {
                return LANGUAGE[wordIndex].english;
            }
        },
        getInsurances() {
            axios
                .get("/insurances")
                .then(res => {
                const insurances = [];
                res.data.data.forEach((ins) => {
                    insurances.push({
                        text: ins.name,
                        value: ins.id
                    });
                });
                this.insurance_companies = insurances;
            })
                .catch(err => console.log(err));
        },
        async downloadFile() {
            this.selectedFiles.forEach(selectedFile => {
                axios
                    .get('/other_applications/'+selectedFile, { responseType: 'blob' })
                    .then((res) => {
                        const file = window.URL.createObjectURL(res.data);
                        let documentUrl = document.createElement('a');
        
                        documentUrl.href = file;
                        documentUrl.download = selectedFile;
                        document.body.appendChild(documentUrl);
                        documentUrl.click();
        
                        documentUrl.remove();
                        window.URL.revokeObjectURL(file);
                    })
                    .catch(err => console.log(err));
            })

        },
        async addApplication() {
            // Adding files to onedrive  
            const file_names = [];            
            this.new_application.files.forEach((file) => {
                file_names.push(file.name);
            });
            
            const formData = new FormData();

            formData.append('customer_id', this.$route.params.client_id);
            formData.append('insurance_type', this.new_application.insurance_type);
            formData.append('insurance_company', this.new_application.kvg);


            formData.append('files', JSON.stringify(file_names));

            for (let i = 0; i < this.new_application.files.length; i++) {
                // formData.append
                formData.append(`file_data[${i}]`, this.new_application.files[i]);
            }


            // this.new_application.files.forEach((file) => {
            //     formData.append('file_data', file);
            // });

            // formData.append('file_data', JSON.stringify(this.new_application.files));
            
            // Add info to db
            axios
                .post("other_applications", formData, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                }).then(response => {
                    console.log("ADAAA", response.data);

                    this.snackbar = {
                        message: response.data.message,
                        error: false
                    }

                    this.$refs.snackbar.toggleSnackbar();

                    this.new_application = {
                        insurance_type: null,
                        kvg: null,
                        files: []
                    }
                    this.getOtherApplication();
                }).catch(err => console.log(err));
        },
        getCustomerInfo() {
            axios
                .get("/customer/" + this.$route.params.client_id)
                .then((response) => {
                const customer = response.data.data;
                this.folderName = `${customer.first_name} ${customer.last_name} - ${customer.id}`;
            })
                .catch((error) => {
                console.log(error);
            });
        },
        getOtherApplication() {
            axios
                .get(`/other_applications?customer_id=${this.$route.params.client_id}`)
                .then(res => {

                    this.other_applications = res.data.data;

                    this.insurance_types.forEach((it, index) => {
                        const exists = res.data.data.find(r => r.insurance_type == it.value);

                        if(exists) {
                            this.insurance_types.splice(index, 1);
                        }
                    });

                })
                .catch(err => console.log(err));
        },
        editApplication(application_id) {
            const application = this.other_applications.find(a => a.id == application_id);

            this.editing_application = application;
        },
        async getFilesOneDrive() {
            await MGraph.getOtherApplications(this.$router.currentRoute.params.client_id);
        },
        openDeleteModal(id){
            this.selected_item_id = id;

            this.dialog = {
                mode: 'error'
            }

            this.$refs.modal.dialogToggle(true);
        },
        deleteItem() {
            axios
                .delete("/other_applications/" + this.selected_item_id)
                .then(response => console.log(response.data))
                .catch(err => console.log(err));

            this.getOtherApplication(); 
        }
    },

    mounted() {
        this.getInsurances();
        this.getCustomerInfo();
        this.getOtherApplication();
    },

    computed: {
        addAvailable(){
            if(this.new_application.insurance_type != null && this.new_application.kvg != null && this.new_application.files.length > 0) {
                return true;
            }

            return false;
        },
        image_url() {
            return `@/assets/images/insurance_type/${this.new_application.insurance_type}.svg`;
        }
    },

    components: { SnackBar, ModalDialog }
}
</script>

<style scoped>
    .primary {
        background: #36a5dd;
    }

    .custom-buttons {
        margin-top: 10px;
        background: #36a5dd;
        box-shadow: 0px 2px 6px rgba(54, 165, 221, 0.2);
        border-radius: 5px;
        cursor: pointer;
        height: 36px;
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>