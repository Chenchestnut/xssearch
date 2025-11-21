// import { all } from "axios";
import loadingImage from "../src/assets/loading.svg";

export const useAlert = () => {
  let barInstance = null;
  let fakeProgress = 0;
  let timers = null;

  // 確保 Swal 可用
  const getSwal = () => {
    if (typeof window !== "undefined" && window.Swal) {
      return window.Swal;
    }
    throw new Error("SweetAlert2 not loaded");
  };

  const showLoading = (title = "") => {
    const Swal = getSwal();
    return Swal.fire({
      title: title,
      //   html: `<img src="${loadingImage}" />`,
      html: '<div class="ldBar" data-preset="stripe" data-value="0" data-text="%" id="myBar"> </div>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      backdrop: true,
      //   didOpen: () => {
      //     Swal.showLoading(); //加載動畫
      //   },
      didOpen: () => {
        const style = document.createElement("style");
        style.innerHTML = `
          .swal2-html-container {
            overflow: visible !important;
            max-height: none !important;
            display: flex !important;
            justify-content: center !important;
            height: 80px !important;
          }
          .swal2-popup {
          max-height: none !important; 
          }
        `;
        document.head.appendChild(style);
        // 初始化
        barInstance = new ldBar("#myBar");
        fakeProgress = 0;
        // timers = setInterval(() => {
        //   fakeProgress += Math.random() * 5;
        //   if (fakeProgress > 90) {
        //     fakeProgress = 90;
        //   }
        //   barInstance.set(fakeProgress);
        // }, 300);
      },
    });
  };

  const updateLoading = (percent) => {
    if (barInstance) {
      // console.log("updateLoading: ", percent);
      barInstance.set(percent);
    }
  };
  const closeLoading = () => {
    clearInterval(timers);
    if (barInstance) {
      barInstance.set(100);
    }
    const Swal = getSwal();
    Swal.close();
    barInstance = null; // 清除 bar 變數
  };

  const showWarning = (title = "", text = "") => {
    const Swal = getSwal();
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      confirmButtonText: "確定",
      confirmButtonColor: "#B5B8A3",
    });
  };

  const showSuccess = (title = "", text = "") => {
    const Swal = getSwal();
    return Swal.fire({
      title: title,
      text: text,
      icon: "success",
      confirmButtonText: "確定",
      confirmButtonColor: "#B5B8A3",
    });
  };

  return {
    showLoading,
    closeLoading,
    showWarning,
    updateLoading,
    showSuccess,
  };
};
