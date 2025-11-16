import { ref } from 'vue';

/**
 * reCAPTCHA Enterprise 的 Vue 3 Composable
 * 處理 Google reCAPTCHA v3 Enterprise 的 token 生成
 */
export function useRecaptcha() {
    const siteKey = '6LeUXg4sAAAAAIr7t4fdxpxro27bDNYl3lPrLBIG';
    const isRecaptchaReady = ref(false);
    const isRecaptchaLoading = ref(false);
    
    /**
     * 等待 reCAPTCHA 載入完成
     * @returns {Promise<boolean>} 是否載入成功
     */
    const waitForRecaptcha = () => {
        return new Promise((resolve) => {
            const checkRecaptcha = () => {
                if (window.grecaptcha && window.grecaptcha.enterprise) {
                    isRecaptchaReady.value = true;
                    resolve(true);
                } else {
                    setTimeout(checkRecaptcha, 100);
                }
            };
            checkRecaptcha();
        });
    };
    
    /**
     * 執行 reCAPTCHA 並取得 token
     * @param {string} action - 動作名稱 (例如: 'SEARCH', 'LOGIN', 'ANALYSIS')
     * @returns {Promise<string|null>} reCAPTCHA token 或 null
     */
    const executeRecaptcha = async (action = 'SEARCH') => {
        try {
            isRecaptchaLoading.value = true;
            
            // 確保 reCAPTCHA 已載入
            if (!isRecaptchaReady.value) {
                console.log('🔄 等待 reCAPTCHA 載入...');
                await waitForRecaptcha();
            }
            
            // 檢查 grecaptcha.enterprise 是否可用
            if (!window.grecaptcha || !window.grecaptcha.enterprise) {
                console.error('❌ reCAPTCHA Enterprise 未載入');
                return null;
            }
            
            console.log(`🔐 執行 reCAPTCHA 驗證 - 動作: ${action}`);
            
            // 等待 reCAPTCHA 準備就緒並執行
            const token = await new Promise((resolve, reject) => {
                window.grecaptcha.enterprise.ready(async () => {
                    try {
                        const result = await window.grecaptcha.enterprise.execute(siteKey, {
                            action: action
                        });
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            
            if (token) {
                console.log(`✅ reCAPTCHA token 取得成功 - 動作: ${action}`);
                console.log('Token 前10字元:', token.substring(0, 10) + '...');
            } else {
                console.error('❌ reCAPTCHA token 取得失敗');
            }
            
            return token;
            
        } catch (error) {
            console.error('❌ reCAPTCHA 執行錯誤:', error);
            return null;
        } finally {
            isRecaptchaLoading.value = false;
        }
    };
    
    /**
     * 專門用於搜尋功能的 reCAPTCHA
     * @returns {Promise<string|null>} reCAPTCHA token
     */
    const executeSearchRecaptcha = () => {
        return executeRecaptcha('SEARCH');
    };
    
    /**
     * 專門用於登入功能的 reCAPTCHA
     * @returns {Promise<string|null>} reCAPTCHA token
     */
    const executeLoginRecaptcha = () => {
        return executeRecaptcha('LOGIN');
    };
    
    /**
     * 專門用於分析功能的 reCAPTCHA
     * @returns {Promise<string|null>} reCAPTCHA token
     */
    const executeAnalysisRecaptcha = () => {
        return executeRecaptcha('ANALYSIS');
    };
    
    /**
     * 專門用於推薦功能的 reCAPTCHA
     * @returns {Promise<string|null>} reCAPTCHA token
     */
    const executeRecommendRecaptcha = () => {
        return executeRecaptcha('RECOMMEND');
    };
    
    /**
     * 檢查 reCAPTCHA 是否可用
     * @returns {boolean} 是否可用
     */
    const isRecaptchaAvailable = () => {
        return !!(window.grecaptcha && window.grecaptcha.enterprise);
    };
    
    /**
     * 初始化 reCAPTCHA (在組件載入時呼叫)
     */
    const initRecaptcha = async () => {
        console.log('🚀 初始化 reCAPTCHA...');
        await waitForRecaptcha();
        console.log('✅ reCAPTCHA 初始化完成');
    };
    
    return {
        // 狀態
        isRecaptchaReady,
        isRecaptchaLoading,
        siteKey,
        
        // 方法
        executeRecaptcha,
        executeSearchRecaptcha,
        executeLoginRecaptcha,
        executeAnalysisRecaptcha,
        executeRecommendRecaptcha,
        isRecaptchaAvailable,
        initRecaptcha,
        waitForRecaptcha
    };
}