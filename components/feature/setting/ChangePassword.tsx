import useAxios from 'axios-hooks';
import Api from '../../../apis';
import { useRef } from 'react';
import useAlert from '../../../hooks/useAlert';
import ErrorList from '../../common/Widget/ErrorList';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const apiSetting = new Api();

function ChangePassword() {
    const [{ data: putData, loading: putLoading, error: putError }, putPassword] = useAxios(
        apiSetting.User.updateMePassword(),
        { manual: true }
    );

    const formRef = useRef<HTMLFormElement>(null);

    const changePasswordFormik = useFormik({
        initialValues: {
            current_password: '',
            password: '',
            password_confirmation: ''
        },
        onSubmit: (data) => {
            putPassword({ data }).then((res) => {
                if (res.data?.success) {
                    // request success
                    setAlert({ title: '更改成功', type: 'success' });
                }
            });
        },
        validate: ({ password, password_confirmation, current_password }) => {
            const errors: any = {};
            if (password_confirmation !== password) {
                errors.password_confirmation = '與新密碼不同';
            }
            return errors;
        },
        validationSchema: object().shape({
            current_password: string().required('必須填寫'),
            password: string().required('必須填寫'),
            password_confirmation: string().required('必須填寫')
        }),
        validateOnChange: false
    });

    const { setAlert } = useAlert();

    return (
        <div className="flex flex-col rounded-2xl bg-gray-100 px-12 py-6 border">
            <div className="flex flex-col">
                <h2 className="text-slate-900 font-bold text-xl ml-6 mb-6">更改密碼</h2>
                <form ref={formRef} onSubmit={changePasswordFormik.handleSubmit}>
                    <div className="col-span-2 rounded-t-lg bg-white p-6 shadow flex flex-col gap-4">
                        {!putData?.success && putData?.errors && (
                            <ErrorList errors={putData.errors} />
                        )}
                        <label className="flex flex-col gap-2">
                            <div>原密碼</div>
                            <input
                                onChange={changePasswordFormik.handleChange}
                                value={changePasswordFormik.values.current_password}
                                type="password"
                                name="current_password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div className="text-xs text-red-500">
                                {changePasswordFormik.errors.current_password}
                            </div>
                        </label>
                        <label className="flex flex-col gap-2">
                            <div>新密碼</div>
                            <input
                                onChange={changePasswordFormik.handleChange}
                                value={changePasswordFormik.values.password}
                                type="password"
                                name="password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div className="text-xs text-red-500">
                                {changePasswordFormik.errors.password}
                            </div>
                        </label>
                        <label className="flex flex-col gap-2">
                            <div>確認新密碼</div>
                            <input
                                onChange={changePasswordFormik.handleChange}
                                value={changePasswordFormik.values.password_confirmation}
                                type="password"
                                name="password_confirmation"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div className="text-xs text-red-500">
                                {changePasswordFormik.errors.password_confirmation}
                            </div>
                        </label>
                    </div>
                    <div className="bg-gray-50 rounded-b-lg px-6 py-3 flex justify-end shadow-md">
                        <button
                            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
                            type="submit"
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
