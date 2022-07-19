import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { FormEventHandler } from 'react';

interface LoginViewProps {
    signInData: any;
    signInLoading: any;
    signInError: any;
    handleSignIn: FormEventHandler;
}

export default function LoginView(props: LoginViewProps) {
    const { signInData, signInError, signInLoading, handleSignIn } = props;
    return (
        <div className="w-screen h-screen relative">
            <div className="w-[44rem] max-w-full h-full flex-grow relative z-10">
                <div className="w-full h-full flex flex-col justify-center px-8 sm:px-28 bg-white">
                    <div className="flex flex-col relative">
                        <h1 className="font-bold text-5xl my-8">登入</h1>
                        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
                            <label>
                                <div className="text-slate-600">電子郵件</div>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    className="mt-1 border px-3 py-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full"
                                />
                            </label>
                            <label>
                                <div className="text-slate-600">密碼</div>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    className="mt-1 border px-3 py-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full"
                                />
                            </label>
                            <div className="flex flex-row">
                                <label className="flex flex-row items-center gap-1 mr-auto">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        className="rounded-md p-2 checked:text-slate-500 focus:ring-3 focus:ring-offset-0 focus:ring-slate-300 shadow"
                                    />
                                    <div>記住我</div>
                                </label>
                                <a className="text-indigo-600">忘記密碼?</a>
                            </div>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 text-white py-2 shadow"
                            >
                                登入
                            </button>
                        </form>
                        {signInLoading ? (
                            <div className="absolute -top-6 text-slate-500">登入中...</div>
                        ) : (
                            signInData &&
                            (signInData.success ? (
                                <div className="flex flex-row gap-1 absolute -top-6 text-green-700">
                                    <CheckIcon className="h-6 w-6" />
                                    <div>登入成功！</div>
                                </div>
                            ) : (
                                <div className="flex flex-row gap-1 absolute -top-6 text-red-700">
                                    <XIcon className="h-6 w-6" />
                                    <div>帳戶或密碼錯誤</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-0 h-full w-full">
                <img
                    src="https://source.unsplash.com/8fMj0tJcM2A/5464x3640"
                    className="object-cover h-full w-full object-left"
                />
            </div>
        </div>
    );
}
