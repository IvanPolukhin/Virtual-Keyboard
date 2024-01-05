document.addEventListener("DOMContentLoaded", function () {
    const outputTextArea = document.getElementById("output");
    const cursorIndicator = document.getElementById("cursor-indicator");
    const virtualKeys = document.querySelectorAll(".key");
    let isCapsLockOn = false;
    let isShiftPressed = false;
    let isRussianLayout = false;

    function handleVirtualKeyPress(event) {
        const key = event.target.innerText;
        insertText(key);
        highlightKey(event.target);
    }

    function handlePhysicalKeyPress(event) {
        const key = event.key;

        if (key === "CapsLock") {
            toggleCapsLock();
        } else if (key === "Shift") {
            isShiftPressed = true;
        } else if (key === "Enter") {
            insertText("\n");
        } else if (key === "Backspace") {
            deleteText(-1);
        } else if (key === "Delete") {
            deleteText(1);
        } else if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
            event.preventDefault(); // Prevent default behavior of arrow keys
            handleArrowKey(key);
        } else if (key.length === 1) {
            insertText(key);
        }

        const virtualKey = getVirtualKey(key);
        if (virtualKey) {
            highlightKey(virtualKey);
        }

        updateCursorPosition();
    }

    function handleShiftKeyUp() {
        isShiftPressed = false;
    }

    function insertText(text) {
        const currentText = outputTextArea.value;
        const selectionStart = outputTextArea.selectionStart;
        const selectionEnd = outputTextArea.selectionEnd;
        const newText = currentText.substring(0, selectionStart) + text + currentText.substring(selectionEnd);
        outputTextArea.value = newText;
        outputTextArea.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
    }

    function deleteText(direction) {
        const selectionStart = outputTextArea.selectionStart;
        const selectionEnd = outputTextArea.selectionEnd;

        if (selectionStart !== selectionEnd) {
            const currentText = outputTextArea.value;
            const newText = currentText.substring(0, selectionStart) + currentText.substring(selectionEnd);
            outputTextArea.value = newText;
            outputTextArea.setSelectionRange(selectionStart, selectionStart);
        } else if (direction === -1 && selectionStart > 0) {
            const currentText = outputTextArea.value;
            const newText = currentText.substring(0, selectionStart - 1) + currentText.substring(selectionStart);
            outputTextArea.value = newText;
            outputTextArea.setSelectionRange(selectionStart - 1, selectionStart - 1);
        } else if (direction === 1 && selectionStart < outputTextArea.value.length) {
            const currentText = outputTextArea.value;
            const newText = currentText.substring(0, selectionStart) + currentText.substring(selectionStart + 1);
            outputTextArea.value = newText;
            outputTextArea.setSelectionRange(selectionStart, selectionStart);
        }
    }

    function highlightKey(keyElement) {
        keyElement.classList.add("highlight");
        setTimeout(() => {
            keyElement.classList.remove("highlight");
        }, 200);
    }

    function toggleCapsLock() {
        isCapsLockOn = !isCapsLockOn;
        virtualKeys.forEach((key) => {
            if (key.textContent.length === 1) {
                key.textContent = isCapsLockOn ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        });
    }

    function handleArrowKey(key) {
        const selectionStart = outputTextArea.selectionStart;

        if (key === "ArrowLeft" && selectionStart > 0) {
            outputTextArea.setSelectionRange(selectionStart - 1, selectionStart - 1);
        } else if (key === "ArrowRight" && selectionStart < outputTextArea.value.length) {
            outputTextArea.setSelectionRange(selectionStart + 1, selectionStart + 1);
        }
    }

    function getVirtualKey(physicalKey) {
        return Array.from(virtualKeys).find((key) => key.textContent === physicalKey);
    }

    const langSwitchKey = document.getElementById("alt");
    langSwitchKey.addEventListener("click", toggleLanguage);

    virtualKeys.forEach((key) => {
        key.addEventListener("click", handleVirtualKeyPress);
    });

    document.addEventListener("keydown", handlePhysicalKeyPress);
    document.addEventListener("keyup", handleShiftKeyUp);

    function toggleLanguage() {
        isRussianLayout = !isRussianLayout;
        const russianLayout = "йцукенгшщзхъфывапролджэячсмитьбю";
        const englishLayout = "qwertyuiopasdfghjklzxcvbnm";

        virtualKeys.forEach((key, index) => {
            if (key.textContent.length === 1) {
                key.textContent = isRussianLayout ? russianLayout[index].toUpperCase() : englishLayout[index].toUpperCase();
            }
        });
    }
});