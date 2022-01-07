// Класс Magic Line
class MagicLine {
	constructor(element, properties) {
		// Настрйоки по умолчанию
		let defaultOptions = {
			// Инициализация
			init: true,
			// Селектор для пунктов
			classItem: 'list__item',
			// Селектор для активного пунктов
			classItemActive: 'list__item_active',
			// Класс для линии
			classLine: 'line',
			// Отступ линии от пункта
			margin: 5,
			// Событие, при котором срабатывает перемещение линии
			usedEvent: 'motion-in', // 'click', 'motion-in-out'
			// Активный первый пункт
			activeFirstElement: false,
			// На тач устройствах перевести наведение на клик
			motionToClick: false,
			// Медиа
			media: false, //'min,600' , 'max,600', false
			mediaAttribute: 'data-media',
			mediaType: false, // 'destroy' 'motion-to-click'
			mediaTypeAttribute: 'data-media-type', // 'destroy' 'motion-to-click'

			resize: function () { },
		}
		this.options = Object.assign(defaultOptions, properties);
		if (this.options.init) {
			if (typeof (element) === "string") {
				const list = document.querySelector(element)
				this.start(list);
			} else this.start(element)
		}
	}
	start(elementList) {
		this.list = elementList;
		this.items = this.list.querySelectorAll(`.${this.options.classItem}`);
		this._startIndex = 0;
		if (this.items.length) {
			// Для начального появлении линии
			// Если есть насройка, то сначала установится на 
			if (this.options.activeFirstElement) {
				this.lastItem = this.firstItem = this.items[this._startIndex];
			} else {
				for (let index = 0; index < this.items.length; index++) {
					const item = this.items[index];
					if (item.classList.contains(this.options.classItemActive)) {
						this.lastItem = this.firstItem = item;
						this._startIndex = index;
						break;
					}
				}
			}
		}
		if (this.firstItem) {
			this.initLine();

			if (this.options.media || this.list.hasAttribute(this.options.mediaAttribute)) {
				this.media = this.list.hasAttribute(this.options.mediaAttribute) ?
					this.list.getAttribute(this.options.mediaAttribute).split(',') :
					this.options.media.split(',');
			}
			if (this.options.mediaType || this.list.hasAttribute(this.options.mediaTypeAttribute)) {
				this.mediaType = this.list.hasAttribute(this.options.mediaTypeAttribute) ?
					this.list.getAttribute(this.options.mediaTypeAttribute) :
					this.options.mediaType;
			}

			this.events();
		}
	}

	// События
	events() {
		this._eventVar = this.event.bind(this);
		this._eventOutVar = this.eventOut.bind(this);
		this._eventResize = this.eventResize.bind(this);

		this.addEvents();

		// Если есть настройка на мобилки
		if (this.conditionRemoveEvent()) {
			this.removeEvents();
			this.list.addEventListener('click', this._eventVar);
		}

		window.addEventListener('resize', this._eventResize);
	}
	event(e) {
		const item = e.target.closest(`.${this.options.classItem}`)
		if (item) {
			this.lastItem = item;
			this.removeActive();
			this.lastItem.classList.add(this.options.classItemActive);
			this.setLine();
		}
	}
	eventOut(e) {
		this.lastItem = this.firstItem;
		this.removeActive();
		this.firstItem.classList.add(this.options.classItemActive);
		this.setLine()
	}
	eventResize() {
		this.options.resize(this);

		this.setLine();

		if (this.media || this.list.hasAttribute(this.options.mediaAttrubute)) {

			this.chechWidth();
		}
	}
	// Добавление \ удаление
	addEvents() {
		if (this.options.usedEvent == 'click') {
			this.list.addEventListener('click', this._eventVar);
		} else if (this.options.usedEvent == 'motion-in' || this.options.usedEvent == 'motion-in-out') {
			this.list.addEventListener('mouseover', this._eventVar);
		}
		if (this.options.usedEvent == 'motion-in-out') this.list.addEventListener('mouseleave', this._eventOutVar);
	}
	removeEvents() {
		this.list.removeEventListener('mouseover', this._eventVar);
		this.list.removeEventListener('mouseleave', this._eventOutVar);
		this.list.removeEventListener('click', this._eventVar);
	}
	// Работа с медиа
	createMedia(media) {
		return window.matchMedia(`(${media[0]}-width: ${media[1]}px)`).matches
	}
	conditionRemoveEvent() {
		return this.options.motionToClick && (this.options.usedEvent == 'motion-in-out' || this.options.usedEvent == 'motion-in') && document.documentElement.classList.contains('touch')
	}
	chechWidth() {
		this.removeEvents();
		if (this.mediaType === 'motion-to-click') {
			if (this.createMedia(this.media)) {
				this.list.addEventListener('click', this._eventVar);
			} else this.addEvents();
		} else if (this.mediaType === 'destroy') {
			if (this.createMedia(this.media)) this.destroy();
			else this.init();
		}
	}
	createLine() {
		this.list.insertAdjacentHTML("beforeend", `<div class="${this.options.classLine}"></div>`);
		return this.list.querySelector(`.${this.options.classLine}`);
	}
	removeActive() {
		this.items.forEach(element => {
			element.classList.remove(this.options.classItemActive)
		});
	}

	// Методы
	destroy() {
		this.removeEvents();
		this.line.remove();

	}
	init() {
		this.initLine();
		this.addEvents();
	}

	initLine() {
		this.line = this.list.querySelector(`.${this.options.classLine}`) ?
			this.list.querySelector(`.${this.options.classLine}`) : this.createLine();
		this.setLine(this.firstItem);
	}
	setLine(item) {
		const element = item ? item : this.lastItem
		// console.log(element);
		this.line.style.left = `${element.offsetLeft}px`;
		this.line.style.width = `${element.offsetWidth}px`;
		this.line.style.top = `${element.offsetTop + element.offsetHeight + this.options.margin}px`;
	}
}