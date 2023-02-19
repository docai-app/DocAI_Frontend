import _ from 'lodash';

function ErrorList({ errors }: { errors: any }) {
    return (
        <>
            {Object.entries(errors).map(([key, errors]) => (
                <li key={key + errors} className="text-red-600">{`${_.upperFirst(
                    _.join(key.split('_'), ' ')
                )} ${_.join(errors as string[], ' and ')}`}</li>
            ))}
        </>
    );
}

export default ErrorList;
