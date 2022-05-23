import Image from 'next/image';

function InitialView() {
    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">文檔分類</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <p className="mb-2 text-lg">初步標記(1/10)</p>
                            <div className="flex justify-center items-center p-4 border-4 border-dashed border-gray-200 bg-white rounded-lg h-80vh">
                                <div className="left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-5/6 border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                        <Image
                                            width={100}
                                            height={100}
                                            layout="responsive"
                                            objectFit="contain"
                                            objectPosition="center"
                                            src="https://www.myperfectresume.com/wp-content/uploads/2021/07/human-resources-manager-cv-sample.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                </div>
                                <div className="right-side flex-1">
                                    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                                        <div className="mx-auto w-full max-w-sm lg:w-96">
                                            <div>
                                                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                                    文檔的類型
                                                </h2>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    預先輸入文檔的類型讓機械更容易學習
                                                </p>
                                            </div>
                                            <div className="mt-8">
                                                <div className="mt-6">
                                                    <form
                                                        action="#"
                                                        method="POST"
                                                        className="space-y-6"
                                                    >
                                                        <div>
                                                            <label
                                                                htmlFor="email"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                選擇現有的類型
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    id="email"
                                                                    name="email"
                                                                    type="email"
                                                                    autoComplete="email"
                                                                    required
                                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="min-w-fit ml-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                >
                                                                    新增類型
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <label
                                                                htmlFor="new-type"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                選擇現有的類型
                                                            </label>
                                                            <div className="flex mt-1">
                                                                <select
                                                                    id="new-type"
                                                                    name="new-type"
                                                                    className="mt-1 w-full block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                                    defaultValue="更表"
                                                                >
                                                                    <option>更表</option>
                                                                    <option>請假紙</option>
                                                                    <option>CV</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                type="submit"
                                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                確認
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default InitialView;
