document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('keydown', function (event) {
        const key = event.key.toLowerCase();
        highlightVirtualKey(key);
        handleSpecialKeys(key, event);
    });

    window.addEventListener('keyup', function (event) {
        const key = event.key.toLowerCase();
        clearHighlightedKeys();
    });

    document.querySelector('.keyboard').addEventListener('click', function (event) {
        if (event.target.classList.contains('key')) {
            const key = event.target.innerText.toLowerCase();
            highlightVirtualKey(key);
            handleSpecialKeys(key, event);
        }
    });

    function highlightVirtualKey(key) {
        clearHighlightedKeys();
        const keys = document.querySelectorAll('.key');
        keys.forEach(function (virtualKey) {
            if (virtualKey.textContent.toLowerCase() === key) {
                virtualKey.classList.add('highlight');
            }
        });
    }

    function clearHighlightedKeys() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(function (key) {
            key.classList.remove('highlight');
        });
    }

    function handleSpecialKeys(key, event) {
        const outputTextarea = document.getElementById('output');
        outputTextarea.value += key;

        if (key === 'enter') {
            outputTextarea.value = '';
        } else if (key === 'backspace') {
            const currentText = outputTextarea.value;
            outputTextarea.value = currentText.slice(0, -1);
        } else if (key === 'tab') {
            event.preventDefault();

            const cursorPosition = outputTextarea.selectionStart;

            const tab = "    ";

            outputTextarea.setRangeText(tab, cursorPosition, cursorPosition, 'end');
        } else {
            // outputTextarea.value += key;
        }

        outputTextarea.scrollTop = outputTextarea.scrollHeight;
    }
});
