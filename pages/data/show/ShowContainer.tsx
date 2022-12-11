import Api from '../../../apis';
import ShowView from './ShowView';

const apiSetting = new Api();

export default function DataContainer() {
    return <ShowView {...{}} />;
}