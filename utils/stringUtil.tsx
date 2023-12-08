import _ from 'lodash';

//判断是否是中文
const isChinese = (str: string) => {
    const lst = /[u00-uFF]/;
    return !lst.test(str);
};

//中英文混合计算字符长度
export const getStrTokens = (str: string) => {
    let strlength = 0;
    for (let i = 0; i < str.length; ++i) {
        if (isChinese(str.charAt(i)) == true) strlength = strlength + 2; //中文计算为2个字符
        else strlength = strlength + 1; //中文计算为1个字符
    }
    if (strlength > 0) {
        strlength = Math.ceil(strlength / 2);
    }
    return strlength;
};

export const getTransitionChartContent = (html: string, position: number) => {
    const regex = /id="([^"]+)"/g;
    let match;
    const ids = [];

    while ((match = regex.exec(html)) !== null) {
        ids.push(match[1]);
    }
    _.map(ids, function (id) {
        html = html.replaceAll(id, id + position);
    });
    return html;
};
