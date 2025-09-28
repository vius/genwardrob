<script setup lang="ts">
import { ref } from 'vue'
import type { SidebarProps } from '@/components/ui/sidebar'
import { Edit } from 'lucide-vue-next'
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
import { useRouter } from 'vue-router'
import { get } from '@/utils/request'
import localforage from 'localforage';

const router = useRouter()
const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
})
const { open } = useSidebar()

const data: any = ref([])
const getDeletedIdList = async () => {
    const dataString: any = await localforage.getItem(deletedIdListKey)
    const ids = dataString ? JSON.parse(dataString) : []
    return ids
}
const getHistoryList = async () => {
    const { list = [] } = await get('/conversation/list')
    const ids = await getDeletedIdList()
    const res: any = []
    for await (const item of list) {
        const cacheTitle = await localforage.getItem(item.id)
        console.log('cacheTitle', cacheTitle)
        if (ids.includes(item.id)) {
            continue
        }
        res.push({
            ...item,
            title: cacheTitle ? cacheTitle : item.title
        })
    }
    data.value = res
    console.log('data.va;ie', data.value)
}
getHistoryList()

const handleChatRename = (index: number, newName: string) => {
    const item = data.value[index]
    if (item) {
        item.title = newName
        localforage.setItem(item.id, newName)
    }
}
const deletedIdListKey = 'deleted-chat-id-list'
const deleteChat = async (id: string) => {
    const ids = await getDeletedIdList()
    ids.push(id)
    localforage.setItem(deletedIdListKey, JSON.stringify(ids))
    data.value = data.value.filter((item: any) => item.id !== id)
}
const jump2home = () => {
    router.replace({
        path: '/'
    })
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
            <section class="px-2" :class="{ '!px-2': !open }">
                <SidebarMenuButton tooltip="New Chat" class="px-2" @click="jump2home">
                    <Edit class="text-muted-foreground mr-1" />
                    <span>Create New Chat</span>
                </SidebarMenuButton>
            </section>
            <NavChatList :chatList="data" @rename-chat="handleChatRename" @delete-chat="deleteChat" />
        </SidebarContent>
        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
