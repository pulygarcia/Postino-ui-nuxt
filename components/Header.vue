<script setup>
    const itemSize = 20;

    const navItems = [
        {
            name: 'Cashier',
            path: '/cashier',
            icon: 'mdi:account-cash'
        },
        {
            name: 'Login',
            path: '/login',
            icon: 'mdi:login'
        },
        {
            name: 'Menu',
            path: '/menu',
            icon: 'mdi:list-box-outline'
        },
        {
            name: 'Staff',
            path: '/staff',
            icon: 'mdi:account-group'
        },
        {
            name: 'Earnings history',
            path: '/history',
            icon: 'mdi:history'
        },
        {
            name: 'Settings',
            path: '/settings',
            icon: 'mdi:account-settings-variant'
        }
    ]

    const isOpenMenu = ref(false);

    const openMenu = () => {
        isOpenMenu.value = true;
    }
    const closeMenu = () => {
        isOpenMenu.value = false;
    }
</script>

<template>
   <header class="md:container mx-auto w-11/12 md:w-full flex justify-between items-center py-4 border-b border-gray-200">
        <div class="">
            <NuxtLink to="/" class="flex items-center gap-2">
                <Logo />
                <p class="text-lg uppercase font-semibold text-blue-400">Il Postino</p>
            </NuxtLink>
        </div>
    
        <nav class="hidden md:block">
            <ul class="flex gap-10">
                <li 
                    v-for="item in navItems"
                    class="text-sm font-semibold hover:bg-gray-100 rounded p-2"
                >
                    <NuxtLink :to="item.path" class="flex items-center gap-1">
                        <Icon :name="item.icon" color="black" :size="itemSize + 'px'"/>

                        <span>{{item.name}}</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>

        <!-- open menu -->
        <Icon name="mdi:menu" color="black" size="30px" class="cursor-pointer md:hidden" @click="openMenu"/>
        <!-- open menu -->

        <div 
            v-if="isOpenMenu" 
            class="burguer-menu bg-white p-12 absolute right-0 top-0 h-screen z-40 shadow-2xl" 
            :class="isOpenMenu ? 'animate-fade-left animate-duration-300' : ''"
        >
            <!-- Close menu -->
            <button class="close-menu rounded" @click="closeMenu">
                <Icon name="mdi:window-close" size="30px"/>
            </button>

            <nav>
                <div class="flex items-center gap-2 mt-4">
                    <p class=" font-semibold text-lg text-blue-400">Il Postino &copy;</p>
                    <Logo />
                </div>
                <ul class="flex flex-col mt-8 space-y-6">
                    <li 
                        v-for="item in navItems"
                        class="text-sm font-semibold bg-gray-100 hover:bg-gray-200 rounded p-2"
                    >
                        <NuxtLink :to="item.path" class="flex items-center justify-center gap-1">
                            <Icon :name="item.icon" color="black" :size="itemSize + 'px'"/>

                            <span>{{item.name}}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
   </header>
</template>