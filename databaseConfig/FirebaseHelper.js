import Firebase, {auth} from "./firebase";

async function addUserToFirebase(result) {
    let user = result
    let response = await fetch('https://anubis-companion.herokuapp.com/login/addToFirebase/',
        {method: 'POST',
            body: JSON.stringify({user}),
            headers: {'Content-Type': 'application/json'}})
    response = await response.json()
    console.log(response)
    return response

}

export let login = async (googleUser, username = undefined, password = undefined, register = undefined) => {

    let info = {};
    if(googleUser) {
        let credential = auth.GoogleAuthProvider.credential(
            googleUser);
        try {// Sign in with credential from the Google user.
            let res = await Firebase.auth().signInWithCredential(credential)
            let final = await addUserToFirebase(res)
            if (final) {
                info = final

            }
        } catch (error) {
            info = {error: error}
        }
    }
    else if(username && password ) {
        try {
            let res = null
            if (register === true) {
                console.log('trying')
                console.log(username,password)
                try {
                    res = await Firebase.auth().createUserWithEmailAndPassword(username, password)
                    console.log(res)
                }
                catch (e) {
                    console.log(e)
                }
            }
            else if (register === false) {
                res = await Firebase.auth().signInWithEmailAndPassword(username, password)
            }

            let final = await addUserToFirebase(res)
            console.log(final)
            if (final) {
                info = final
            }
        }
        catch(error) {
            info = {error: error}
        }
    }

    if(info.hasOwnProperty('result')) {
        console.log(info.signIn)
        if (info.signIn === true)
            return ({firstLogin: info, screenName: 'SetBattleTagScreen', userId: info.result})
        else if (info.signIn === false) {
            return ({firstLogin: info, screenName: 'RankingScreen', userId: info.result})
        }
    }
    else
        return info

}

export const logOut = () => {
    Firebase.auth().signOut().then(()=>console.log('success')).catch((error)=>{console.log(error)})
}
