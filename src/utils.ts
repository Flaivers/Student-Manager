export function getElementById<T extends HTMLElement>(id: string): T {
  const ElementId = document.getElementById(id);
  if (ElementId == null) {
    throw new Error("id not found");
  } else {
    return ElementId as T;
  }
}

export class ToastManager {
  constructor() {}

  showSuccessMessage(message: string, options: number): void {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = message;
    newDiv.classList.add("toast");
    newDiv.classList.add("toast-success");
    const newButton = document.createElement("button");
    newButton.classList.add("btn");
    newButton.classList.add("btn-clear");
    newButton.classList.add("float-right");
    newDiv.appendChild(newButton);
    document.body.prepend(newDiv);
    setTimeout(() => newDiv.remove(), options);
    newButton.onclick = function () {
      newDiv.remove();
    };
  }

  showErrorMessage(message: string, options: number): void {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = message;
    newDiv.classList.add("toast");
    newDiv.classList.add("toast-error");
    const newButton = document.createElement("button");
    newButton.classList.add("btn");
    newButton.classList.add("btn-clear");
    newButton.classList.add("float-right");
    newDiv.appendChild(newButton);
    document.body.prepend(newDiv);
    setTimeout(() => newDiv.remove(), options);
    newButton.onclick = function () {
      newDiv.remove();
    };
  }
}
