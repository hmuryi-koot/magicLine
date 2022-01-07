const magicFirst = new MagicLine('[data-list-first]', {});

const magicSeconds = document.querySelectorAll('[data-list-second]');
if (magicSeconds) {
	magicSeconds.forEach(magic => {
		let menuMagic = new MagicLine(magic, {})
	});
}

const magicThird = new MagicLine('[data-list-click]', {
	usedEvent: 'click',
});

const magicFourth = new MagicLine('[data-list-motion-in]', {
	usedEvent: 'motion-in',
});


const magicFifth = new MagicLine('[data-list-motion-in-out]', {
	usedEvent: 'motion-in-out',
});

const magicSixth = new MagicLine('[data-list-motionToClick]', {
	motionToClick: true,
});

const magicSeventh = new MagicLine('[data-list-motion-to-click]', {
	media: 'max,900',
	mediaType: 'motion-to-click',
});


const magicEighth = new MagicLine('[data-list-destroy]', {
	media: 'min,900',
	mediaType: 'destroy',
});

const magicNinth = new MagicLine('[data-list-destroy-attr]', {
	media: true,
	mediaAttribute: 'data-media',
	mediaType: false,
	mediaTypeAttribute: 'data-media-type',
	// resize: (magicLine) => { console.log(magicLine); }
});

const magicInitLineFirst = new MagicLine('[data-list-init-line-first]', {
	activeFirstElement: true,
});
const magicInitLineSecond = new MagicLine('[data-list-init-line-second]', {
	activeFirstElement: false,
});
const magicInitLineThird = new MagicLine('[data-list-init-line-third]', {
	activeFirstElement: true,
});
const magicInitLineFourth = new MagicLine('[data-list-init-line-fourth]', {
	activeFirstElement: false,
});

const magicMargin = new MagicLine('[data-list-margin]', {
	margin: 20,
});


const magicMethod = new MagicLine('[data-list-method]', {});
const init = document.querySelector('.init');
init.addEventListener('click', () => {
	magicMethod.init()
});
const destroy = document.querySelector('.destroy');
destroy.addEventListener('click', () => {
	magicMethod.destroy()
});