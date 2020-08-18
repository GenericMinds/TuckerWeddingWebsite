import { FacebookUserConnectionModel } from '../_models/FacebookUserConnectionModel';

declare const FB: any;

export async function initializeFacebook(): Promise<void> {
    console.log(process.env.FACEBOOK_APP_ID);
    await FB.init({
        appId      : process.env.FACEBOOK_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v7.0'
    });
}

export async function getFacebookConnection(): Promise<FacebookUserConnectionModel> {
    let facebookUser: FacebookUserConnectionModel = {
        isLoggedIn: false,
        facebookUserId: ''
    };

    const facebookLoginStatus: any = await new Promise(resolve => FB.getLoginStatus(resolve));
    if (facebookLoginStatus.status === 'connected') {
        facebookUser.facebookUserId = facebookLoginStatus.authResponse.userID;
        facebookUser.isLoggedIn = true;   
    } 

    return facebookUser;
}

export async function toggleFacebookLogIn(): Promise<FacebookUserConnectionModel> {
    let facebookUser: FacebookUserConnectionModel = {
        isLoggedIn: false, 
        facebookUserId: ''
    };
    
    await getFacebookConnection().then(async (facebookConnectionUser: FacebookUserConnectionModel) => {
        if (facebookConnectionUser.isLoggedIn) {
            await new Promise (resolve => FB.logout(resolve)); 
            facebookUser.isLoggedIn = false;
            facebookUser.facebookUserId = '';
        } else {
            let loggedIn: any = await new Promise (resolve => FB.login(resolve));
            facebookUser.isLoggedIn = true;
            facebookUser.facebookUserId = loggedIn.authResponse.userID;
        }
    });

    return facebookUser;
}