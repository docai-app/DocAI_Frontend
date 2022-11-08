function findHasPropertiesObject(object: any, matchedData: any[] = []): any[] {
    if (typeof object === 'object') {
        for (const key in object) {
            if (object[key].hasOwnProperty('properties')) {
                findHasPropertiesObject(object[key].properties, matchedData);
            } else {
                matchedData.push({
                    keyName: key,
                    title: object[key].title,
                    value: ''
                });
            }
        }
    }
    return matchedData;
}

function findHasDataObject(object: any, matchedData: any[] = []): any[] {
    if (typeof object === 'object') {
        for (const key in object) {
            if (typeof object[key] !== 'object') {
                matchedData.forEach((element) => {
                    if (element.keyName === key) {
                        element.value = object[key];
                    }
                });
            } else {
                findHasDataObject(object[key], matchedData);
            }
        }
    }
    return matchedData;
}

export function getDownloadFields(metchedData: any[] = []) {
    const fields: any[] = [];
    metchedData.forEach((element) => {
        fields.push({
            label: element.title,
            value: element.keyName
        });
    });
    return fields;
}

export function matchFormSchemaAndFormData(form_schema: any = {}, form_data: any = {}): any[] {
    let metchedData: any[] = [];
    metchedData = findHasPropertiesObject(form_schema.properties, metchedData);
    metchedData = findHasDataObject(form_data, metchedData);
    return metchedData;
}
