const navBar = {
    state: () => ({
        variant: window.innerWidth < 900 ? true : false,
        secondVariant: false
    }),
    actions: {
        toggleVariant({ state }) {
            state.variant = !state.variant;
            if(window.innerWidth >= 900) state.secondVariant = !state.variant;
        },
        toggleSecondVariant({ state }) {
            state.secondVariant = !state.secondVariant;
        },
    }
}

export default navBar;