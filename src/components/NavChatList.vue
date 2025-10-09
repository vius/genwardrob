<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Edit,
  MoreHorizontal,
  Trash2,
} from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter, useRoute } from 'vue-router'
import { useWardrobeStore } from '@/stores/wardrobe'
const wardrobeStore = useWardrobeStore()
const router = useRouter()
const route = useRoute()
defineProps<{
  chatList: {
    title: string,
    id: string
  }[]
}>()

const emit = defineEmits<{
  renameChat: [index: number, newName: string],
  deleteChat: [id: string],
}>()

const { isMobile } = useSidebar()

const editingIndex = ref<number | null>(null)
const editingName = ref('')
const dialogOpen = ref(false)

const startEditing = (index: number, currentName: string) => {
  editingIndex.value = index
  editingName.value = currentName
  dialogOpen.value = true
}

const deleteConversation = (id: string) => {
  emit('deleteChat', id)
}
// Save the edited name
const saveEdit = () => {
  if (editingIndex.value !== null && editingName.value.trim()) {
    emit('renameChat', editingIndex.value, editingName.value.trim())
  }
  cancelEdit()
}

// Cancel editing
const cancelEdit = () => {
  editingIndex.value = null
  editingName.value = ''
  dialogOpen.value = false
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    saveEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}

const jump2Detail = (id: string) => {
  console.log('jump2Detail>>>>', id)
  wardrobeStore.initConversation(id)
  router.push(`/conversation/${id}`)
}

const currentChatId = computed(() => {
  if (route.path.startsWith('/conversation/')) {
    return route.path.split('/')[2]
  }
  return ''
})
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>History</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="(item, index) in chatList" :key="item.title">
        <SidebarMenuButton class="relative" :class="{ '!bg-gray-200': item.id === currentChatId }">
          <span @click="jump2Detail(item.id)">{{ item.title }}</span>
        </SidebarMenuButton>

        <!-- Dropdown menu -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48 rounded-lg" :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'">
            <DropdownMenuItem @click="startEditing(index, item.title)">
              <Edit class="text-muted-foreground" />
              <span>Rename Chat</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="deleteConversation(item.id)"
              class="text-red-500 hover:bg-red-100 focus:bg-red-100 hover:text-red-500 focus:text-red-500">
              <Trash2 class="text-red-500" />
              <span>Delete Chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>

    <!-- Dialog for editing chat name -->
    <Dialog v-model:open="dialogOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
          <DialogDescription>
            Rename the conversation title
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <Input v-model="editingName" @keydown="handleKeydown" autofocus class="text-sm" placeholder="聊天名称" />
        </div>
        <DialogFooter>
          <Button type="submit" @click="saveEdit">Save</Button>
          <Button type="button" variant="outline" @click="cancelEdit">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </SidebarGroup>
</template>
