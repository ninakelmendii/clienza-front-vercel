import axios from "axios";

const profileImage = {
    state: () => ({
        img_data: '',
        img_path: null,
        info_changed: false
    }),
    actions: {
        getImage({ state }) {
            axios
                 .get('/profile_img')
                 .then(response => {
                    if(!response.data.data) {
                        return;
                    }

                    const back_url = "https://back.crmclienza.ch/public/storage";
                    // const back_url = "https://clienza-api.rockapps.pw/public/storage";

                    state.img_path = `${back_url}/${response.data.data.img_path}`;
                    state.img_data = response.data.data;
                    console.log("PROFILE", response.data.data);
                 }).catch(err => console.log(err));
        },
        updateChanges({ state }, value) {
            state.info_changed = value;
        }
    }
}

export default profileImage;