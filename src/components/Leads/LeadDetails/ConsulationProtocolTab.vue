<template>
    <div>

        <v-btn color="#36a5dd" style="color: white" v-if="protocols == null">{{ translate('Loading') }}</v-btn>
        <div v-else>
            <v-row>
                <v-col col="12" md="4" v-for="protocol in protocols" :key="protocol.id" style="cursor: pointer;" @click="$router.push('/steps/'+$router.currentRoute.params.id+'/'+protocol.id)">
                    <div style="margin: auto; display: flex; flex-direction: column; border-radius: 20px; overflow: hidden;">
                        <img src="@/assets/images/thumbnails/protokol.jpg" alt="protocol" style=" object-fit: center;">
                        <div style="background-color: white; text-align: center; padding: 5px">
                            {{ translate('Created date') }} {{ protocol.created_at | moment("DD.MM.YYYY HH:mm") }}
                            <!-- Termin {{ getProtocolTermin(protocol) }} -->
                        </div>
                        <v-btn @click="$router.push('/steps/'+$router.currentRoute.params.id+'/'+protocol.id)" color="#36a5dd" style="color: white">{{ translate('Edit') }}</v-btn>
                    </div>
                </v-col>
                <v-col col="12" md="4" style="cursor: pointer; padding: 12px; min-height: 200px;" @click="$router.push('/steps/'+$router.currentRoute.params.id+'/'+null)">
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction:column;border: 1px dashed black; border-radius: 20px;">
                        <v-icon>mdi-plus</v-icon>
                        <h3>{{ translate('Add new') }}</h3>
                        <!-- <v-btn @click="$router.push('/steps/'+$router.currentRoute.params.id)" color="#36a5dd" style="color: white">{{ translate('Edit') }}</v-btn> -->
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import * as LANGUAGE from '../../../store/language.json';

    export default {
        name: 'ConsulationProtocol',
        data(){return {
            protocols: null
        }},
        methods: {
            translate(word) {
                let wordIndex = null;

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
            getProtocolTermin(protocol) {
                const { protocol_info }  = protocol;
                const parsedInfo = JSON.parse(JSON.parse(protocol_info));

                return parsedInfo[5].datum
            },
            getProtocol(){
                axios
                    .get('/protocol?lead_id=' + this.$router.currentRoute.params.id)
                    .then(res => this.protocols = res.data.protocols)
                    .catch(err => console.log(err));
            } 
        },
        created() {
            this.getProtocol();
        }
    }
</script>