import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { useToast } from "vue-toast-notification"
import routes from '~pages'
import { useJwt } from '@vueuse/integrations/useJwt'

import { isUserLoggedIn } from './utils'

const toast = useToast()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ℹ️ We are redirecting to different pages based on role.
    // NOTE: Role is just for UI purposes. ACL is based on abilities.
    {
      path: '/',
      redirect: to => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const userRole = (userData && userData.role) ? userData.role : null

        console.log(userRole)
        if (userRole === 'admin')
          return { name: 'dashboards-crm' }
        if (userRole === 'client')
          return { name: 'access-control' }
        
        return { name: 'login', query: to.query }
      },
    },
    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    {
      path: '/pages/account-settings',
      redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
    },
    ...setupLayouts(routes),
  ],
})


// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn()
  const loginPaths = ['/login', '/']
  const token = JSON.parse(localStorage.getItem('userData'))
  const encodedJwt = ref(token)
  const { header, payload } = useJwt(encodedJwt)
  const userData = payload.value

  let tokenExpirySeconds = userData ? userData.exp : null
  console.log(userData)

  console.log(`Login Status : ${isLoggedIn}`)
  
  if (tokenExpirySeconds !== null) {
    const tokenExpiryMilliseconds = tokenExpirySeconds * 1000
    const expiryDate = new Date(tokenExpiryMilliseconds)
    const currentDate = new Date()

    console.log(`Token expires on: ${expiryDate}`)
    
    if (expiryDate <= currentDate) {
      console.log('Token expired')
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userData")
      localStorage.removeItem("userAbilities")
      toast.error("Your session has expired. Please login again.")
      next({ name: 'login', query: to.query })
    } else{
      next()
    }
  } else {
    if (isLoggedIn && loginPaths.includes(to.path)) {
      console.log('Redirect to dashboard')
      next({ path: 'dashboards/crm' })
    } else if (!isLoggedIn && to.name !== 'login') {
      next({ name: 'login', query: to.query })
    } else {
      next()
    }
  }
})

export default router
