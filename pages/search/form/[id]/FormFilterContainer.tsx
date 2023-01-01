import Api from '../../../../apis';
import FormFilterView from './FormFilterView';

const apiSetting = new Api();

export default function FormFilterContainer() {
    return <FormFilterView {...{}} />;
}
