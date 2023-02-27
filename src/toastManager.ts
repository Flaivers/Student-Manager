import { MessageOptions } from "./interface";
export class ToastManager {
  private static _instance: ToastManager;

  public static get instance(): ToastManager {
    if (this._instance === undefined) {
      this._instance = new ToastManager();
    }

    return this._instance;
  }

  private constructor() {}

  private showMessage(
    message: string,
    delay: number,
    isButtonVisible: boolean,
    cssClass: string
  ) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = message;
    newDiv.classList.add("toast");
    newDiv.classList.add(cssClass);
    const newButton = document.createElement("button");
    let isVisible = "visible";
    if (isButtonVisible == true) {
      isVisible = "visible";
    } else {
      isVisible = "hidden";
    }
    newButton.style.visibility = isVisible;
    newButton.classList.add("btn");
    newButton.classList.add("btn-clear");
    newButton.classList.add("float-right");
    newDiv.appendChild(newButton);
    document.body.prepend(newDiv);
    setTimeout(() => newDiv.remove(), delay);
    newButton.onclick = function () {
      newDiv.remove();
    };
  }

  showSuccessMessage(message: string, options: MessageOptions): void {
    this.showMessage(
      message,
      options.delay,
      options.isButtonVisible,
      "toast-success"
    );
  }

  showErrorMessage(message: string, options: MessageOptions): void {
    this.showMessage(
      message,
      options.delay,
      options.isButtonVisible,
      "toast-error"
    );
  }
}
