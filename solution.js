function solution(entryPoint) {
    if (!entryPoint) return;
    //===================================================================================
    const _copy = entryPoint.querySelectorAll(":scope > [x-make*=copy]");
    _copy.forEach((element) => {
        let cnt = Number(element.getAttribute("x-make").split(":")[1]);
        element.removeAttribute("x-make");
        while (cnt > 0) {
            element.after(element.cloneNode(true));
            cnt--;
        }
    });
    //===================================================================================
    const _remove = entryPoint.querySelectorAll(
        ":scope > [x-make*=remove]:not([x-make*=Children])"
    );
    _remove.forEach((element) => {
        let cnt = Number(element.getAttribute("x-make").split(":")[1]);
        element.removeAttribute("x-make");
        while (cnt > 0) {
            if (!element.nextElementSibling) break;
            element.nextElementSibling.remove();
            cnt--;
        }
    });
    //===================================================================================
    const _removeChildren = entryPoint.querySelectorAll(
        ":scope > [x-make*=removeChildren]"
    );
    _removeChildren.forEach((element) => {
        let cnt = Number(element.getAttribute("x-make").split(":")[1]);
        element.removeAttribute("x-make");
        while (cnt > 0 && element.firstElementChild) {
            element.removeChild(element.firstElementChild);
            cnt--;
        }
    });
    //===================================================================================
    for (
        let _switch = entryPoint.querySelector(":scope > [x-make*=switch]");
        _switch;
        _switch = entryPoint.querySelector(":scope > [x-make*=switch]")
    ) {
        const childrenCount = entryPoint.children.length;
        let cnt = Number(_switch.getAttribute("x-make").split(":")[1]);
        _switch.removeAttribute("x-make");
        if (cnt > childrenCount) cnt = cnt % childrenCount;
        let swch = _switch.nextElementSibling || entryPoint.firstElementChild;
        while (--cnt > 0) {
            swch = swch.nextElementSibling || entryPoint.firstElementChild;
        }
        const sibling = _switch.nextSibling === swch ? _switch : _switch.nextSibling;
        swch.parentNode.insertBefore(_switch, swch);
        entryPoint.insertBefore(swch, sibling);
    }
    //===================================================================================
    for (const element of entryPoint.children) {
        solution(element);
    }
}

solution(document.querySelector("entry"));
