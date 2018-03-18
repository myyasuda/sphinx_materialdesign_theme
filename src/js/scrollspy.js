export default class ScrollSpy {
    constructor(args) {

        this.doc = document;
        this.nav = this.doc.querySelectorAll(args.navSelector);

        if(!this.nav.length === 0) { return }

        this.win = window;
        this.winHeight = this.win.innerHeight;

        this.scrollElement = this.doc.querySelector(args.scrollSelector);
        this.className = args.className;
        this.offsetTop = args.offsetTop || 0;

        this.contents = [];
        this.contents = this.getContents(args.contentSelector);

        this.attachEvent();
    }

    attachEvent() {
        let scrollTimer;
        this.scrollElement.addEventListener('scroll', () => {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }

            scrollTimer = setTimeout(() => {
                this.spy();
            }, 1);
        });

        let resizeTimer;
        this.scrollElement.addEventListener('resize', () => {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }

            resizeTimer = setTimeout(() => {
                this.spy();
            }, 1);
        });

    }

    getContents(contentSelector) {
        const targets = [];
        for (let i = 0, max = this.nav.length; i < max; i++) {
            const href = this.nav[i].href;
            targets.push(this.doc.getElementById(href.split('#')[1]));
        }
        return targets;
    }

    spy() {
        let elements = this.getViewState();
        this.toggleNavClass(elements);
    }

    getViewState() {
        const elementListInView = [];
        for (let i = 0, max = this.contents.length; i < max; i++) {
            const current = this.contents[i];
            if (current && this.isView(current)) {
                elementListInView.push(current);
            }
        }

        return elementListInView;
    }

    isView(element) {
        const winH = this.winHeight;
        const scrollTop = this.scrollElement.scrollTop;
        const scrollBottom = scrollTop + winH;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementBottom = elementTop + element.offsetHeight;

        return !(scrollBottom <= elementTop + this.offsetTop || elementBottom <= scrollTop + this.offsetTop);
    }

    toggleNavClass(elements) {
        let isAlreadyAdded = false;
        for (let i = 0, max = this.nav.length; i < max; i++) {
            const navElement = this.nav[i];
            const element = elements.find(el => navElement.href.split('#')[1] === el.id);
            if (element && !isAlreadyAdded) {
                isAlreadyAdded = true;
                navElement.classList.add(this.className);
                navElement.classList.add('mdl-color-text--primary');
            } else {
                navElement.classList.remove(this.className);
                navElement.classList.remove('mdl-color-text--primary');
            }
        }
    }
}
