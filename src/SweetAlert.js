// import { all } from "axios";
import loadingImage from "../src/assets/loading.svg";

export const useAlert = () => {
  let barInstance = null;
  let fakeProgress = 0;
  let timers = null;
  const showLoading = (title = "") => {
    return Swal.fire({
      title: title,
      //   html: `<img src="${loadingImage}" />`,
      html: '<div class="ldBar" data-preset="stripe" data-value="0" id="myBar"> </div>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      backdrop: true,
      //   didOpen: () => {
      //     Swal.showLoading(); //加載動畫
      //   },
      didOpen: () => {
        // 初始化
        barInstance = new ldBar("#myBar");
        fakeProgress = 0;
        timers = setInterval(() => {
          fakeProgress += Math.random() * 5;
          if (fakeProgress > 90) {
            fakeProgress = 90;
          }
          barInstance.set(fakeProgress);
        }, 300);
      },
    });
  };

  // const updateLoading = (percent) => {
  //   if (barInstance) {
  //     console.log("updateLoading: ", percent);
  //     barInstance.set(percent);
  //   }
  // };
  const closeLoading = () => {
    clearInterval(timers);
    barInstance.set(100);
    Swal.close();
    barInstance = null; // 清除 bar 變數
  };

  const showWarning = (title = "", text = "") => {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      confirmButtonText: "確定",
      confirmButtonColor: "#B5B8A3",
    });
  };

  return {
    showLoading,
    closeLoading,
    showWarning,
    // updateLoading,
  };
};
