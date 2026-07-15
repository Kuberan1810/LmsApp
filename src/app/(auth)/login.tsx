
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginCom from '@/features/auth/loginCom'

export default function Login() {
 
    return (
        <SafeAreaView className="flex-1 bg-white">
            <LoginCom />
        </SafeAreaView>
    )
}