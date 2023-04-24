class StubFirebase {
    /*
    so that this works in LoginScreen:
    firebase.messaging().getToken().then(onSuccess)
    */
    messaging = () => {
        console.log("now returning token");
        return { getToken: () => this.getToken() }
    }

    getToken = () => {
        return new Promise((resolve, reject) => {
            resolve("0000000000");
        })
    }
}

const stubFirebase = new StubFirebase()

export default stubFirebase