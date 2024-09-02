import { useSidebarStore } from '../stores/sidebarStore'
import { useAuthStore } from '../stores/authStore'
import { useNavbarStore } from '../stores/navbarStore'

export const useSidebar = () => useSidebarStore()
export const useAuth = () => useAuthStore()
export const useNavbar = () => useNavbarStore()


