<template>
    <div>
        <v-dialog v-model="dialog" max-width="550px">
            <v-card>
            <v-row no-gutters no-wrap style="padding: 24px;">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2"/>
                <path d="M32 22V21.2C32 20.0799 32 19.5198 31.782 19.092C31.5903 18.7157 31.2843 18.4097 30.908 18.218C30.4802 18 29.9201 18 28.8 18H27.2C26.0799 18 25.5198 18 25.092 18.218C24.7157 18.4097 24.4097 18.7157 24.218 19.092C24 19.5198 24 20.0799 24 21.2V22M26 27.5V32.5M30 27.5V32.5M19 22H37M35 22V33.2C35 34.8802 35 35.7202 34.673 36.362C34.3854 36.9265 33.9265 37.3854 33.362 37.673C32.7202 38 31.8802 38 30.2 38H25.8C24.1198 38 23.2798 38 22.638 37.673C22.0735 37.3854 21.6146 36.9265 21.327 36.362C21 35.7202 21 34.8802 21 33.2V22" stroke="#D92D20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF3F2" stroke-width="8"/>
                </svg>
                <div style="margin-left: 16px;">
                    <v-card-title class="text-h5 p-0">{{translate('Delete')}}</v-card-title>
                    <v-card-text class="p-0" style="margin-top: 4px;">{{ translate('Are you sure you want to delete this item?') }}</v-card-text>
                </div>
            </v-row>
            <v-card-actions class="justify-end">
                <button @click="dialog = !dialog" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                    >{{ translate('Cancel') }}</button
                >
                <button
                    color="blue darken-1"
                    text
                    @click="confirm"
                    class="btn btn-decline"
                    >{{translate('Confirm')}}</button
                >
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
    import * as LANGUAGE from '../../store/language.json';

    export default {
        name: "ModalDialog",
        props: ["title", "description", "mode"],
        data(){return {
            dialog: false
        }},
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
            dialogToggle(value = !this.dialog) {
                this.dialog = value;
            },
            confirm() {
                this.$emit('confirmCallback');
                this.dialog = false;
            }
        }
    }
</script>

<style>
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

  .btn-decline {
    background-color: #D92D20;
    color: white;
    margin-left: 12px;
  }
</style>