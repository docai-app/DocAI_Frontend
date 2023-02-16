import { ShowCurrentUser } from './SettingContainer';
import Profile from '../../components/feature/setting/Profile';
import ChangePassword from '../../components/feature/setting/ChangePassword';

interface SettingViewProps {
    currentUserData: ShowCurrentUser | undefined;
    currentUserLoading: boolean;
}
export default function SettingView({ currentUserData, currentUserLoading }: SettingViewProps) {
    return (
        <div className="flex flex-col gap-4">
            <Profile {...{ currentUserData, currentUserLoading }} />
        </div>
    );
}
