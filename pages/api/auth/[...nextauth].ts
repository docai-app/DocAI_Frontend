import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from 'next';

const GOOGLE_AUTHORIZATION_URL =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send email',
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code'
    });

// export const authOptions: any = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.NEXT_PUBLIC_GOOGLE_GMAIL_READ_INCOMING_CLIENT_ID || '',
//             clientSecret: process.env.NEXT_PUBLIC_GOOGLE_GMAIL_READ_INCOMING_CLIENT_SECRET || '',
//             authorization: {
//                 params: {
//                     prompt: 'consent',
//                     access_type: 'offline'
//                 },
//                 url: GOOGLE_AUTHORIZATION_URL
//             }
//         })
//     ],
//     session: {
//         strategy: 'jwt'
//     },
//     callbacks: {
//         async signIn({ user, account, profile }: any) {
//             console.log('Sign In User', user);
//             console.log('Sign In Account', account);
//             console.log('Sign In Profile', profile);

//             console.log('Local Storage Authorization: ', req.cookies.authorization);

//             if (account) {
//                 const params = {
//                     uid: user.id,
//                     access_token: account.access_token,
//                     refresh_token: account.refresh_token
//                 };
//                 const res = await fetch(
//                     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/auth/google_oauth2`,
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `Bearer ${account.id_token}`
//                         },
//                         body: JSON.stringify(params)
//                     }
//                 );
//                 const data = await res.json();
//                 console.log('Sign In Data: ', data);
//             }

//             return true;
//         },
//         async jwt({ token, account, profile }: any) {
//             console.log('Token', token);
//             console.log('Account', account);
//             console.log('Profile', profile);
//             console.log('Access Token', token.accessToken);
//             // Persist the OAuth access_token and or the user id to the token right after signin
//             if (account) {
//                 token.accessToken = account.access_token;
//                 token.id = profile.id;
//             }
//             return token;
//         },
//         async session({ session, token, user, account }: any) {
//             console.log('Session', session);
//             console.log('Token', token);
//             console.log('User', user);
//             console.log('Account', account);
//             return session;
//         }
//     }
// };

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId: process.env.NEXT_PUBLIC_GOOGLE_GMAIL_READ_INCOMING_CLIENT_ID || '',
                clientSecret:
                    process.env.NEXT_PUBLIC_GOOGLE_GMAIL_READ_INCOMING_CLIENT_SECRET || '',
                authorization: {
                    params: {
                        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send email',
                        prompt: 'consent',
                        access_type: 'offline'
                    },
                    url: GOOGLE_AUTHORIZATION_URL
                }
            })
        ],
        session: {
            strategy: 'jwt'
        },
        callbacks: {
            async signIn({ user, account, profile }: any) {
                console.log('Sign In User', user);
                console.log('Sign In Account', account);
                console.log('Sign In Profile', profile);

                if (account) {
                    const params = {
                        uid: user.id,
                        access_token: account.access_token,
                        refresh_token: account.refresh_token
                    };
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/auth/google_oauth2`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: req.cookies.authorization
                            },
                            body: JSON.stringify(params)
                        }
                    );
                    const data = await res.json();
                    console.log('Sign In Data: ', data);
                }

                return true;
            }
        }
    });
}

// export default NextAuth(authOptions);
