
document.querySelectorAll('p').forEach(p => {
    p.innerHTML = p.innerHTML
        .replace(/\s(в|на|и|с|к|о|у|по|за|из)\s/gi, ' $1&nbsp;');
});



const doms = document.querySelectorAll("[data-js='dom']");

const bark = new Audio("assets/bark.mp3");
const meow = new Audio("assets/meow.mp3");
doms.forEach(dom => {
    dom.addEventListener("click", () => {

        if (dom.classList.contains("dom5")) {
            meow.play();
        }
        else {
            bark.play();
        }

    });
});



let screens = document.querySelectorAll('.first, .second, .third, .fourth, .fifth, .sixth')

let tips = [
    'Нажмите на домики, чтобы узнать где кто живет',
    'Нажмите на цветочки',
    'Собачка сбежала, скорее ловите ее',
    'Перетащите одежду на собачку',
    'Перетащите косточки в миску, чтобы узнать про Dog-friendly заведения Москвы',
    'Нажмите на лапки, чтобы собачки остановились '
]

let tipButton = document.querySelector('[data-js="tiptext"]')
let tipBox = document.querySelector('[data-js="tipbox"]')
let tipContent = document.querySelector('[data-js="tipcontent"]')

function getCurrentScreenIndex() {
    let center = window.innerHeight / 2

    for (let i = 0; i < screens.length; i++) {
        let rect = screens[i].getBoundingClientRect()

        if (rect.top < center && rect.bottom > center) {
            return i
        }
    }

    return 0
}

function updateTip() {
    let index = getCurrentScreenIndex()
    tipContent.textContent = tips[index]
}

tipButton.addEventListener('click', () => {
    tipBox.classList.toggle('active')
    updateTip()
})

document.addEventListener('scroll', () => {
    if (tipBox.classList.contains('active')) {
        updateTip()
    }
})




document.querySelectorAll('.flower').forEach(flower => {
    flower.addEventListener('click', () => {
        const lapa = flower.querySelector('.lapa');
        
        if (lapa.style.display === 'block') {
            lapa.style.display = 'none';
        } else {
            lapa.style.display = 'block';
        }
    });
});
let chairs = document.querySelectorAll('.chair');
let currentChair = null;

chairs.forEach(chair => {
    let dog = chair.querySelector('img:first-child');
    dog.classList.remove('active');
});

setInterval(() => {
    if (currentChair) return;

    let randomChair = chairs[Math.floor(Math.random() * chairs.length)];
    let dog = randomChair.querySelector('img:first-child');

    dog.classList.add('active');
    currentChair = randomChair;
}, 1500);

chairs.forEach(chair => {
    chair.addEventListener('click', () => {
        if (chair !== currentChair) return;

        let dog = chair.querySelector('img:first-child');
        dog.classList.remove('active');
        currentChair = null;
    });
});



const fourth = document.querySelector('.fourth');
const accessories = document.querySelectorAll('.accessory');
const neckZone = document.querySelector('.neck-zone');
const headZone = document.querySelector('.head-zone');
const tailZone = document.querySelector('.tail-zone');

accessories.forEach(item => {
    let isDragging = false;
    let shiftX = 0;
    let shiftY = 0;

    item.addEventListener('mousedown', (e) => {
        e.preventDefault();

        const parentRect = fourth.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        isDragging = true;

        shiftX = e.clientX - itemRect.left;
        shiftY = e.clientY - itemRect.top;

        item.dataset.startLeft = itemRect.left - parentRect.left;
        item.dataset.startTop = itemRect.top - parentRect.top;

        item.style.left = item.dataset.startLeft + 'px';
        item.style.top = item.dataset.startTop + 'px';
        item.style.right = 'auto';
        item.style.bottom = 'auto';
        item.style.transform = 'none';
        item.style.zIndex = '1000';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const parentRect = fourth.getBoundingClientRect();

        item.style.left = e.clientX - parentRect.left - shiftX + 'px';
        item.style.top = e.clientY - parentRect.top - shiftY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;

        const itemRect = item.getBoundingClientRect();

        if (item.classList.contains('hat')) {
            if (isOverlapping(itemRect, headZone.getBoundingClientRect())) {
                snapToZone(item, headZone);
            } else {
                returnToStart(item);
            }
        } else if (item.classList.contains('bant')) {
            if (isOverlapping(itemRect, tailZone.getBoundingClientRect())) {
                snapToZone(item, tailZone);
            } else {
                returnToStart(item);
            }
        } else if (item.classList.contains('bant2')) {
            if (isOverlapping(itemRect, neckZone.getBoundingClientRect())) {
                snapToZone(item, neckZone);
            } else {
                returnToStart(item);
            }
        }
    });
});

function isOverlapping(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function snapToZone(item, zone) {
    const parentRect = fourth.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const left = zoneRect.left - parentRect.left + zoneRect.width / 2 - itemRect.width / 2;
    const top = zoneRect.top - parentRect.top + zoneRect.height / 2 - itemRect.height / 2;

    item.style.left = left + 'px';
    item.style.top = top + 'px';
}

function returnToStart(item) {
    item.style.left = item.dataset.startLeft + 'px';
    item.style.top = item.dataset.startTop + 'px';
}
//5
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.fifth');
    const zone = document.querySelector('.dish-zone');
    const bones = document.querySelectorAll('.bone1, .bone2, .bone3, .bone4');

    const addresses = [
        document.querySelector('.checkt1'),
        document.querySelector('.checkt2'),
        document.querySelector('.checkt3'),
        document.querySelector('.checkt4')
    ];

    const totalBlock = document.querySelector('.total');
    const totalText = document.querySelector('.total p');

    let addressIndex = 0;
    let price = 0;

    bones.forEach(function (bone) {
        let isDragging = false;
        let shiftX = 0;
        let shiftY = 0;
        let counted = false;

        bone.addEventListener('mousedown', function (e) {
            if (counted) return;

            e.preventDefault();

            const boneRect = bone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            bone.style.left = boneRect.left - containerRect.left + 'px';
            bone.style.top = boneRect.top - containerRect.top + 'px';
            bone.style.bottom = 'auto';

            shiftX = e.clientX - boneRect.left;
            shiftY = e.clientY - boneRect.top;

            isDragging = true;
            bone.style.zIndex = '1000';
            bone.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;

            const containerRect = container.getBoundingClientRect();

            bone.style.left = e.clientX - containerRect.left - shiftX + 'px';
            bone.style.top = e.clientY - containerRect.top - shiftY + 'px';
        });

        document.addEventListener('mouseup', function () {
            if (!isDragging) return;

            isDragging = false;
            bone.style.cursor = 'grab';

            const boneRect = bone.getBoundingClientRect();
            const zoneRect = zone.getBoundingClientRect();

            const hit =
                boneRect.right > zoneRect.left &&
                boneRect.left < zoneRect.right &&
                boneRect.bottom > zoneRect.top &&
                boneRect.top < zoneRect.bottom;

            if (hit && !counted) {
                counted = true;

                if (addressIndex < addresses.length) {
                    addresses[addressIndex].style.display = 'block';
                    addressIndex++;
                }

                price += 4000;
                totalBlock.style.display = 'block';
                totalText.textContent = 'Оплатите: ' + price + ' руб';
            }
        });
    });
});

let laps = document.querySelectorAll('.lapab, .lapak, .lapaw');

laps.forEach(lap => {
    lap.addEventListener('click', () => {
        lap.style.animation = 'none';
    });
});