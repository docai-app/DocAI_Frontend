import useAxios from 'axios-hooks';
import Api from '../../../apis';
import { useRef } from 'react';
import useAlert from '../../../hooks/useAlert';
import ErrorList from '../../common/Widget/ErrorList';

const apiSetting = new Api();

function ChangePassword() {
    const [{ data: putData, loading: putLoading, error: putError }, putPassword] = useAxios(
        apiSetting.User.updateMePassword(),
        { manual: true }
    );

    const formRef = useRef<HTMLFormElement>(null);
    const { setAlert } = useAlert();

    return (
        <div className="flex flex-col rounded-2xl bg-gray-100 px-12 py-6 border">
            <div className="flex flex-col">
                <h2 className="text-slate-900 font-bold text-xl ml-6 mb-6">更改密碼</h2>
                <form ref={formRef}>
                    <div className="col-span-2 rounded-t-lg bg-white p-6 shadow flex flex-col gap-6">
                        {!putData?.success && putData?.errors && (
                            <ErrorList errors={putData.errors} />
                        )}
                        <label className="flex flex-col gap-2">
                            <div>原密碼</div>
                            <input
                                type="password"
                                name="current_password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <div>新密碼</div>
                            <input
                                type="password"
                                name="password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <div>確認新密碼</div>
                            <input
                                type="password"
                                name="password_confirmation"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </label>
                    </div>
                    <div className="bg-gray-50 rounded-b-lg px-6 py-3 flex justify-end shadow-md">
                        <button
                            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                const formData = new FormData(formRef.current || undefined);
                                const data: any = {};
                                formData.forEach((value, key) => (data[key] = value));
                                putPassword({
                                    data
                                }).then((res) => {
                                    if (res.data?.success) {
                                        // request success
                                        setAlert({ title: '更改成功', type: 'success' });
                                    }
                                });
                            }}
                        >
                            變更密碼
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
