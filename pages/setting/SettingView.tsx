import { ShowCurrentUser } from './SettingContainer';
import Profile from '../../components/feature/setting/Profile';
import ChangePassword from '../../components/feature/setting/ChangePassword';
import { signIn, signOut } from 'next-auth/react';

interface SettingViewProps {
    currentUserData: ShowCurrentUser | undefined;
    currentUserLoading: boolean;
    session: any;
}
export default function SettingView({
    currentUserData,
    currentUserLoading,
    session
}: SettingViewProps) {
    return (
        <div className="flex flex-col gap-4 sm:pb-4">
            <Profile {...{ currentUserData, currentUserLoading }} />
            <ChangePassword />
            {session ? (
                // <>
                //     <img src={(session?.user?.image as string) || ''} alt={session?.user?.name} />
                //     <p className="text-center">{session?.user?.name}</p>
                //     <button className="w-full" onClick={() => signOut()}>
                //         Sign out
                //     </button>
                // </>
                <a href="#" className="group block flex-shrink-0">
                    <div className="flex items-center">
                        <div>
                            <img
                                className="inline-block h-9 w-9 rounded-full"
                                src={(session?.user?.image as string) || ''}
                                alt={session?.user?.name}
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                {session?.user?.name}{' '}
                                <span className="text-xs text-gray-500">
                                    {session?.user?.email}
                                </span>
                            </p>
                            <p
                                className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                                onClick={() => signOut()}
                            >
                                Sign out
                            </p>
                        </div>
                    </div>
                </a>
            ) : (
                <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        signIn('google', { params: { access_type: 'offline' } });
                    }}
                >
                    Connect Your Google Email
                </button>
            )}
        </div>
    );
}
