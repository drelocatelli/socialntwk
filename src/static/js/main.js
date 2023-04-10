const { BehaviorSubject } = rxjs;

const {networks} = JSON.parse(api.networks());

const activeMenu$ = new BehaviorSubject(0);
// add webviews
for(let i = 0; i < networks.length; i++) {
    const webviewEl = document.createElement('webview');
    webviewEl.src = networks[i].url;
    webviewEl.id = i;
    webviewEl.style.display = 'none';
    webviewEl.setAttribute('webPreferences', "nativeWindowOpen=true");
    webviewEl.setAttribute('allowpopups', true);
    document.querySelector('.container').appendChild(webviewEl);    
}

const webviews = document.querySelectorAll('webview');

class Menu {

    constructor() {
        this.insertLinks(this.getMenu());
    }

    getMenu() {
        const menu = document.querySelector('.ui.pointing.menu');
        // horizontal scroll
        menu.addEventListener('wheel', (e) => {
            e.preventDefault();
            menu.scrollLeft += e.deltaY;
        })
        return menu;
    }

    setMenuActive(idx) {
        const menuChildren = Array.from(menu.getMenu().children);
        menuChildren.map((el, i) => {
            if (i == idx) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    insertLinks(menu) {
        for (let [i, network] of networks.entries()) {
            const link = document.createElement('a');
            link.classList.add('item');
            link.innerText = network.title;
            link.dataset.url = network.url;
            menu.appendChild(link);
            link.addEventListener('click', () => {
                activeMenu$.next(i);
            });
        }
    }

    setUrl(idx) {
        const newURL = networks[idx].url;
        for(let [i, webview] of webviews.entries()) {
            if(i == idx) {
                webview.style.display = 'flex';
            } else {
                webview.style.display = 'none';
            }
        }
    }
}

const menu = new Menu();
activeMenu$.subscribe((value) => {
    menu.setMenuActive(value);
    menu.setUrl(value);
});
