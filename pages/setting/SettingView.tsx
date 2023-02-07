import { FormEventHandler, RefObject } from 'react';
import { ShowCurrentUser } from './SettingContainer';

interface SettingViewProps {
    currentUserData: ShowCurrentUser | undefined;
    currentUserLoading: boolean;
    formSubmit: FormEventHandler;
    formRef: RefObject<HTMLFormElement>;
}
export default function SettingView({
    currentUserData,
    currentUserLoading,
    formSubmit,
    formRef
}: SettingViewProps) {
    return (
        <div className="flex flex-col rounded-2xl bg-slate-100 px-12 py-6 border">
            <div className="flex flex-col">
                <h2 className="text-slate-900 font-bold text-xl ml-6 mb-6">帳戶</h2>
                {currentUserLoading ? (
                    <div className="col-span-2 rounded-lg bg-white p-6 shadow flex flex-col gap-6">
                        載入中...
                    </div>
                ) : (
                    currentUserData?.success && (
                        <form ref={formRef} onSubmit={formSubmit}>
                            <div className="col-span-2 rounded-t-lg bg-white p-6 shadow flex flex-col gap-6">
                                <label className="flex flex-col gap-2">
                                    <div>用戶暱稱</div>
                                    <input
                                        type="text"
                                        name="nickname"
                                        defaultValue={currentUserData?.user?.nickname || ''}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <div>電話號碼</div>
                                    <input
                                        type="text"
                                        name="phone"
                                        defaultValue={currentUserData?.user?.phone || ''}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <div>職位</div>
                                    <input
                                        type="text"
                                        name="position"
                                        defaultValue={currentUserData?.user?.position || ''}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </label>
                                <div className="grid grid-cols-2 gap-6">
                                    <label className="flex flex-col gap-2">
                                        <div>出生日期</div>
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            defaultValue={
                                                currentUserData?.user?.date_of_birth || ''
                                            }
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        <div>性別</div>
                                        <div className="flex gap-4">
                                            <label className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name="sex"
                                                    value="male"
                                                    defaultChecked={
                                                        currentUserData?.user?.sex === 'male'
                                                    }
                                                />
                                                <span>男</span>
                                            </label>
                                            <label className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name="sex"
                                                    value="female"
                                                    defaultChecked={
                                                        currentUserData?.user?.sex === 'female'
                                                    }
                                                />
                                                <span>女</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-b-lg px-6 py-3 flex justify-end shadow-md">
                                <button className="text-white bg-indigo-600 px-4 py-2 rounded-lg">
                                    保存
                                </button>
                            </div>
                        </form>
                    )
                )}
            </div>
        </div>
    );
}
