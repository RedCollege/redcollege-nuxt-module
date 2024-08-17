import { useSidebarStore } from '../stores/sidebarStore'
import { useAuthStore } from '../stores/authStore'

export const useSidebar = () => useSidebarStore()
export const useAuth = () => useAuthStore()
