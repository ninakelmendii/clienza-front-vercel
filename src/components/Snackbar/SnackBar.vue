<template>
     <v-snackbar color="white" v-model="show" timeout="4000" width="auto" rounded="13px" height="100px">
            <!-- <img @click="toggleSnackbar()" src="@/assets/images/icons/close_snackbar.png" alt="close snackbar" style="position: absolute; right: 16px; top: 13px; cursor: pointer"> -->
            <div>
                <v-row no-gutters no-wrap style="padding: 0; flex-wrap: nowrap;">
                    <svg v-if="data.error" width="58" height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="5" width="48" height="48" rx="24" fill="#FEE4E2"/>
                        <rect x="4" y="5" width="48" height="48" rx="24" stroke="#FEF3F2" stroke-width="8"/>
                        <path d="M19.9662 34.367L33.2244 21.1087L35.4743 23.3586L22.216 36.6169L19.9662 34.367ZM19.9662 23.3586L22.216 21.1087L35.4743 34.367L33.2244 36.6169L19.9662 23.3586Z" fill="#D92D20"/>
                    </svg>
                    <svg v-else width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF"/>
                        <path d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#039855" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="8"/>
                    </svg>
                    <div style="margin-left: 12px; display: flex; justify-content: center;">
                        <v-card-title class="p-0" style="font-size: 16px;">{{translate(data.message)}}</v-card-title>
                        <!-- <v-card-text class="p-0" style="margin-top: 4px;">{{ translate(message) }}</v-card-text> -->
                    </div>
                </v-row>
                <!-- <v-card-actions class="justify-end"> -->
                    <!-- <button @click="toggleSnackbar" class="btn btn-cancel"
                        >{{ translate('Cancel') }}</button
                    > -->
                    <!-- <button
                        color="blue darken-1"
                        text
                        @click="declineUser()"
                        class="btn btn-decline"
                        >{{translate('Confirm')}}</button
                    > -->
                <!-- </v-card-actions> -->
            </div>
     </v-snackbar>
</template>

<script>
    import * as LANGUAGE from '../../store/language.json';

    export default {
        name: 'SnackBar',
        props: ['data'],
        data(){return {
            show: false
        }},
        methods: {
            toggleSnackbar(fixed_state = undefined) {
                fixed_state ? this.show = fixed_state
                            : this.show = !this.show;
            },
            translate(word) {
                let wordIndex = null;
                if(!word) return word;

                LANGUAGE.forEach((lng, index) => {
                    if(lng.english.toLowerCase() == word.toLowerCase()) {
                        wordIndex = index;
                    }
                });

                if(wordIndex === null) {
                return word;
                }

                if(this.$store.state.language == 'german') {
                    return LANGUAGE[wordIndex].german;
                } else {
                    return LANGUAGE[wordIndex].english;
                }
            },
        },
    
    }
</script>

<style scoped>
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

  .v-snack__content {
    padding: 0 !important;
  }
</style>