<template>
    <v-dialog v-model="dialog" max-width="550px">
        <v-card>
        <v-row no-gutters no-wrap style="padding: 24px;">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y ="4" width="48" height="48" rx="24" fill="#D1FADF"/>
                <path d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#039855" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="8"/>
            </svg>
            <div style="margin-left: 16px;">
                <v-card-title class="text-h5 p-0">{{ title }}</v-card-title>
                <v-card-text class="p-0" style="margin-top: 4px;">This lead will be upgraded and saved as a customer</v-card-text>
            </div>
        </v-row>
        <v-card-actions class="justify-end">
            <!-- <v-spacer></v-spacer> -->
            <button @click="dialog = !dialog" class="btn btn-cancel"
                >Cancel</button
            >
            <button
                color="blue darken-1"
                text
                @click="deleteItemModalConfirm()"
                class="btn btn-ok"
                >Confirm</button
            >
            <!-- <v-spacer></v-spacer> -->
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'DialogModal',
        data(){
            return {
                dialog: true
            }
        },
        props: {
            title: String,
            body: String,
        }
    }
</script>

<style>
.p-0 {
    padding: 0 !important;
}

.btn {
    padding: 10px 18px !important;
    min-width: 84px !important;
    min-height: 44px !important;
    border-radius: 8px;
}

.btn-cancel {
    border: 1px solid #D0D5DD;
    background: white;
}

.btn-ok {
    background: #36A5DD;
    color: white;
    margin-left: 12px;
}
</style>