import { defineStore } from "pinia";

export const useInputStore = defineStore("input", {
  state: () => ({
    token: "",
    tokenExpiry: null, // 儲存 token 過期時間 (timestamp)
    picture: "",
    userInfo: {
      name: "",
      email: "",
      id: "",
      permission: "",
    },
  }),
  persist: true, // Enable persistence
  actions: {
    setToken(newToken) {
      this.token = newToken;
      
      // 解析 JWT token 以獲得過期時間
      if (newToken) {
        try {
          const payload = JSON.parse(atob(newToken.split('.')[1]));
          // JWT exp 是以秒為單位的 timestamp，轉換為毫秒
          this.tokenExpiry = payload.exp * 1000;
          // console.log('✅ Token 設定成功，過期時間:', new Date(this.tokenExpiry));
        } catch (error) {
          // console.error('❌ 解析 JWT token 失敗:', error);
          // 如果無法解析，設定為 24 小時後過期（備用方案）
          this.tokenExpiry = Date.now() + (24 * 60 * 60 * 1000);
        }
      } else {
        this.tokenExpiry = null;
      }
    },
    
    setPicture(newPicture) {
      this.picture = newPicture;
    },
    
    setUserInfo(userInfo) {
      this.userInfo.name = userInfo.name || "";
      this.userInfo.email = userInfo.email || "";
      this.userInfo.id = userInfo.id || "";
      this.userInfo.permission = userInfo.permission || "";
    },
    
    removeToken() {
      this.token = "";
      this.tokenExpiry = null;
      // 清除用戶資訊
      this.userInfo = {
        name: "",
        email: "",
        id: "",
        permission: "",
      };
      // console.log('🗑️ Token 已清除');
    },
    
    updatePermission(newPermission) {
      this.userInfo.permission = newPermission;
    },
    
    // 檢查 token 是否過期
    isTokenExpired() {
      if (!this.token || !this.tokenExpiry) {
        return true;
      }
      
      const now = Date.now();
      const isExpired = now >= this.tokenExpiry;
      
      if (isExpired) {
        console.log('⏰ Token 已過期:', {
          現在時間: new Date(now),
          過期時間: new Date(this.tokenExpiry)
        });
      }
      
      return isExpired;
    },
    
    // 獲取 token 剩餘時間（毫秒）
    getTokenRemainingTime() {
      if (!this.token || !this.tokenExpiry) {
        return 0;
      }
      
      const remaining = this.tokenExpiry - Date.now();
      return Math.max(0, remaining);
    },
    
    // 檢查並處理 token 過期
    checkTokenValidity() {
      if (this.isTokenExpired()) {
        // console.log('❌ Token 已過期，自動登出');
        this.removeToken();
        return false;
      }
      return true;
    },
    
    // 開始監控 token 過期（在應用程式啟動時呼叫）
    startTokenMonitoring() {
      // 清除之前的計時器（如果存在）
      if (this.tokenExpiryTimer) {
        clearTimeout(this.tokenExpiryTimer);
      }
      
      // 如果沒有 token 或已經過期，不需要監控
      if (!this.token || this.isTokenExpired()) {
        return;
      }
      
      const remainingTime = this.getTokenRemainingTime();
      
      // console.log(`⏱️ 開始監控 Token 過期，剩餘時間: ${Math.floor(remainingTime / (1000 * 60))} 分鐘`);
      
      // 設定計時器在 token 過期時自動清除
      this.tokenExpiryTimer = setTimeout(() => {
        // console.log('⏰ Token 監控計時器觸發，自動登出');
        this.removeToken();
        
        // 可以選擇性地觸發自定義事件讓組件處理跳轉
        if (typeof window !== 'undefined') {
          // 發送自定義事件，讓監聽的組件處理跳轉
          window.dispatchEvent(new CustomEvent('token-expired'));
        }
      }, remainingTime);
    },
    
    // 停止監控（登出時呼叫）
    stopTokenMonitoring() {
      if (this.tokenExpiryTimer) {
        clearTimeout(this.tokenExpiryTimer);
        this.tokenExpiryTimer = null;
        // console.log('⏹️ Token 監控已停止');
      }
    }
  },
  
  // 添加 getters 方便使用
  getters: {
    isLoggedIn: (state) => {
      return !!state.token && !state.isTokenExpired?.();
    },
    
    tokenInfo: (state) => {
      if (!state.token || !state.tokenExpiry) {
        return null;
      }
      
      const now = Date.now();
      const remaining = state.tokenExpiry - now;
      
      return {
        isValid: remaining > 0,
        expiryTime: new Date(state.tokenExpiry),
        remainingTime: Math.max(0, remaining),
        remainingMinutes: Math.floor(Math.max(0, remaining) / (1000 * 60)),
        remainingHours: Math.floor(Math.max(0, remaining) / (1000 * 60 * 60))
      };
    }
  }
});
