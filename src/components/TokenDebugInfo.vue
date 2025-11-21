<!-- Token 狀態監控組件（開發用） -->
<template>
  <div v-if="showDebugInfo" class="token-debug-info">
    <div class="debug-header" @click="toggleExpanded">
      🔐 Token 狀態 <span v-if="!expanded">{{ tokenStatus }}</span>
    </div>
    <div v-if="expanded" class="debug-content">
      <div class="debug-row">
        <strong>狀態:</strong> 
        <span :class="tokenInfo?.isValid ? 'status-valid' : 'status-invalid'">
          {{ tokenInfo?.isValid ? '有效' : '無效/過期' }}
        </span>
      </div>
      <div v-if="tokenInfo?.isValid" class="debug-row">
        <strong>剩餘:</strong> 
        {{ tokenInfo.remainingHours }}h {{ tokenInfo.remainingMinutes % 60 }}m
      </div>
      <div v-if="tokenInfo?.expiryTime" class="debug-row">
        <strong>過期:</strong> 
        {{ formatTime(tokenInfo.expiryTime) }}
      </div>
      <div class="debug-row">
        <strong>用戶:</strong> {{ userInfo.name || '未登入' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useInputStore } from '../stores/useInputStore';

const inputStore = useInputStore();
const expanded = ref(false);

// 只在開發環境顯示
const showDebugInfo = computed(() => {
  return import.meta.env.DEV; // Vite 的開發環境變數
});

const tokenInfo = computed(() => inputStore.tokenInfo);
const userInfo = computed(() => inputStore.userInfo);

const tokenStatus = computed(() => {
  if (!inputStore.token) return '❌';
  if (tokenInfo.value?.isValid) {
    const hours = tokenInfo.value.remainingHours;
    if (hours > 12) return '✅';
    if (hours > 1) return '⚠️';
    return '🟠';
  }
  return '❌';
});

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
};
</script>

<style scoped>
.token-debug-info {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  z-index: 9999;
  max-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.debug-header {
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  margin-bottom: 4px;
}

.debug-header:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 2px 4px;
  margin: -2px -4px 4px -4px;
}

.debug-content {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 8px;
  margin-top: 8px;
}

.debug-row {
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
}

.status-valid {
  color: #4ade80;
}

.status-invalid {
  color: #f87171;
}
</style>