import Firebase, {auth} from "./firebase";

async function addUserToFirebase(result) {
    let signIn = {signIn: false, result: result.user.uid}

    if(result.additionalUserInfo.isNewUser) {
        signIn.signIn = true
        await Firebase.database().ref('/users/' + result.user.uid).update(
            {email: result.user.email}
        )
    }
    return signIn
}

export let login = async (googleUser, username = undefined, password = undefined) => {

    let info = {};
    console.log(googleUser)
    if(googleUser) {
        let credential = auth.GoogleAuthProvider.credential(
            googleUser);
        try {// Sign in with credential from the Google user.
            let res = await Firebase.auth().signInWithCredential(credential)
            console.log(res)
            let final = await addUserToFirebase(res)
            if (final) {
                info = final

            }
        } catch (error) {
            info = {error: error}
        }
    }
    else if(username && password) {
        try {
            let res = await auth.signInWithEmailAndPassword(username, password)
            let final = await addUserToFirebase(res)
            if (final) {
                info = final
            }
        }
        catch(error) {
            info = {error: error}
        }
    }

    if(info.hasOwnProperty('result')) {
        if (info.signIn === true)
            return ({firstLogin: info, screenName: 'SetBattleTagScreen', userId: info.result})
        else if (info.signIn === false) {
            return ({firstLogin: info, screenName: 'RankingScreen', userId: info.result})
        }
    }
    else
        return info

}
