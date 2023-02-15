export function getElementById<T extends HTMLElement>(id: string): T {
  const ElementId = document.getElementById(id);
  if (ElementId == null) {
    throw new Error("id not found");
  } else {
    return ElementId as T;
  }
}

interface MessageOptions {
  delay: number;
}

export class ToastManager {
  constructor() {}

  private showMessage(message: string, delay: number, cssClass: string) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = message;
    newDiv.classList.add("toast");
    newDiv.classList.add(cssClass);
    const newButton = document.createElement("button");
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
    this.showMessage(message, options.delay, "toast-success");
  }

  showErrorMessage(message: string, options: MessageOptions): void {
    this.showMessage(message, options.delay, "toast-error");
  }
}
