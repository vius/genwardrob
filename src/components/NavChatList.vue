<script setup lang="ts">
import { ref, nextTick } from 'vue'
import {
  Edit,
  MoreHorizontal,
  Trash2,
  Check,
  X,
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

defineProps<{
  chatList: {
    name: string
  }[]
}>()

const emit = defineEmits<{
  renameChat: [index: number, newName: string]
}>()

const { isMobile } = useSidebar()

// State for rename functionality
const editingIndex = ref<number | null>(null)
const editingName = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// Start editing a chat name
const startEditing = async (index: number, currentName: string) => {
  editingIndex.value = index
  editingName.value = currentName
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
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
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    saveEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>History</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="(item, index) in chatList" :key="item.name">
        <SidebarMenuButton class="relative">
          <!-- Show input field when editing, otherwise show the name -->
          <div v-if="editingIndex === index" class="flex items-center gap-2 w-full">
            <Input ref="inputRef" v-model="editingName" @keydown="handleKeydown" @blur="saveEdit"
              class="h-6 text-sm flex-1 min-w-0" />
            <div class="flex gap-1">
              <Button size="icon" variant="ghost" class="h-5 w-5" @click="saveEdit">
                <Check class="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" class="h-5 w-5" @click="cancelEdit">
                <X class="h-3 w-3" />
              </Button>
            </div>
          </div>
          <span v-else>{{ item.name }}</span>
        </SidebarMenuButton>

        <!-- Only show dropdown when not editing -->
        <DropdownMenu v-if="editingIndex !== index">
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48 rounded-lg" :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'">
            <DropdownMenuItem @click="startEditing(index, item.name)">
              <Edit class="text-muted-foreground" />
              <span>Rename Chat</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="text-red-500 hover:bg-red-100 focus:bg-red-100 hover:text-red-500 focus:text-red-500">
              <Trash2 class="text-red-500" />
              <span>Delete Chat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
