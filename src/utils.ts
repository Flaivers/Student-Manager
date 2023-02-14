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

  showAlertMessage(
    cssClass: string,
    message: string,
    options: { delay: number }
  ): void {
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
    setTimeout(() => newDiv.remove(), options.delay);
    newButton.onclick = function () {
      newDiv.remove();
    };
  }
}
