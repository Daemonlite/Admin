<script setup>
import { initialAbility } from '@/plugins/casl/ability'
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useJwt } from '@vueuse/integrations/useJwt'

const router = useRouter()
const ability = useAppAbility()

const token = JSON.parse(localStorage.getItem('userData'))
const encodedJwt = ref(token)
const { header, payload } = useJwt(encodedJwt)
const userData = payload.value

console.log(userData)

const logout = () => {

  // Remove "userData" from localStorage
  localStorage.removeItem('userData')

  // Remove "accessToken" from localStorage
  localStorage.removeItem('accessToken')
  router.push('/login').then(() => {

    // Remove "userAbilities" from localStorage
    localStorage.removeItem('userAbilities')

    // Reset ability to initial ability
    ability.update(initialAbility)
  })
}

const userProfileList = [
  {
    type: 'navItem',
    icon: 'mdi-account-outline',
    title: 'Profile',
    to: {
      name: 'apps-user-view-id',
      params: { id: userData.user_id },
    },
  },

  // {
  //   type: 'navItem',
  //   icon: 'mdi-cog-outline',
  //   title: 'settings',
  //   to: {
  //     name: 'pages-account-settings-tab',
  //     params: { tab: 'account' },
  //   },
  // },
  // {
  //   type: 'navItem',
  //   icon: 'mdi-credit-card-outline',
  //   title: 'Billing',
  //   to: {
  //     name: 'pages-account-settings-tab',
  //     params: { tab: 'billing-plans' },
  //   },
  //   badgeProps: {
  //     color: 'light-error',
  //     content: '3',
  //     textColor: 'error',
  //   },
  // },

  // { type: 'divider' },
  // {
  //   type: 'navItem',
  //   icon: 'mdi-lifebuoy',
  //   title: 'Help',
  //   to: { name: 'pages-help-center' },
  // },
  // {
  //   type: 'navItem',
  //   icon: 'mdi-currency-usd',
  //   title: 'Pricing',
  //   to: { name: 'pages-pricing' },
  // },
  // {
  //   type: 'navItem',
  //   icon: 'mdi-help-circle-outline',
  //   title: 'FAQ',
  //   to: { name: 'pages-faq' },
  // },
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'mdi-logout',
    title: 'Logout',
    onClick: logout,
  },
]

const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}
</script>

<template>
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar
      class="cursor-pointer"
      :color="!(userData && userData.avatar) ? 'primary' : undefined"
      :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
    >
      <VImg
        v-if="userData && userData.avatar"
        :src="userData.avatar"
      />
      <VIcon
        v-else
        icon="mdi-account-outline"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList density="comfortable">
          <!-- 👉 User Avatar & Name -->
          <VListItem height="60px">
            <template #prepend>
              <VListItemAction start>
                <VBadge v-bind="avatarBadgeProps">
                  <VAvatar
                    :color="!(userData && userData.avatar) ? 'primary' : undefined"
                    :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
                  >
                    <VImg
                      v-if="userData && userData.avatar"
                      :src="userData.avatar"
                    />
                    <VIcon
                      v-else
                      icon="mdi-account-outline"
                    />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-medium">
              {{ userData.fullName || userData.username }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userData.role }}</VListItemSubtitle>
          </VListItem>

          <VDivider />
          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :to="item.to"
                @click="item.onClick && item.onClick()"
              >
                <template #prepend>
                  <VIcon
                    class="me-2"
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template
                  v-if="item.badgeProps"
                  #append
                >
                  <VBadge
                    v-bind="item.badgeProps"
                    class="me-3"
                  />
                </template>
              </VListItem>

              <VDivider v-else />
            </template>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
