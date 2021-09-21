import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from '@ui-kitten/components';
export const SignIn = (props) => {
    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '745868178409-3n4m86f2ior6ouohqjee3vgonb86769g.apps.googleusercontent.com',
        // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
         webClientId: '745868178409-n9rumve2sv91q2abjh5da4k6jf3n0871.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        console.log(response)
        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <Button
            disabled={!request}
            onPress={() => {
                promptAsync();
            }}
            >Login
        </Button>
    );
}
