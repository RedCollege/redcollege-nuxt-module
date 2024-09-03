import { useSidebarStore } from '../stores/sidebarStore'
import { useAuthStore } from '../stores/authStore'
import { useNavbarStore } from '../stores/navbarStore'
import { useToast } from '../components/ui/toast/'
import { useForm as useVeeForm } from 'vee-validate'

export const useSidebar = () => useSidebarStore()
export const useAuth = () => useAuthStore()
export const useNavbar = () => useNavbarStore()

export const useNotification = () => useToast()
export const useForm = () => useVeeForm()
