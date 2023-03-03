import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { signInWithGooglePopup
        ,signInWithGoogleRedirect
        ,createUserDocumentFromAuth
         } from '../../utils/firebase/firebase.utils';
import SignupForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    
    const logGoogleUser = async () => {

        const { user } = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignupForm />
        </div>
    );
};


export default SignIn;