import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FormEventHandler } from 'react';
import { Matrix } from '../../components/common/Widget/Martix';

interface LoginViewProps {
    signInData: any;
    signInLoading: any;
    signInError: any;
    handleSignIn: FormEventHandler;
}

export default function LoginView(props: LoginViewProps) {
    const { signInData, signInError, signInLoading, handleSignIn } = props;

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full flex z-10">
                <div className="w-full sm:w-1/2 h-full flex flex-col justify-center px-8 sm:px-28 bg-white">
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
                        ) : signInData && signInData.success ? (
                            <div className="flex flex-row gap-1 absolute -top-6 text-green-700">
                                <CheckIcon className="h-6 w-6" />
                                <div>登入成功！</div>
                            </div>
                        ) : (
                            signInError && (
                                <div className="flex flex-row gap-1 absolute -top-6 text-red-700">
                                    <XMarkIcon className="h-6 w-6" />
                                    <div>帳戶或密碼錯誤</div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="w-1/2 hidden sm:block">
                    <div className="w-full h-full flex  flex-col justify-center relative bg-black">
                        <div className="absolute w-full flex flex-col justify-center items-center z-50 animate__animated animate__bounce animate__fadeInUp duration-300">
                            <p className="flex justify-center items-center mx-auto text-9xl font-bold text-white z-50">
                                DocAI
                            </p>
                            <p className="flex justify-center items-center mx-auto text-3xl font-bold text-white z-50 ">
                                Improve your work efficiency
                            </p>
                        </div>
                        {/* Add the opacity-50 class to make the background image darker */}
                        <div className="relative h-full w-full">
                            <div className="absolute inset-0 bg-gradient-to-r opacity-30">
                                <Matrix />
                            </div>
                        </div>
                        {/* <img
                        alt=""
                        // src="https://source.unsplash.com/8fMj0tJcM2A/5464x3640"
                        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftxt207.book118.com%2F2017%2F0203%2Fbook88149%2F88148216.jpg&refer=http%3A%2F%2Ftxt207.book118.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665101485&t=1f7cfa84a8a98ef75fc9f5016940d6ed"
                        className="object-cover h-full w-full object-left"
                    /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
