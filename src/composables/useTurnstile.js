import { ref } from 'vue';

// 全局狀態，在所有組件之間共享
const globalTurnstileToken = ref(null);
const globalTurnstileReady = ref(false);
const globalTurnstileLoading = ref(false);

/**
 * Cloudflare Turnstile 的 Vue 3 Composable
 * 處理 Cloudflare Turnstile 驗證
 */
export function useTurnstile() {
    const siteKey = '0x4AAAAAAA3QtOGlz4UGnf74';
    
    /**
     * 等待 Turnstile 載入完成
     * @returns {Promise<boolean>} 是否載入成功
     */
    const waitForTurnstile = () => {
        return new Promise((resolve) => {
            const checkTurnstile = () => {
                if (window.turnstile) {
                    globalTurnstileReady.value = true;
                    resolve(true);
                } else {
                    setTimeout(checkTurnstile, 100);
                }
            };
            checkTurnstile();
        });
    };
    
    /**
     * 渲染 Turnstile 小工具
     * @param {string} containerId - 容器元素 ID
     * @param {function} onSuccess - 成功回調函數
     * @param {function} onError - 錯誤回調函數
     * @returns {string} Turnstile widget ID
     */
    const renderTurnstile = async (containerId, onSuccess, onError) => {
        try {
            globalTurnstileLoading.value = true;
            
            console.log('🚀 開始渲柔 Turnstile 小工具...');
            console.log('🔑 Site Key:', siteKey);
            console.log('🌍 當前域名:', window.location.hostname);
            
            // 確保 Turnstile 已載入
            if (!globalTurnstileReady.value) {
                console.log('⏳ 等待 Turnstile 載入...');
                await waitForTurnstile();
            }
            
            // 檢查 turnstile 是否可用
            if (!window.turnstile) {
                throw new Error('Turnstile 未載入');
            }
            
            console.log('✅ Turnstile API 已載入');
            
            // 渲染 Turnstile 小工具 (需要傳遞 CSS 選擇器或 HTMLElement)
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`找不到容器元素: ${containerId}`);
            }
            
            console.log('📺 找到容器元素:', container);
            
            console.log('🎨 渲柔 Turnstile 小工具...');
            
            const widgetId = window.turnstile.render(container, {
                sitekey: siteKey,
                callback: (token) => {
                    globalTurnstileToken.value = token;
                    console.log('✅ Turnstile 驗證成功!');
                    console.log('🎫 Token 長度:', token.length);
                    console.log('🔑 Token 前綴:', token.substring(0, 50) + '...');
                    console.log('💾 儲存 token 到全局狀態');
                    if (onSuccess) onSuccess(token);
                },
                'error-callback': (errorCode) => {
                    console.error('❌ Turnstile 驗證錯誤代碼:', errorCode);
                    console.error('📄 錯誤詳情:', {
                        errorCode,
                        siteKey: siteKey,
                        hostname: window.location.hostname,
                        userAgent: navigator.userAgent
                    });
                    globalTurnstileToken.value = null;
                    if (onError) onError(errorCode);
                },
                'expired-callback': () => {
                    console.warn('⚠️ Turnstile token 已過期');
                    globalTurnstileToken.value = null;
                },
                theme: 'light',
                size: 'normal'
            });
            
            console.log('🎯 Widget ID:', widgetId);
            
            console.log('✨ Turnstile 小工具渲柔成功!');
            return widgetId;
            
        } catch (error) {
            console.error('❌ Turnstile 渲柔錯誤:', error);
            console.error('📄 錯誤堆疊:', error.stack);
            if (onError) onError(error);
            return null;
        } finally {
            globalTurnstileLoading.value = false;
        }
    };
    
    /**
     * 重置 Turnstile 小工具
     * @param {string} widgetId - 小工具 ID
     */
    const resetTurnstile = (widgetId) => {
        try {
            if (window.turnstile && widgetId) {
                window.turnstile.reset(widgetId);
                globalTurnstileToken.value = null;
                console.log('🔄 Turnstile 已重置');
            }
        } catch (error) {
            console.error('❌ Turnstile 重置錯誤:', error);
        }
    };
    
    /**
     * 移除 Turnstile 小工具
     * @param {string} widgetId - 小工具 ID
     */
    const removeTurnstile = (widgetId) => {
        try {
            if (window.turnstile && widgetId) {
                window.turnstile.remove(widgetId);
                globalTurnstileToken.value = null;
                console.log('🗁️ Turnstile 已移除');
            }
        } catch (error) {
            console.error('❌ Turnstile 移除錯誤:', error);
        }
    };
    
    /**
     * 檢查 Turnstile 是否可用
     * @returns {boolean} 是否可用
     */
    const isTurnstileAvailable = () => {
        return !!(window.turnstile);
    };
    
    /**
     * 初始化 Turnstile (在組件載入時呼叫)
     */
    const initTurnstile = async () => {
        console.log('🚀 初始化 Turnstile...');
        await waitForTurnstile();
        console.log('✅ Turnstile 初始化完成');
        console.log('🔍 當前全局 token 狀態:', globalTurnstileToken.value ? '已設置' : '未設置');
    };
    
    /**
     * 調試函數：顯示當前 Turnstile 狀態
     */
    const debugTurnstileState = () => {
        console.log('=== 🔍 Turnstile 狀態調試 ===');
        console.log('globalTurnstileReady:', globalTurnstileReady.value);
        console.log('globalTurnstileLoading:', globalTurnstileLoading.value);
        console.log('globalTurnstileToken:', globalTurnstileToken.value ? globalTurnstileToken.value.substring(0, 30) + '...' : 'null');
        console.log('window.turnstile:', !!window.turnstile);
        console.log('當前 URL:', window.location.href);
        console.log('===========================');
    };
    
    /**
     * 取得當前 token
     * @returns {string|null} 當前的 Turnstile token
     */
    const getCurrentToken = () => {
        console.log('🔍 getCurrentToken 被呼叫, 當前 token:', globalTurnstileToken.value ? globalTurnstileToken.value.substring(0, 20) + '...' : 'null');
        return globalTurnstileToken.value;
    };
    
    /**
     * 檢查是否有有效的 token
     * @returns {boolean} 是否有有效 token
     */
    const hasValidToken = () => {
        const hasToken = !!globalTurnstileToken.value;
        console.log('🔍 hasValidToken 被呼叫, 結果:', hasToken);
        return hasToken;
    };
    
    return {
        // 狀態
        isTurnstileReady: globalTurnstileReady,
        isTurnstileLoading: globalTurnstileLoading,
        turnstileToken: globalTurnstileToken,
        siteKey,
        
        // 方法
        renderTurnstile,
        resetTurnstile,
        removeTurnstile,
        isTurnstileAvailable,
        initTurnstile,
        waitForTurnstile,
        getCurrentToken,
        hasValidToken,
        debugTurnstileState
    };
}