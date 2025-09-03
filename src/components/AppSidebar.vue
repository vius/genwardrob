<script setup lang="ts">
import { ref } from 'vue'
import type { SidebarProps } from '@/components/ui/sidebar'

import {
    Edit
} from 'lucide-vue-next'
import NavChatList from '@/components/NavChatList.vue'
import NavUser from '@/components/NavUser.vue'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenuButton,
    useSidebar
} from '@/components/ui/sidebar'
import HyperText from '@/components/ui/hyper-text/HyperText.vue'
import Logo from '@/assets/logo.png'
const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
})
const { open } = useSidebar()

// This is sample data.
const data = ref({
    projects: [
        {
            name: 'Design Engineering',
        },
        {
            name: 'Sales & Marketing & Trading & Shopping & Taking & Sales & Marketing & Trading & Shopping & Taking & Sales & Marketing & Trading & Shopping & Taking',
        },
        {
            name: 'Travel',
        },
    ],
})

// Handle chat rename
const handleChatRename = (index: number, newName: string) => {
    if (data.value.projects[index]) {
        data.value.projects[index].name = newName
    }
}
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader class="flex justify-between flex-row items-center ">
            <HyperText text="GenWardrobe" v-show="open" class="text-xl font-bold !py-[1px]" :duration="800"
                :animate-on-load="true" />
            <img :src="Logo" class="h-8 w-8" v-show="!open" />
        </SidebarHeader>
        <SidebarContent>
            <section class="px-3" :class="{ '!px-2': !open }">
                <SidebarMenuButton tooltip="New Chat" class="px-0">
                    <Edit class="text-muted-foreground" />
                    <span>Create New Chat</span>
                </SidebarMenuButton>
            </section>
            <NavChatList :chatList="data.projects" @rename-chat="handleChatRename" />
        </SidebarContent>
        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
